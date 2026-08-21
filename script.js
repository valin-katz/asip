/* ═══════════════════════════════════════════════════════════════
   ADRA Intelligence — Production Client (Vercel Ready)
   Atria Institute of Technology · ASIP Ecosystem
═══════════════════════════════════════════════════════════════ */

// ════════════════════════════════════════
//  SVG ICON DICTIONARY
// ════════════════════════════════════════
const ICONS = {
  bot: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>`,
  user: `<svg viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  guide: `<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  tag: `<svg viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  zap: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  sprout: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-10 10c0 4.4 2.9 8.2 7 9.5V14h-2v-2h2v-1.6C9 8.6 10.1 7 12.5 7H14v2h-1.5c-.8 0-1 .4-1 1v2H14v2h-2.5v7.5c4.1-1.3 7-5.1 7-9.5A10 10 0 0 0 12 2z"/></svg>`,
  pulse: `<svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  book: `<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  building: `<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15.01" y2="22.01"/><line x1="9" y1="6" x2="9.01" y2="6"/><line x1="15" y1="6" x2="15.01" y2="6"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/><line x1="9" y1="14" x2="9.01" y2="14"/><line x1="15" y1="14" x2="15.01" y2="14"/><line x1="9" y1="18" x2="9.01" y2="18"/><line x1="15" y1="18" x2="15.01" y2="18"/></svg>`,
  recycle: `<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  shield: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15.01" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  bank: `<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  assistive: `<svg viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"/><path d="M4 8h16"/><path d="M12 8v8"/><path d="M8 20l4-4 4 4"/></svg>`,
  alert: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
};

function icon(name) {
  return `<span class="svg-icon">${ICONS[name] || ICONS.tag}</span>`;
}

// ════════════════════════════════════════
//  DOMAIN THEMES
// ════════════════════════════════════════
const THEMES = [
  { label:"AgriTech", icon:"sprout", kw:["farm","crop","soil","irrigation","seed","harvest","farmer","dairy","cattle","pest","vegetable"] },
  { label:"HealthTech", icon:"pulse", kw:["health","medical","hospital","patient","disease","doctor","medicine","blood","cancer","blind","disab","mental health","aid"] },
  { label:"EdTech", icon:"book", kw:["education","student","learning","school","college","skill","training","exam","scholarship","tutor","career","literacy","dropout"] },
  { label:"Smart City", icon:"building", kw:["traffic","smart city","urban","road","parking","transport","municipality","civic","ambulance","signal","pothole"] },
  { label:"Green Tech", icon:"recycle", kw:["waste","clean","pollution","recycle","environment","green","solar","energy","water","rain","flood","air quality","sustain"] },
  { label:"CyberSec", icon:"shield", kw:["security","cyber","fraud","scam","hack","privacy","deepfake","phishing","encrypt","wipe","safe"] },
  { label:"AI & ML", icon:"cpu", kw:["ai","machine learning","deep learning","neural","detection","nlp","vision","intelligent","predict","automat","model"] },
  { label:"FinTech", icon:"bank", kw:["finance","payment","upi","bank","loan","insurance","money","invest","digital wallet","finsec"] },
  { label:"Assistive", icon:"assistive", kw:["blind","deaf","disab","wheelchair","assistive","accessible","speech impaired","braille","visually"] },
  { label:"Safety", icon:"alert", kw:["safety","surveillance","alert","emergency","intruder","cctv","monitor","notif","fire","accident","rescue"] },
];

let activeDept  = "ALL";
let searchQ     = "";
let isBotTyping = false;

// ════════════════════════════════════════
//  INIT
// ════════════════════════════════════════
function init() {
  if (typeof PROJECTS === "undefined") {
    console.error("PROJECTS dataset not loaded.");
    return;
  }

  const names = new Set();
  PROJECTS.forEach(p => (p.students||[]).forEach(s => names.add(s.usn || s.name)));
  const cnt = names.size;
  if (cnt > 0) {
    const kpiEl = document.getElementById("kpiStudents");
    if (kpiEl) kpiEl.textContent = cnt + "+";
  }
  const kpiProj = document.getElementById("kpiProjects");
  if (kpiProj) kpiProj.textContent = PROJECTS.length;

  renderThemes();
  renderProjList();
}

function renderThemes() {
  const container = document.getElementById("themeGrid");
  if (!container) return;
  container.innerHTML = THEMES.map(t => `
    <div class="theme-btn" onclick="applyTheme(${JSON.stringify(t.kw[0])})">
      ${icon(t.icon)}
      <span>${t.label}</span>
    </div>
  `).join("");
}

