/* ═══════════════════════════════════════════════════════════════
   ADRA Intelligence — Project Directory Engine
   Full 220+ Project Explorer with Deep Search & Filter System
═══════════════════════════════════════════════════════════════ */

const ICONS = {
  bot: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>`,
  user: `<svg viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  guide: `<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  tag: `<svg viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  sprout: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-10 10c0 4.4 2.9 8.2 7 9.5V14h-2v-2h2v-1.6C9 8.6 10.1 7 12.5 7H14v2h-1.5c-.8 0-1 .4-1 1v2H14v2h-2.5v7.5c4.1-1.3 7-5.1 7-9.5A10 10 0 0 0 12 2z"/></svg>`,
  pulse: `<svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  book: `<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  building: `<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15.01" y2="22.01"/><line x1="9" y1="6" x2="9.01" y2="6"/><line x1="15" y1="6" x2="15.01" y2="6"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/><line x1="9" y1="14" x2="9.01" y2="14"/><line x1="15" y1="14" x2="15.01" y2="14"/><line x1="9" y1="18" x2="9.01" y2="18"/><line x1="15" y1="18" x2="15.01" y2="18"/></svg>`,
  recycle: `<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  shield: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15.01" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  bank: `<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  assistive: `<svg viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"/><path d="M4 8h16"/><path d="M12 8v8"/><path d="M8 20l4-4 4 4"/></svg>`,
  alert: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
};

function icon(name) {
  return `<span class="svg-icon">${ICONS[name] || ICONS.tag}</span>`;
}

const THEMES = [
  { label: "AgriTech", icon: "sprout", kw: "farm" },
  { label: "HealthTech", icon: "pulse", kw: "health" },
  { label: "EdTech", icon: "book", kw: "education" },
  { label: "Smart City", icon: "building", kw: "traffic" },
  { label: "Green Tech", icon: "recycle", kw: "waste" },
  { label: "CyberSec", icon: "shield", kw: "security" },
  { label: "AI & ML", icon: "cpu", kw: "ai" },
  { label: "FinTech", icon: "bank", kw: "finance" },
  { label: "Assistive", icon: "assistive", kw: "blind" },
  { label: "Safety", icon: "alert", kw: "safety" }
];

let activeThemeKw = "";
let searchQ = "";
let searchDebounceTimer = null;

// ════════════════════════════════════════
//  INITIALIZATION
// ════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  renderThemes();
  
  // Check URL search params for deep linking
  const urlParams = new URLSearchParams(window.location.search);
  const paramSearch = urlParams.get("search") || urlParams.get("q");
  const paramDomain = urlParams.get("domain") || urlParams.get("theme");

  if (paramSearch) {
    const input = document.getElementById("dirSearch");
    if (input) input.value = paramSearch;
    searchQ = paramSearch;
  }

  if (paramDomain) {
    activeThemeKw = paramDomain.toLowerCase();
    searchQ = activeThemeKw;
    const input = document.getElementById("dirSearch");
    if (input) input.value = paramDomain;
  }

  loadDirectory();
});

function renderThemes() {
  const container = document.getElementById("dirThemesRow");
  if (!container) return;
  container.innerHTML = THEMES.map(t => `
    <div class="dir-theme-chip ${activeThemeKw === t.kw ? 'active' : ''}" onclick="toggleTheme('${t.kw}', this)">
      ${icon(t.icon)}
      <span>${t.label}</span>
    </div>
  `).join("");
}

function toggleTheme(kw, el) {
  if (activeThemeKw === kw) {
    activeThemeKw = "";
    el.classList.remove("active");
    const input = document.getElementById("dirSearch");
    if (input && input.value === kw) {
      input.value = "";
      searchQ = "";
    }
  } else {
    document.querySelectorAll(".dir-theme-chip").forEach(c => c.classList.remove("active"));
    activeThemeKw = kw;
    el.classList.add("active");
    const input = document.getElementById("dirSearch");
    if (input) input.value = kw;
    searchQ = kw;
  }
  loadDirectory();
}

function handleSearchInput() {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    const input = document.getElementById("dirSearch");
    if (input) searchQ = input.value.trim();
    loadDirectory();
  }, 250);
}

function resetFilters() {
  activeThemeKw = "";
  searchQ = "";
  
  const input = document.getElementById("dirSearch");
  if (input) input.value = "";

  document.querySelectorAll(".dir-theme-chip").forEach(c => c.classList.remove("active"));

  loadDirectory();
}

