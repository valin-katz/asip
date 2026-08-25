import { PROJECTS } from './data.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, search, countOnly } = req.query || {};

  // Single project detail for modal inspection
  if (id) {
    const cleanId = String(id).trim().toUpperCase();
    const found = (PROJECTS || []).find(p => 
      (p.project_id && p.project_id.toUpperCase() === cleanId) ||
      (p.temp_id && p.temp_id.toUpperCase() === cleanId) ||
      (p.team_code && p.team_code.toUpperCase() === cleanId)
    );

    if (!found) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.status(200).json({
      project_id: found.project_id,
      title: found.title,
      guide: found.guide ? found.guide.split("(")[0].trim() : "",
      description: found.description || "Societal impact engineering solution engineered under the ASIP curriculum.",
      end_users: found.end_users || "Community stakeholders and end beneficiaries.",
      students: (found.students || []).map(s => ({
        name: s.name,
        usn: s.usn || ""
      }))
    });
  }

  if (countOnly) {
    return res.status(200).json({ count: (PROJECTS || []).length });
  }

  // Filtered search results
  let filtered = PROJECTS || [];

  if (search) {
    const rawTokens = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
    
    filtered = filtered.filter(p => {
      // Build comprehensive searchable corpus
      const studentNames = (p.students || []).map(s => `${s.name || ''} ${s.usn || ''}`).join(" ");
      const corpus = [
        p.project_id || "",
        p.temp_id || "",
        p.team_code || "",
        p.title || "",
        p.description || "",
        p.guide || "",
        p.end_users || "",
        studentNames
      ].join(" ").toLowerCase();

      // Ensure all search tokens match
      return rawTokens.every(token => corpus.includes(token));
    });
  }

  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 300;
  const results = filtered.slice(0, limit).map(p => ({
    project_id: p.project_id,
    title: p.title,
    guide: p.guide ? p.guide.split("(")[0].trim() : "",
    description: p.description ? (p.description.length > 160 ? p.description.slice(0, 160) + "..." : p.description) : "Societal impact engineering initiative.",
    end_users: p.end_users ? (p.end_users.length > 80 ? p.end_users.slice(0, 80) + "..." : p.end_users) : "",
    students: (p.students || []).map(s => ({ name: s.name, usn: s.usn || "" }))
  }));

  return res.status(200).json({
    total: filtered.length,
    results
  });
}
