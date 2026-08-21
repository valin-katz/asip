import { PROJECTS } from './data.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, search, dept, countOnly } = req.query || {};

  // Single project detail for modal
  if (id) {
    const found = (PROJECTS || []).find(p => p.project_id === id);
    if (!found) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json({
      project_id: found.project_id,
      title: found.title,
      dept: found.dept,
      guide: found.guide ? found.guide.split("(")[0].trim() : "",
      description: found.description,
      end_users: found.end_users,
      students: (found.students || []).map(s => ({ name: s.name }))
    });
  }

  if (countOnly) {
    return res.status(200).json({ count: (PROJECTS || []).length });
  }

  // Filtered search results
  let filtered = PROJECTS || [];
  if (dept && dept !== 'ALL') {
    filtered = filtered.filter(p => p.dept === dept);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => {
      const hay = ((p.title || "") + " " + (p.description || "") + " " + (p.end_users || "") + " " + (p.guide || "")).toLowerCase();
      return hay.includes(q);
    });
  }

  const results = filtered.slice(0, 50).map(p => ({
    project_id: p.project_id,
    title: p.title,
    dept: p.dept,
    guide: p.guide ? p.guide.split("(")[0].trim() : "",
    end_users: p.end_users ? p.end_users.slice(0, 70) : ""
  }));

  return res.status(200).json({
    total: filtered.length,
    results
  });
}
