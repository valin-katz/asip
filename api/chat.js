import { PROJECTS } from './data.js';

function scoreAndRank(query, topN = 10) {
  if (!query || !PROJECTS || !PROJECTS.length) return [];
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  return PROJECTS
    .map(p => {
      let score = 0;
      const title = (p.title || "").toLowerCase();
      const desc  = (p.description || "").toLowerCase();
      const users = (p.end_users || "").toLowerCase();
      words.forEach(w => {
        if (title.includes(w)) score += 4;
        if (desc.includes(w))  score += 2;
        if (users.includes(w)) score += 1;
      });
      return { score, ...p };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

function generateLocalFallback(query) {
  const top = scoreAndRank(query, 5);
  const direct = top.filter(m => m.score >= 3);

  if (direct.length >= 1) {
    let html = `<strong>Direct Project Match:</strong> Atria engineering teams are actively developing solutions in this domain.<br/><br/>`;
    direct.slice(0, 2).forEach(p => {
      const guideName = p.guide ? p.guide.split("(")[0].trim() : "Atria Faculty";
      const themeTag = p.dept;
      const students = (p.students || []).slice(0, 3).map(s => s.name).join(", ");
      html += `
        <div class="result-card" onclick="openModal('${p.project_id}')">
          <div class="rc-meta"><span class="rc-id">${p.project_id}</span><span class="rc-dept">${p.dept}</span></div>
          <div class="rc-title">${p.title || "Untitled"}</div>
          ${p.description ? `<div class="rc-desc">${p.description.slice(0, 180)}...</div>` : ""}
          <div class="rc-footer">
            <span class="chip">${themeTag}</span>
            <span class="chip">${guideName}</span>
          </div>
          ${students ? `<div class="rc-students">👥 <span>${students}</span></div>` : ""}
        </div>
      `;
    });
    return html;
  } else if (top.length >= 2) {
    let html = `<div class="synergy-block"><div class="synergy-header">Multi-Project Ecosystem Synergy</div>`;
    html += `Our ASIP ecosystem connects complementary projects across departments to address this problem:<br/><br/>`;
    top.slice(0, 3).forEach(p => {
      const guideName = p.guide ? p.guide.split("(")[0].trim() : "Atria Faculty";
      html += `
        <div class="result-card" onclick="openModal('${p.project_id}')">
          <div class="rc-meta"><span class="rc-id">${p.project_id}</span><span class="rc-dept">${p.dept}</span></div>
          <div class="rc-title">${p.title || "Untitled"}</div>
          ${p.description ? `<div class="rc-desc">${p.description.slice(0, 180)}...</div>` : ""}
          <div class="rc-footer">
            <span class="chip">${p.dept}</span>
            <span class="chip">${guideName}</span>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    return html;
  } else {
    return `<strong>Frontier Problem Statement:</strong><br/><br/>
      While our current 220 active projects do not directly target this specific scope, this problem represents a prime opportunity for incoming ASIP engineering cohorts (Sem 3–8).`;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parse body safely
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }
  const query = body?.query || "";

  if (!query) {
    return res.status(400).json({ error: 'Query is required.' });
  }

  // Clean API key (remove accidental quotes or whitespace from Vercel UI)
  const apiKey = (process.env.GEMINI_API_KEY || "").trim().replace(/^["']|["']$/g, "");

  // If no API key is configured yet, gracefully return local matching engine
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Using local matching engine.");
    const fallbackText = generateLocalFallback(query);
    return res.status(200).json({ text: fallbackText });
  }

  const topProjects = scoreAndRank(query, 8);
  const topCatalog = topProjects.map((p, i) =>
    `${i+1}. [${p.project_id}] "${p.title}" (${p.dept}) — Mentor: ${p.guide || "N/A"}\n   Description: ${(p.description || "No description").slice(0, 320)}\n   End Users: ${(p.end_users || "Not specified").slice(0, 140)}\n   Students: ${(p.students || []).map(s => s.name).slice(0, 4).join(", ") || "N/A"}`
  ).join("\n\n");

  const fullCatalog = (PROJECTS || []).map(p => `[${p.project_id}] ${p.title} (${p.dept})`).join("\n");

  const systemPrompt = `You are ADRA, the official AI Intelligence Assistant for Atria Institute of Technology, Bangalore.

About Atria & ASIP:
- ASIP = Atria Societal Impact Projects (6-semester academic curriculum from Sem 3 to Sem 8).
- 220 active projects in the 2024–2026 cohort across ISE, CSE, ECE, Civil, and Mechanical engineering.

Tone & Strategy:
- Confident, authoritative, professional, and proud of Atria engineering students.
- 1. DIRECT MATCH: If projects match, present them with project title, code, end users, student engineers, and faculty mentor.
- 2. ECOSYSTEM SYNERGY: If no single project covers 100%, combine 2–3 relevant projects to show how Atria's multi-disciplinary ecosystem collaborates.
- 3. FRONTIER PROBLEM: If completely novel, present it as a compelling problem statement for incoming 3rd-semester batches.

Format Rules:
- Never use emojis.
- Output clean, valid HTML markup only.
- Embed project cards using this exact structure:
  <div class="result-card" onclick="openModal('PROJECT_ID')">
    <div class="rc-meta"><span class="rc-id">PROJECT_ID</span><span class="rc-dept">DEPT</span></div>
    <div class="rc-title">TITLE</div>
    <div class="rc-desc">1-2 sentences on how this project solves the user query.</div>
    <div class="rc-footer"><span class="chip">THEME</span><span class="chip">GUIDE_NAME</span></div>
    <div class="rc-students">STUDENT_NAMES</div>
  </div>
- For multi-project synergies, group cards inside:
  <div class="synergy-block"><div class="synergy-header">Multi-Project Ecosystem Synergy</div>...cards...</div>
- Keep response under 300 words.

PROJECT CANDIDATES FOR THIS QUERY:
${topCatalog}

FULL REPOSITORY INDEX:
${fullCatalog}`;

  const payload = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: "user", parts: [{ text: query }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 1200 }
  };

  const primaryModel = (process.env.GEMINI_MODEL || 'gemini-flash-latest').trim();
  const fallbackModels = ['gemini-flash-latest', 'gemini-3.7-flash', 'gemini-3.6-flash'];
  const modelsToTry = [primaryModel, ...fallbackModels.filter(m => m !== primaryModel)];

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        if (text) {
          return res.status(200).json({ text });
        }
      }

      const errText = await response.text();
      lastError = { status: response.status, message: errText };

      if ([429, 500, 503].includes(response.status)) {
        continue;
      } else {
        break;
      }
    } catch (err) {
      lastError = { status: 500, message: err.message };
    }
  }

  // Graceful fallback to server-side search engine if upstream API times out
  console.error("Gemini API failed, falling back to local response:", lastError);
  const fallbackText = generateLocalFallback(query);
  return res.status(200).json({ text: fallbackText });
}
