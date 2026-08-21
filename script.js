/* ═══════════════════════════════════════════════════════════════
   ADRA Intelligence — Client Engine (Zero Data Leakage)
   All Data Protected on Vercel Backend
═══════════════════════════════════════════════════════════════ */

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

const THEMES = [
  { label:"AgriTech", icon:"sprout", kw:"farm" },
  { label:"HealthTech", icon:"pulse", kw:"health" },
  { label:"EdTech", icon:"book", kw:"education" },
  { label:"Smart City", icon:"building", kw:"traffic" },
  { label:"Green Tech", icon:"recycle", kw:"waste" },
  { label:"CyberSec", icon:"shield", kw:"security" },
  { label:"AI & ML", icon:"cpu", kw:"ai" },
  { label:"FinTech", icon:"bank", kw:"finance" },
  { label:"Assistive", icon:"assistive", kw:"blind" },
  { label:"Safety", icon:"alert", kw:"safety" },
];

let activeDept  = "ALL";
let searchQ     = "";
let isBotTyping = false;
let searchDebounceTimer = null;

// ════════════════════════════════════════
//  INIT
// ════════════════════════════════════════
function init() {
  renderThemes();
  fetchProjects();
}

function renderThemes() {
  const container = document.getElementById("themeGrid");
  if (!container) return;
  container.innerHTML = THEMES.map(t => `
    <div class="theme-btn" onclick="applyTheme('${t.kw}')">
      ${icon(t.icon)}
      <span>${t.label}</span>
    </div>
  `).join("");
}

function applyTheme(kw) {
  const searchInput = document.getElementById("sidebarSearch");
  if (searchInput) searchInput.value = kw;
  searchQ = kw;
  fetchProjects();
  const projSection = document.getElementById("projectsSection");
  if (projSection) projSection.scrollIntoView({ behavior:"smooth" });
}

// ════════════════════════════════════════
//  SERVER-SIDE PROJECT DIRECTORY FETCH
// ════════════════════════════════════════
async function fetchProjects() {
  const scroll = document.getElementById("projScroll");
  const badge = document.getElementById("projCountBadge");

  try {
    const params = new URLSearchParams();
    if (activeDept !== "ALL") params.append("dept", activeDept);
    if (searchQ) params.append("search", searchQ);

    const res = await fetch(`/api/projects?${params.toString()}`);
    if (!res.ok) throw new Error("Search failed");
    
    const data = await res.json();
    const list = data.results || [];
    const total = data.total || list.length;

    if (badge) badge.textContent = `${total} Projects`;

    if (!list.length) {
      if (scroll) scroll.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-dim);font-size:12.5px;">No projects found matching criteria.</div>`;
      return;
    }

    if (scroll) {
      scroll.innerHTML = list.map(p => `
        <div class="proj-row" onclick="openModal('${safe(p.project_id)}')">
          <div class="proj-row-top">
            <span class="proj-row-id">${esc(p.project_id)}</span>
            <span class="proj-row-dept">${esc(p.dept)}</span>
          </div>
          <div class="proj-row-title">${esc(p.title || "Untitled")}</div>
          ${p.guide ? `<div class="proj-row-guide">${icon('guide')}<span>${esc(p.guide)}</span></div>` : ""}
          ${p.end_users ? `<div class="proj-row-users">${icon('users')}<span>${esc(p.end_users)}</span></div>` : ""}
        </div>
      `).join("");
    }
  } catch (err) {
    if (scroll) scroll.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-dim);font-size:12px;">Directory available via ADRA AI chat.</div>`;
  }
}

function setDept(el) {
  document.querySelectorAll(".dept-tab").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
  activeDept = el.dataset.dept;
  fetchProjects();
}

function filterSidebar() {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    const searchInput = document.getElementById("sidebarSearch");
    if (searchInput) searchQ = searchInput.value.trim();
    fetchProjects();
  }, 250);
}

