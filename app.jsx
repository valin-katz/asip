const { useState, useEffect, useRef } = React;

// Featured landmark showcase projects
const FEATURED_PROJECTS = [
  {
    project_id: "24ANML01",
    title: "ResQ Paws",
    desc: "AI-powered emergency animal welfare and stray rescue management platform connecting citizens, veterinarians, and NGOs with geo-tagged triage.",
    guide: "Dr. V Vijayalakshmi",
    end_users: "Animal welfare NGOs, Veterinary clinics, Citizens"
  },
  {
    project_id: "24SEAI06",
    title: "Access Grid: Scalable QR System",
    desc: "Scalable QR-based event management, access grid coordination, and smart attendee logistics platform.",
    guide: "Prof. Priyankashree & Prof. Sachin",
    end_users: "Event organizers, institutions, and attendees"
  },
  {
    project_id: "24UTIT21",
    title: "Smart Parking System",
    desc: "IoT-enabled parking allocation and real-time slot vacancy optimization platform using ultrasonic edge telemetry and license plate recognition.",
    guide: "Prof. Sharada H N",
    end_users: "Urban commuters, Commercial hubs, Airport facilities"
  },
  {
    project_id: "24RSSY02",
    title: "Piezoelectric Energy Harvesting Steps",
    desc: "Converts kinetic human footstep energy into clean electricity for rural public infrastructure lighting and sensor micro-grids.",
    guide: "Prof. Amaresha K",
    end_users: "Municipalities, Rural Transit Stations"
  }
];

const CAPABILITY_CHIPS = [
  { label: "Smart Agriculture", query: "Smart farming and crop disease management" },
  { label: "Rural Health Diagnostics", query: "Healthcare diagnostic systems for rural communities" },
  { label: "Smart Parking & Transit", query: "Smart parking allocation and traffic clearance corridors" },
  { label: "Animal Welfare & ResQ", query: "Animal welfare, stray rescue, and emergency medical triage" },
  { label: "Assistive Access Grid", query: "Assistive navigation devices for visually impaired persons" },
  { label: "Cybersecurity & Fraud", query: "Financial fraud detection and secure digital transactions" }
];