function applyTheme(kw) {
  const searchInput = document.getElementById("sidebarSearch");
  if (searchInput) searchInput.value = kw;
  searchQ = kw;
  renderProjList();
  const projSection = document.getElementById("projectsSection");
  if (projSection) projSection.scrollIntoView({ behavior:"smooth" });
}

function getFiltered() {
  return PROJECTS.filter(p => {
    if (activeDept !== "ALL" && p.dept !== activeDept) return false;
    if (!searchQ) return true;
    const hay = ((p.title||"")+" "+(p.description||"")+" "+(p.end_users||"")+" "+(p.guide||"")).toLowerCase();
    return hay.includes(searchQ.toLowerCase());
  });
}

function renderProjList() {
  const list = getFiltered();
  const badge = document.getElementById("projCountBadge");
  if (badge) badge.textContent = `${list.length} / ${PROJECTS.length}`;
  const scroll = document.getElementById("projScroll");
  if (!scroll) return;

  if (!list.length) {
    scroll.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-dim);font-size:12.5px;">No projects found matching filter.</div>`;
    return;
  }

  scroll.innerHTML = list.slice(0, 90).map(p => `
    <div class="proj-row" onclick="openModal('${safe(p.project_id)}')">
      <div class="proj-row-top">
        <span class="proj-row-id">${p.project_id}</span>
        <span class="proj-row-dept">${p.dept}</span>
      </div>
      <div class="proj-row-title">${esc(p.title||"Untitled")}</div>
      ${p.guide ? `<div class="proj-row-guide">${icon('guide')}<span>${esc(p.guide.split("(")[0].trim())}</span></div>`:""}
      ${p.end_users ? `<div class="proj-row-users">${icon('users')}<span>${esc(p.end_users.slice(0,65))}${p.end_users.length>65?"…":""}</span></div>`:""}
    </div>
  `).join("");
}

function setDept(el) {
  document.querySelectorAll(".dept-tab").forEach(t=>t.classList.remove("active"));
  el.classList.add("active");
  activeDept = el.dataset.dept;
  renderProjList();
}

function filterSidebar() {
  const searchInput = document.getElementById("sidebarSearch");
  if (searchInput) searchQ = searchInput.value.trim();
  renderProjList();
}

// ════════════════════════════════════════
//  MODAL
// ════════════════════════════════════════
function openModal(id) {
  const p = PROJECTS.find(x => x.project_id === id);
  if (!p) return;

  const tags = getProjectThemes(p).slice(0,4)
    .map(t=>`<span class="chip">${icon('tag')}${t}</span>`).join("");
  const deptChip = `<span class="chip">${p.dept}</span>`;
  const guideChip = p.guide ? `<span class="chip">${icon('guide')}${esc(p.guide.split("(")[0].trim())}</span>` : "";

  document.getElementById("mId").textContent = [p.project_id, p.temp_id, p.dept].filter(Boolean).join(" · ");
  document.getElementById("mTitle").textContent = p.title || "Untitled Project";
  document.getElementById("mChips").innerHTML = deptChip + guideChip + tags;
  document.getElementById("mMeta").innerHTML = `
    <div class="meta-box"><div class="meta-box-lbl">Faculty Mentor</div><div class="meta-box-val">${esc(p.guide||"—")}</div></div>
    <div class="meta-box"><div class="meta-box-lbl">Engineering Department</div><div class="meta-box-val">${esc(p.dept)}</div></div>
    ${p.temp_id ? `<div class="meta-box"><div class="meta-box-lbl">Project Code</div><div class="meta-box-val">${esc(p.project_id)}</div></div>` : ""}
    ${p.temp_id ? `<div class="meta-box"><div class="meta-box-lbl">Cohort Tracking ID</div><div class="meta-box-val">${esc(p.temp_id)}</div></div>` : ""}
  `;
  document.getElementById("mDesc").innerHTML = p.description ? `
    <div class="modal-section-lbl">Problem Statement & Solution Description</div>
    <div class="modal-section-body">${esc(p.description)}</div>
  ` : "";
  document.getElementById("mUsers").innerHTML = p.end_users ? `
    <div class="modal-section-lbl">Target Stakeholders & End Users</div>
    <div class="modal-section-body">${esc(p.end_users)}</div>
  ` : "";
  document.getElementById("mStudents").innerHTML = p.students&&p.students.length ? `
    <div class="modal-section-lbl">Student Engineering Team (${p.students.length} members)</div>
    <div class="students-wrap">${p.students.map(s=>`<span class="student-tag">${icon('user')}${esc(s.name)}</span>`).join("")}</div>
  ` : "";

  document.getElementById("modalBg").classList.add("open");
}
function closeModal() { document.getElementById("modalBg").classList.remove("open"); }
function closeModalOutside(e) { if(e.target===document.getElementById("modalBg")) closeModal(); }
document.addEventListener("keydown", e => { if(e.key==="Escape") closeModal(); });