// ════════════════════════════════════════
//  FETCH & RENDER DIRECTORY
// ════════════════════════════════════════
async function loadDirectory() {
  const grid = document.getElementById("dirGrid");
  const countEl = document.getElementById("resultsCount");
  const badgeEl = document.getElementById("activeFilterBadge");

  if (grid) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">
        <div style="font-size:14px;font-weight:600;margin-bottom:8px;">Searching ASIP Project Repository...</div>
        <div style="font-size:12px;color:var(--text-muted);">Filtering across validated engineering initiatives</div>
      </div>
    `;
  }

  try {
    const params = new URLSearchParams();
    if (searchQ) params.append("search", searchQ);
    params.append("limit", "300");

    const res = await fetch(`/api/projects?${params.toString()}`);
    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();
    const list = data.results || [];
    const total = data.total || list.length;

    if (countEl) {
      countEl.innerHTML = `Showing <strong>${total}</strong> verified projects`;
    }

    // Active filter badges
    let filtersHtml = "";
    if (searchQ) {
      filtersHtml += `<span class="chip">${icon('search')} "${esc(searchQ)}"</span>`;
    }
    if (badgeEl) badgeEl.innerHTML = filtersHtml;

    if (!list.length) {
      if (grid) {
        grid.innerHTML = `
          <div class="dir-empty-state">
            <div class="dir-empty-icon">${icon('search')}</div>
            <div class="dir-empty-title">No matching projects found</div>
            <div class="dir-empty-desc">No ASIP projects matched your query "${esc(searchQ)}". Try adjusting your search keywords.</div>
            <button class="dir-reset-btn" onclick="resetFilters()">Reset All Filters</button>
          </div>
        `;
      }
      return;
    }

    if (grid) {
      grid.innerHTML = list.map(p => {
        return `
        <div class="project-card" onclick="openModal('${safe(p.project_id)}')">
          <div>
            <div class="project-card-top">
              <span class="project-card-id">${esc(p.project_id)}</span>
            </div>
            <h3 class="project-card-title">${esc(p.title || "Untitled Project")}</h3>
            <p class="project-card-desc">${esc(p.description || "Societal impact engineering solution engineered under the ASIP curriculum.")}</p>
          </div>
          
          <div>
            <div class="project-card-meta">
              ${p.guide ? `
                <div class="project-card-meta-item">
                  ${icon('guide')}
                  <span>Mentor: ${esc(p.guide)}</span>
                </div>
              ` : ''}
              ${p.end_users ? `
                <div class="project-card-meta-item users">
                  ${icon('users')}
                  <span>Target: ${esc(p.end_users)}</span>
                </div>
              ` : ''}
            </div>

            <div class="project-card-footer">
              <span class="chip">ASIP Verified</span>
              <span class="project-card-action">
                View Details
                ${ICONS.arrowRight}
              </span>
            </div>
          </div>
        </div>
      `;
      }).join("");
    }

  } catch (err) {
    if (grid) {
      grid.innerHTML = `
        <div class="dir-empty-state">
          <div class="dir-empty-title">Unable to connect to Project Directory</div>
          <div class="dir-empty-desc">Please check your internet connection or try again in a few moments.</div>
          <button class="dir-reset-btn" onclick="loadDirectory()">Retry</button>
        </div>
      `;
    }
  }
}

// ════════════════════════════════════════
//  PROJECT DETAIL MODAL
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

    const guideChip = p.guide ? `<span class="chip">${icon('guide')}${esc(p.guide)}</span>` : "";

    document.getElementById("mId").textContent = p.project_id;
    document.getElementById("mTitle").textContent = p.title || "Untitled Project";
    document.getElementById("mChips").innerHTML = guideChip;
    document.getElementById("mMeta").innerHTML = `
      <div class="meta-box"><div class="meta-box-lbl">Faculty Mentor</div><div class="meta-box-val">${esc(p.guide || "Atria Faculty Mentor")}</div></div>
      <div class="meta-box"><div class="meta-box-lbl">Curriculum Track</div><div class="meta-box-val">ASIP 2024–2026</div></div>
    `;
    document.getElementById("mDesc").innerHTML = p.description ? `
      <div class="modal-section-lbl">Problem Statement & Solution</div>
      <div class="modal-section-body">${esc(p.description)}</div>
    ` : "";
    document.getElementById("mUsers").innerHTML = p.end_users ? `
      <div class="modal-section-lbl">Target Beneficiaries</div>
      <div class="modal-section-body">${esc(p.end_users)}</div>
    ` : "";
    document.getElementById("mStudents").innerHTML = p.students && p.students.length ? `
      <div class="modal-section-lbl">Student Engineering Team</div>
      <div class="students-wrap">${p.students.map(s => `<span class="student-tag">${icon('user')}${esc(s.name)}${s.usn ? ` (${esc(s.usn)})` : ''}</span>`).join("")}</div>
    ` : "";
  } catch (err) {
    document.getElementById("mTitle").textContent = "Project Overview";
    document.getElementById("mDesc").innerHTML = `<div class="modal-section-body">Detailed specifications available through ASIP project coordinators.</div>`;
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

function esc(s) {
  if (!s) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function safe(s) { return String(s || "").replace(/'/g, "\\'"); }