function App() {
  // Theme Toggle State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("asip-theme") || "light";
  });

  const [messages, setMessages] = useState([
    {
      role: "bot",
      html: `<strong>Welcome to ASIP AI.</strong> I am the research intelligence assistant for the Atria Societal Impact Projects ecosystem.<br/><br/>I have full indexation of all <strong>220 active student engineering projects</strong> spanning Healthcare, Agriculture, Urban Mobility, Assistive Tech, and Environmental Sustainability.<br/><br/>Ask about any societal problem, technical solution, or faculty mentor to inspect matching projects.`
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("asip-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async (queryText) => {
    const q = (queryText || inputVal).trim();
    if (!q || isTyping) return;

    const userMsg = { role: "user", html: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Scroll to chat on suggestion click
    const chatEl = document.getElementById("chat");
    if (chatEl && queryText) {
      chatEl.scrollIntoView({ behavior: "smooth" });
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q })
      });

      if (!res.ok) {
        throw new Error("Server responded with error");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", html: data.text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          html: `<strong>ASIP Assistant:</strong> I am currently connecting with the institutional repository. Please ask your question again in a few moments.`
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const openProjectModal = async (projectId) => {
    setModalLoading(true);
    setModalProject({ project_id: projectId, title: "Loading project details..." });

    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(projectId)}`);
      if (!res.ok) throw new Error("Project not found");
      const data = await res.json();
      setModalProject(data);
    } catch (err) {
      setModalProject({
        project_id: projectId,
        title: "Project Overview",
        description: "Detailed specifications available through ASIP project coordinators."
      });
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => setModalProject(null);

  // Global listener for dynamic HTML result-card clicks
  useEffect(() => {
    window.openModal = (id) => openProjectModal(id);
  }, []);

  return (
    <div>
      {/* Top Header */}
      <header className="app-header">
        <div className="nav-container">
          <a className="nav-brand" href="index.html">
            <img
              src="assets/atria-header.png"
              alt="Atria Institute of Technology"
              className="brand-logo-img"
              onError={(e) => { e.target.src = "Header.png"; }}
            />
            <div className="brand-divider"></div>
            <div className="brand-text-wrap">
              <span className="brand-name">ASIP AI</span>
              <span className="brand-badge">ADRA</span>
            </div>
          </a>

          <nav className="nav-links">
            <a className="nav-link active" href="index.html">AI Explorer</a>
            <a className="nav-link" href="projects.html">Project Directory</a>
            <a className="nav-link" href="#framework">Curriculum Framework</a>
          </nav>

          <div className="nav-actions">
            {/* Dark/Light Theme Toggle */}
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                // Sun Icon for Dark Mode
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                // Moon Icon for Light Mode
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <a className="live-counter-pill" href="projects.html">
              <span className="live-dot"></span>
              <span>220 Projects Live</span>
            </a>
            
            <a className="btn-primary" href="projects.html">
              <span>Directory</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="page-container">
        
        {/* Clean Hero */}
        <section className="hero-section">
          <div className="hero-tag">
            Atria Institute of Technology · Societal Impact Engineering
          </div>
          <h1 className="hero-title">
            Research Intelligence for <span>220+ Engineering Solutions</span>
          </h1>
          <p className="hero-subtitle">
            Query, discover, and cross-reference student-led engineering solutions tackling Healthcare, Agriculture, Infrastructure, Cybersecurity, and Sustainability.
          </p>

          {/* Quick Capability Chips */}
          <div className="hero-chips-wrap">
            {CAPABILITY_CHIPS.map((chip, idx) => (
              <div
                key={idx}
                className="hero-chip"
                onClick={() => handleSend(chip.query)}
              >
                <span>{chip.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* AI Explorer Chat Console */}
        <section className="chat-wrapper" id="chat">
          <div className="chat-card">
            
            <div className="chat-card-header">
              <div className="chat-card-header-left">
                <div className="chat-avatar-icon">
                  <img
                    src="assets/atria-icon.png"
                    alt="ADRA"
                    onError={(e) => { e.target.src = "Atria icon.png"; }}
                  />
                </div>
                <div>
                  <div className="chat-header-title">ADRA Research Assistant</div>
                  <div className="chat-header-sub">Atria ASIP Project Repository · AI Verified</div>
                </div>
              </div>
              <div className="chat-status-badge">Online</div>
            </div>

            {/* Chat Messages */}
            <div className="chat-body">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-msg-row ${msg.role}`}>
                  <div
                    className="chat-msg-bubble"
                    dangerouslySetInnerHTML={{ __html: msg.html }}
                  />
                </div>
              ))}

              {isTyping && (
                <div className="chat-msg-row bot">
                  <div className="chat-typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar */}
            <div className="chat-input-bar">
              <textarea
                className="chat-input-field"
                placeholder="Ask about project solutions, technical domains, or faculty mentors..."
                rows="1"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                className="chat-send-btn"
                disabled={!inputVal.trim() || isTyping}
                onClick={() => handleSend()}
                title="Send query"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>

          </div>
        </section>

        {/* Tabular KPI Metrics */}
        <section className="kpi-grid">
          <div className="kpi-item">
            <div className="kpi-number accent">220</div>
            <div className="kpi-label">Verified Projects</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-number">900+</div>
            <div className="kpi-label">Student Engineers</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-number">12+</div>
            <div className="kpi-label">Impact Domains</div>
          </div>
          <div className="kpi-item">
            <div className="kpi-number">6</div>
            <div className="kpi-label">Academic Semesters</div>
          </div>
        </section>

        {/* Featured Projects Spotlight */}
        <section style={{ marginTop: "48px" }}>
          <div className="section-header">
            <div className="section-tag">Repository Spotlight</div>
            <h2 className="section-heading">Featured Engineering Initiatives</h2>
            <p className="section-sub">Highlighted multidisciplinary projects with verified prototypes and stakeholder architectures.</p>
          </div>

          <div className="featured-grid">
            {FEATURED_PROJECTS.map((proj) => (
              <div
                key={proj.project_id}
                className="featured-card"
                onClick={() => openProjectModal(proj.project_id)}
              >
                <div>
                  <div className="featured-card-top">
                    <span className="featured-id">{proj.project_id}</span>
                  </div>
                  <h3 className="featured-title">{proj.title}</h3>
                  <p className="featured-desc">{proj.desc}</p>
                </div>
                <div className="featured-meta">
                  <span>Mentor: {proj.guide}</span>
                  <span style={{ color: "var(--atria-red)", fontWeight: 700 }}>Inspect Team →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4-Phase Curriculum Framework */}
        <section id="framework" style={{ marginTop: "56px" }}>
          <div className="section-header">
            <div className="section-tag">Academic Architecture</div>
            <h2 className="section-heading">The 6-Semester ASIP Engineering Model</h2>
            <p className="section-sub">A credit-bearing innovation pipeline transforming student problem statements into scalable deployments.</p>
          </div>

          <div className="roadmap-grid">
            <div className="roadmap-card">
              <div className="roadmap-step">01</div>
              <div className="roadmap-title">Semester 3: Discovery</div>
              <div className="roadmap-desc">Stakeholder interviews, problem discovery, and baseline engineering requirement analysis.</div>
            </div>
            <div className="roadmap-card">
              <div className="roadmap-step">02</div>
              <div className="roadmap-title">Semester 4: Architecture</div>
              <div className="roadmap-desc">System design, circuit simulation, software wireframing, and faculty review milestones.</div>
            </div>
            <div className="roadmap-card" style={{ borderColor: "var(--atria-red-border)", background: "var(--atria-red-subtle)" }}>
              <div className="roadmap-step">03</div>
              <div className="roadmap-title">Semesters 5–6: MVP Trials</div>
              <div className="roadmap-desc">Functional hardware/software prototype fabrication, user validation, and field trial iterations.</div>
            </div>
            <div className="roadmap-card">
              <div className="roadmap-step">04</div>
              <div className="roadmap-title">Semesters 7–8: Deployment</div>
              <div className="roadmap-desc">Production hardening, documentation, patent submission, and stakeholder handoff.</div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-row-top">
            <img
              src="assets/atria-footer.png"
              alt="Atria Institute of Technology"
              className="footer-logo"
              onError={(e) => { e.target.src = "footer.png"; }}
            />
            <div className="footer-info">
              <div className="footer-info-title">Center for Societal Impact Engineering</div>
              <div className="footer-info-sub">Atria Institute of Technology · ASKB Campus, Bangalore</div>
            </div>
          </div>
          <div className="footer-row-bottom">
            <div>© 2024–2026 Atria Institute of Technology. All rights reserved.</div>
            <div>ASIP AI Intelligence Platform · Version 3.2</div>
          </div>
        </div>
      </footer>

      {/* Detail Modal Dialog */}
      {modalProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} title="Close">
              ✕
            </button>

            <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", marginBottom: "4px" }}>
              {modalProject.project_id}
            </div>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "19px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "12px", paddingRight: "28px" }}>
              {modalProject.title}
            </h2>

            {modalProject.guide && (
              <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
                <span className="chip">Mentor: {modalProject.guide}</span>
              </div>
            )}

            {modalProject.description && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "11.5px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Problem Statement & Solution
                </div>
                <div style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: "1.6", background: "var(--bg-surface-subtle)", padding: "12px", borderRadius: "var(--radius-md)" }}>
                  {modalProject.description}
                </div>
              </div>
            )}

            {modalProject.end_users && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "11.5px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Target Beneficiaries
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  {modalProject.end_users}
                </div>
              </div>
            )}

            {modalProject.students && modalProject.students.length > 0 && (
              <div>
                <div style={{ fontSize: "11.5px", fontWeight: "700", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Student Engineering Team
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {modalProject.students.map((s, i) => (
                    <span key={i} className="student-tag">
                      👤 {s.name} {s.usn ? `(${s.usn})` : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// Render React App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