// ════════════════════════════════════════
//  CHAT INTERACTION
// ════════════════════════════════════════
function handleEnter(e) {
  if(e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}
function autoGrow(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 100) + "px";
}
function useSuggestion(txt) {
  const input = document.getElementById("chatInput");
  if (input) {
    input.value = txt;
    sendMessage();
  }
}

async function sendMessage() {
  if (isBotTyping) return;
  const input = document.getElementById("chatInput");
  const query = input.value.trim();
  if (!query) return;

  // Append user bubble
  appendBubble("user", `<span>${esc(query)}</span>`);
  input.value = ""; input.style.height = "auto";
  const sugg = document.getElementById("chatSuggestions");
  if (sugg) sugg.style.display = "none";

  isBotTyping = true;
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) sendBtn.disabled = true;
  const typId = showTyping();

  try {
    const answer = await queryADRA(query);
    removeEl(typId);
    appendBotResponse(answer);
  } catch(err) {
    removeEl(typId);
    console.error("ADRA query error:", err);
    const fallbackAnswer = generateLocalResponse(query);
    appendBotResponse(fallbackAnswer);
  }

  isBotTyping = false;
  if (sendBtn) sendBtn.disabled = false;
  scrollBottom();
}

// ════════════════════════════════════════
//  ADRA CORE AI ENGINE (Serverless API Proxy)
// ════════════════════════════════════════
async function queryADRA(query) {
  const topProjects = scoreAndRank(query, 8);
  const topCatalog = topProjects.map((p,i) =>
    `${i+1}. [${p.project_id}] "${p.title}" (${p.dept}) — Guide: ${p.guide||"N/A"}\n   Description: ${(p.description||"No description").slice(0,320)}\n   End Users: ${(p.end_users||"Not specified").slice(0,140)}\n   Students: ${(p.students||[]).map(s=>s.name).slice(0,4).join(", ")||"N/A"}`
  ).join("\n\n");

  const fullCatalog = PROJECTS.map(p => `[${p.project_id}] ${p.title} (${p.dept})`).join("\n");

  const systemPrompt = `You are ADRA, the official AI Intelligence Assistant for Atria Institute of Technology, Bangalore.

About Atria & ASIP:
- ASIP = Atria Societal Impact Projects.
- ASIP is a longitudinal 6-semester academic curriculum starting in Semester 3 and culminating in Semester 8 graduation (2 credits per semester).
- Student engineering teams develop real, validated solutions for societal stakeholders across Computer Science, Information Science, Electronics, Civil, and Mechanical engineering.
- There are currently 220 active projects in the 2024–2026 cohort.

Your Persona & Tone:
- You are ADRA: Authoritative, professional, concise, and proud of Atria engineering students.
- When any problem or challenge is presented, respond with conviction that Atria is actively addressing it through our project repository.

Logic Strategy:
1. DIRECT MATCH: If 1 or more projects solve the problem, present them directly. Highlight the project title, team code, target end users, student engineers, and faculty mentor.
2. ECOSYSTEM SYNERGY: If no single project covers 100% of the challenge, combine 2–3 relevant projects to explain how Atria's multi-disciplinary ecosystem collaborates to form the complete solution.
3. FRONTIER PROBLEM: If the challenge is novel, present it as a compelling problem statement for incoming 3rd-semester ASIP student batches.

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
    contents: [{ role:"user", parts:[{ text: query }] }]
  };

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API Error ${res.status}: ${errText.slice(0, 180)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response returned from ADRA backend");
  return text;
}

// ════════════════════════════════════════
//  LOCAL FALLBACK GENERATOR
// ════════════════════════════════════════
function generateLocalResponse(query) {
  const top = scoreAndRank(query, 5);
  const direct = top.filter(m => m.score >= 3);

  if (direct.length >= 1) {
    let html = `<strong>Direct Project Match:</strong> Atria engineering teams are actively developing solutions in this domain.<br/><br/>`;
    direct.slice(0, 2).forEach(p => {
      html += buildResultCard(p);
    });
    return html;
  } else if (top.length >= 2) {
    let html = `<div class="synergy-block"><div class="synergy-header">Multi-Project Ecosystem Synergy</div>`;
    html += `Our ASIP ecosystem connects complementary projects across departments to solve this challenge:<br/><br/>`;
    top.slice(0, 3).forEach(p => {
      html += buildResultCard(p);
    });
    html += `</div>`;
    return html;
  } else {
    return `<strong>Frontier Problem Statement:</strong><br/><br/>
      While our current 220 active projects do not directly target this specific scope, this problem represents a prime opportunity for incoming ASIP engineering cohorts (Sem 3–8).`;
  }
}

function buildResultCard(p) {
  const guideName = p.guide ? p.guide.split("(")[0].trim() : "Atria Mentor";
  const themes = getProjectThemes(p);
  const themeTag = themes.length ? themes[0] : p.dept;
  const students = (p.students||[]).slice(0,3).map(s=>s.name).join(", ");

  return `
    <div class="result-card" onclick="openModal('${safe(p.project_id)}')">
      <div class="rc-meta"><span class="rc-id">${p.project_id}</span><span class="rc-dept">${p.dept}</span></div>
      <div class="rc-title">${esc(p.title||"Untitled")}</div>
      ${p.description ? `<div class="rc-desc">${esc(p.description.slice(0,180))}...</div>` : ""}
      <div class="rc-footer">
        <span class="chip">${icon('tag')}${esc(themeTag)}</span>
        <span class="chip">${icon('guide')}${esc(guideName)}</span>
      </div>
      ${students ? `<div class="rc-students">${icon('users')}<span>${esc(students)}</span></div>` : ""}
    </div>
  `;
}

function scoreAndRank(query, topN) {
  const words = query.toLowerCase().split(/\s+/).filter(w=>w.length>2);
  return PROJECTS
    .map(p => {
      let score = 0;
      const title = (p.title||"").toLowerCase();
      const desc  = (p.description||"").toLowerCase();
      const users = (p.end_users||"").toLowerCase();
      words.forEach(w => {
        if (title.includes(w)) score += 4;
        if (desc.includes(w))  score += 2;
        if (users.includes(w)) score += 1;
      });
      return {score, ...p};
    })
    .filter(p => p.score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0, topN);
}

function appendBotResponse(html) {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  row.innerHTML = `
    <div class="msg-av bot-av"><img src="assets/atria-icon.png" alt="ADRA" onerror="this.src='Atria icon.png'"/></div>
    <div class="msg-bubble">${html}</div>
  `;
  const container = document.getElementById("chatMsgs");
  if (container) container.appendChild(row);
  scrollBottom();
}

function appendBubble(role, html) {
  const row = document.createElement("div");
  row.className = `msg-row ${role}`;
  const av = role==="user"
    ? `<div class="msg-av user-av">${icon('user')}</div>`
    : `<div class="msg-av bot-av"><img src="assets/atria-icon.png" alt="ADRA" onerror="this.src='Atria icon.png'"/></div>`;
  row.innerHTML = `${av}<div class="msg-bubble">${html}</div>`;
  const container = document.getElementById("chatMsgs");
  if (container) container.appendChild(row);
  scrollBottom();
}

let typingCount = 0;
function showTyping() {
  const id = "typing_" + (++typingCount);
  const row = document.createElement("div");
  row.className = "typing-row"; row.id = id;
  row.innerHTML = `
    <div class="msg-av bot-av"><img src="assets/atria-icon.png" alt="ADRA" onerror="this.src='Atria icon.png'"/></div>
    <div class="typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  const container = document.getElementById("chatMsgs");
  if (container) container.appendChild(row);
  scrollBottom();
  return id;
}

function removeEl(id) { const el = document.getElementById(id); if(el) el.remove(); }
function scrollBottom() {
  const c = document.getElementById("chatMsgs");
  if (c) c.scrollTop = c.scrollHeight;
}

function getProjectThemes(p) {
  const text = ((p.title||"")+" "+(p.description||"")+" "+(p.end_users||"")).toLowerCase();
  return THEMES.filter(t => t.kw.some(k => text.includes(k))).map(t => t.label);
}

function esc(s) {
  if (!s) return "";
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function safe(s) { return String(s||"").replace(/'/g,"\\'"); }

function scrollToChat()     { const el = document.getElementById("chatSection"); if (el) el.scrollIntoView({behavior:"smooth"}); }
function scrollToProjects() { const el = document.getElementById("projectsSection"); if (el) el.scrollIntoView({behavior:"smooth"}); }
function scrollToAbout()    { const el = document.getElementById("aboutSection"); if (el) el.scrollIntoView({behavior:"smooth"}); }

init();