// ════════════════════════════════════════
//  SERVER-SIDE MODAL DETAIL FETCH
// ════════════════════════════════════════
async function openModal(id) {
  const modalBg = document.getElementById("modalBg");
  if (!modalBg) return;

  document.getElementById("mId").textContent = "Loading...";
  document.getElementById("mTitle").textContent = "Fetching project details...";
  document.getElementById("mChips").innerHTML = "";
  document.getElementById("mMeta").innerHTML = "";
  document.getElementById("mDesc").innerHTML = "";
  document.getElementById("mUsers").innerHTML = "";
  document.getElementById("mStudents").innerHTML = "";
  modalBg.classList.add("open");

  try {
    const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error("Project details not found");
    const p = await res.json();

    const deptChip = `<span class="chip">${esc(p.dept)}</span>`;
    const guideChip = p.guide ? `<span class="chip">${icon('guide')}${esc(p.guide)}</span>` : "";

    document.getElementById("mId").textContent = [p.project_id, p.dept].filter(Boolean).join(" · ");
    document.getElementById("mTitle").textContent = p.title || "Untitled Project";
    document.getElementById("mChips").innerHTML = deptChip + guideChip;
    document.getElementById("mMeta").innerHTML = `
      <div class="meta-box"><div class="meta-box-lbl">Faculty Mentor</div><div class="meta-box-val">${esc(p.guide || "Atria Faculty")}</div></div>
      <div class="meta-box"><div class="meta-box-lbl">Engineering Department</div><div class="meta-box-val">${esc(p.dept)}</div></div>
    `;
    document.getElementById("mDesc").innerHTML = p.description ? `
      <div class="modal-section-lbl">Problem Statement & Solution</div>
      <div class="modal-section-body">${esc(p.description)}</div>
    ` : "";
    document.getElementById("mUsers").innerHTML = p.end_users ? `
      <div class="modal-section-lbl">Target End Users</div>
      <div class="modal-section-body">${esc(p.end_users)}</div>
    ` : "";
    document.getElementById("mStudents").innerHTML = p.students && p.students.length ? `
      <div class="modal-section-lbl">Student Engineering Team</div>
      <div class="students-wrap">${p.students.map(s => `<span class="student-tag">${icon('user')}${esc(s.name)}</span>`).join("")}</div>
    ` : "";
  } catch (err) {
    document.getElementById("mTitle").textContent = "Project Overview";
    document.getElementById("mDesc").innerHTML = `<div class="modal-section-body">Detailed specifications available through faculty coordinator.</div>`;
  }
}

function closeModal() { 
  const modalBg = document.getElementById("modalBg");
  if (modalBg) modalBg.classList.remove("open"); 
}
function closeModalOutside(e) { 
  if (e.target === document.getElementById("modalBg")) closeModal(); 
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ════════════════════════════════════════
//  CHAT INTERACTION
// ════════════════════════════════════════
function handleEnter(e) {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
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

  appendBubble("user", `<span>${esc(query)}</span>`);
  input.value = ""; 
  input.style.height = "auto";
  const sugg = document.getElementById("chatSuggestions");
  if (sugg) sugg.style.display = "none";

  isBotTyping = true;
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) sendBtn.disabled = true;
  const typId = showTyping();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server returned status ${res.status}`);
    }

    const data = await res.json();
    removeEl(typId);
    appendBotResponse(data.text);
  } catch (err) {
    removeEl(typId);
    console.error("ADRA Error:", err);
    appendBotResponse(`<strong>ADRA Assistant:</strong> I'm temporarily connecting with the server. Please try asking your question again in a few moments.`);
  }

  isBotTyping = false;
  if (sendBtn) sendBtn.disabled = false;
  scrollBottom();
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
  const av = role === "user"
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

function removeEl(id) { const el = document.getElementById(id); if (el) el.remove(); }
function scrollBottom() {
  const c = document.getElementById("chatMsgs");
  if (c) c.scrollTop = c.scrollHeight;
}

function esc(s) {
  if (!s) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function safe(s) { return String(s || "").replace(/'/g, "\\'"); }

function scrollToChat()     { const el = document.getElementById("chatSection"); if (el) el.scrollIntoView({ behavior:"smooth" }); }
function scrollToProjects() { const el = document.getElementById("projectsSection"); if (el) el.scrollIntoView({ behavior:"smooth" }); }
function scrollToAbout()    { const el = document.getElementById("aboutSection"); if (el) el.scrollIntoView({ behavior:"smooth" }); }

init();
