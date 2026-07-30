import { useState, useEffect, useRef, useCallback } from "react";

const THEMES = {
  light: { bg: "#FAFAF9", fg: "#1A1A1A", muted: "#737373", accent: "#2563EB", border: "#E5E5E5", cardBg: "#FFFFFF", sectionAlt: "#F5F5F4" },
  dark: { bg: "#0C0C0C", fg: "#F5F5F5", muted: "#A3A3A3", accent: "#60A5FA", border: "#262626", cardBg: "#171717", sectionAlt: "#111111" },
};

const NAV_LINKS = ["Work", "About", "Skills", "Services", "Contact"];

const PROJECTS = [
  {
    num: "01",
    name: "Xlar AI",
    type: "AI Web Application",
    year: "2025",
    stack: ["TypeScript", "Node.js", "REST API", "OCR"],
    desc: "A powerful text summarization tool supporting PDFs, Word docs, plain text, Markdown, images with OCR, and web articles. Automatically processes scanned documents for intelligent content extraction.",
    link: "https://xlar.vercel.app",
    color: "#6366F1",
    gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)",
  },
  {
    num: "02",
    name: "Cinee",
    type: "Entertainment Platform",
    year: "2025",
    stack: ["React", "Vite", "TMDB API", "CSS"],
    desc: "A sleek movie discovery and streaming platform with real-time search, curated collections, detailed movie info, and a smooth cinematic browsing experience.",
    link: "https://cinee-sand.vercel.app",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444, #F97316)",
  },
  {
    num: "03",
    name: "KWASU Food",
    type: "Food Delivery App",
    year: "2025",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    desc: "A full-stack campus food ordering platform connecting students with local vendors. Features real-time order tracking, vendor dashboards, and seamless payment integration.",
    link: "https://kwasu-food.onrender.com",
    color: "#22C55E",
    gradient: "linear-gradient(135deg, #22C55E, #14B8A6)",
  },
];

const SKILLS = [
  { name: "React", level: 95 },
  { name: "Next.js", level: 88 },
  { name: "TypeScript", level: 85 },
  { name: "JavaScript ES6+", level: 95 },
  { name: "Vite", level: 90 },
  { name: "Tailwind CSS", level: 92 },
  { name: "HTML5 & CSS3", level: 95 },
  { name: "Framer Motion", level: 80 },
  { name: "Node.js", level: 82 },
  { name: "Supabase", level: 78 },
  { name: "Firebase", level: 80 },
  { name: "REST APIs", level: 90 },
  { name: "Git & GitHub", level: 92 },
  { name: "Figma", level: 75 },
];

const SERVICES = [
  {
    num: "01",
    title: "Landing Pages",
    desc: "Fast, conversion-focused pages that make your product impossible to ignore. Pixel-perfect on every screen size.",
    icon: "🚀",
  },
  {
    num: "02",
    title: "Web Applications",
    desc: "Full-featured React apps with auth, databases, and clean UX — built to ship and built to scale from day one.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "UI/UX Development",
    desc: "From Figma file to flawless implementation. Smooth animations, thoughtful interactions, interfaces people enjoy.",
    icon: "🎨",
  },
  {
    num: "04",
    title: "AI Integration",
    desc: "Modern products powered by AI APIs. Smart features, chatbots, recognition tools — built right from the first line.",
    icon: "🤖",
  },
];

const EXPERIENCE = [
  { year: "2025", role: "Frontend Developer", company: "Pantheon Studio", desc: "Building products at a venture studio in Abuja" },
  { year: "2024", role: "Freelance Developer", company: "Independent", desc: "Shipped projects for startups and small businesses" },
  { year: "2023", role: "CS Student", company: "Veritas University", desc: "Studying Computer Science, building side projects" },
];

function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, visible] = useReveal();
  const transforms = { up: "translateY(30px)", down: "translateY(-30px)", left: "translateX(30px)", right: "translateX(-30px)" };
  return (
    <div ref={ref} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0)" : transforms[direction],
      transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Typewriter({ words, t }) {
  const [state, setState] = useState({ index: 0, text: "", deleting: false });

  useEffect(() => {
    const { index, text, deleting } = state;
    const word = words[index];
    const speed = deleting ? 40 : 80;

    if (!deleting && text === word) {
      const timeout = setTimeout(() => setState((s) => ({ ...s, deleting: true })), 2000);
      return () => clearTimeout(timeout);
    }
    if (deleting && text === "") {
      const timeout = setTimeout(() => setState({ index: (index + 1) % words.length, text: "", deleting: false }), 100);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setState((s) => ({
        ...s,
        text: deleting ? word.substring(0, text.length - 1) : word.substring(0, text.length + 1),
      }));
    }, speed);
    return () => clearTimeout(timeout);
  }, [state, words]);

  return (
    <span style={{ color: t.accent }}>
      {state.text}
      <span style={{ animation: "blink 1s step-end infinite", borderRight: `2px solid ${t.accent}`, marginLeft: 2 }}>&nbsp;</span>
    </span>
  );
}

function SkillBar({ name, level, t }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ padding: "16px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: t.fg }}>
          {name}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.muted }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" style={{
          width: visible ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${t.accent}, ${t.accent}80)`,
        }} />
      </div>
    </div>
  );
}

function AnimNum({ val, suffix = "+" }) {
  const [display, setDisplay] = useState(0);
  const [ref, visible] = useReveal();
  const started = useRef(false);

  useEffect(() => {
    if (visible && !started.current) {
      started.current = true;
      let start = 0;
      const step = () => {
        start += Math.ceil(val / 25);
        if (start >= val) { setDisplay(val); return; }
        setDisplay(start);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [visible, val]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showTop, setShowTop] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const w = useWidth();
  const sm = w < 640;
  const md = w >= 640 && w < 1024;
  const lg = w >= 1024;
  const px = sm ? "20px" : md ? "40px" : "72px";
  const t = THEMES[theme];

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 30);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  if (!loaded) {
    return (
      <div style={{
        position: "fixed", inset: 0, background: t.bg, display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 9999,
        transition: "opacity 0.4s",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: sm ? 28 : 36, color: t.fg, marginBottom: 20, letterSpacing: "-1px",
          }}>
            GA<span style={{ color: t.accent }}>.</span>
          </div>
          <div style={{
            width: 40, height: 3, background: t.border, borderRadius: 2, overflow: "hidden",
          }}>
            <div style={{
              width: "60%", height: "100%", background: t.accent, borderRadius: 2,
              animation: "loadBar 1.2s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: t.bg, color: t.fg, fontFamily: "'Inter', 'Helvetica Neue', sans-serif", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${t.accent}30; color: ${t.fg}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.accent}40; border-radius: 4px; }
        a { color: inherit; text-decoration: none; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes loadBar { 0%{transform:translateX(-100%)} 50%{transform:translateX(60%)} 100%{transform:translateX(200%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

        .nav-link { font-size: 14px; font-weight: 500; color: ${t.muted}; transition: color .2s; position: relative; }
        .nav-link:hover { color: ${t.fg}; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: ${t.accent}; transition: width .2s; }
        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${t.accent}; color: #fff;
          padding: 14px 28px; font-family: inherit;
          font-size: 14px; font-weight: 600; border: none; border-radius: 8px;
          cursor: pointer; transition: all .2s; letter-spacing: .3px;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px ${t.accent}35; }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: ${t.fg};
          padding: 14px 28px; font-family: inherit;
          font-size: 14px; font-weight: 600;
          border: 1.5px solid ${t.border}; border-radius: 8px;
          cursor: pointer; transition: all .2s;
        }
        .btn-secondary:hover { border-color: ${t.accent}; color: ${t.accent}; transform: translateY(-2px); }

        .project-card {
          border: 1.5px solid ${t.border};
          border-radius: 12px;
          background: ${t.cardBg};
          transition: all .3s cubic-bezier(.16,1,.3,1);
          display: block; overflow: hidden;
        }
        .project-card:hover { border-color: ${t.accent}60; transform: translateY(-6px); box-shadow: 0 20px 40px ${t.fg}08; }

        .skill-bar-bg { width: 100%; height: 4px; background: ${t.border}; border-radius: 4px; overflow: hidden; }
        .skill-bar-fill { height: 100%; border-radius: 4px; transition: width 1.2s cubic-bezier(.16,1,.3,1); }

        .svc-card {
          padding: 32px 28px; border: 1.5px solid ${t.border}; border-radius: 12px;
          background: ${t.cardBg}; transition: all .3s;
        }
        .svc-card:hover { border-color: ${t.accent}; transform: translateY(-4px); box-shadow: 0 12px 30px ${t.fg}06; }

        .mobile-menu {
          position: fixed; inset: 0; background: ${t.bg};
          z-index: 300; display: flex; flex-direction: column;
          padding: 0 20px 32px;
          opacity: 0; pointer-events: none;
          transition: opacity .25s ease;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }

        .theme-btn {
          width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid ${t.border};
          background: ${t.cardBg}; cursor: pointer; display: flex; align-items: center;
          justify-content: center; font-size: 18px; transition: all .2s;
        }
        .theme-btn:hover { border-color: ${t.accent}; transform: rotate(30deg); }

        .back-to-top {
          position: fixed; bottom: 28px; right: 28px; z-index: 200;
          width: 44px; height: 44px; border-radius: 50%;
          background: ${t.accent}; color: #fff; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; transition: all .3s; box-shadow: 0 4px 15px ${t.accent}40;
        }
        .back-to-top:hover { transform: translateY(-3px); }

        .mq-track { display: flex; width: max-content; animation: mq 30s linear infinite; }

        .timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: ${t.accent}; border: 3px solid ${t.bg}; box-shadow: 0 0 0 2px ${t.accent}40; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? t.bg + "F0" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        transition: "all .3s",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: `0 ${px}`, height: 70,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <a href="#" style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 22, letterSpacing: "-0.5px", color: t.fg,
          }}>
            GA<span style={{ color: t.accent }}>.</span>
          </a>

          {!sm ? (
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {NAV_LINKS.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
              ))}
              <button className="theme-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
              <a href="#contact" className="btn-primary" style={{ padding: "10px 22px", fontSize: 13, borderRadius: 6 }}>
                Hire Me
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="theme-btn" style={{ width: 38, height: 38, fontSize: 16 }} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
              <button onClick={() => setMenuOpen((v) => !v)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 4,
                display: "flex", flexDirection: "column", gap: 5,
              }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    display: "block", width: 22, height: 2, background: t.fg, borderRadius: 1,
                    transition: "all .2s",
                    transform: menuOpen ? (i === 0 ? "rotate(45deg) translateY(7px)" : i === 2 ? "rotate(-45deg) translateY(-7px)" : "none") : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }} />
                ))}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div style={{ height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: t.fg }}>
            GA<span style={{ color: t.accent }}>.</span>
          </span>
          <button onClick={() => setMenuOpen(false)} style={{
            background: "none", border: "none", color: t.fg, fontSize: 28, cursor: "pointer", lineHeight: 1,
          }}>
            ✕
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
          {NAV_LINKS.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 9vw, 48px)",
              fontWeight: 700, color: t.fg, padding: "10px 0", borderBottom: `1px solid ${t.border}`,
              lineHeight: 1.2, animation: menuOpen ? `slideIn 0.3s ${i * 0.06}s both` : "none",
            }}>
              {l}
            </a>
          ))}
        </div>
        <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ textAlign: "center", borderRadius: 8 }}>
          Hire Me →
        </a>
      </div>

      {/* ── HERO ── */}
      <section style={{
        paddingTop: sm ? 120 : 140, paddingBottom: sm ? 80 : 120,
        paddingLeft: px, paddingRight: px, maxWidth: 1200, margin: "0 auto",
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <Reveal delay={0}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px",
            border: `1.5px solid ${t.border}`, borderRadius: 50, marginBottom: 32,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", animation: "pulse 2s infinite" }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, color: t.muted,
            }}>
              AVAILABLE FOR PROJECTS
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: sm ? "clamp(36px, 11vw, 52px)" : "clamp(56px, 7.5vw, 80px)",
            lineHeight: 1.05, letterSpacing: sm ? "-1px" : "-2.5px", fontWeight: 700,
            color: t.fg, marginBottom: 8, maxWidth: 800,
          }}>
            I build web experiences
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: sm ? "clamp(36px, 11vw, 52px)" : "clamp(56px, 7.5vw, 80px)",
            lineHeight: 1.05, letterSpacing: sm ? "-1px" : "-2.5px", fontWeight: 700,
            marginBottom: 28, maxWidth: 800,
          }}>
            that <Typewriter words={["work beautifully", "ship fast", "users love", "scale well"]} t={t} />
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p style={{
            fontSize: sm ? 16 : 18, lineHeight: 1.7, color: t.muted,
            maxWidth: 520, marginBottom: 40, fontWeight: 400,
          }}>
            Frontend developer based in Abuja, Nigeria. Specialising in React and
            Next.js — turning ideas into fast, polished, production-ready products.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 72 }}>
            <a href="#work" className="btn-primary">View My Work →</a>
            <a href="#contact" className="btn-secondary">Get in Touch</a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{
            display: "grid", gridTemplateColumns: sm ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap: 1, background: t.border, borderRadius: 12, overflow: "hidden",
            border: `1px solid ${t.border}`,
          }}>
            {[
              [10, "Projects Shipped", "+"],
              [5, "Years Building", "+"],
              [3, "Live Products", ""],
              [100, "Client Satisfaction", "%"],
            ].map(([n, l, suffix]) => (
              <div key={l} style={{ background: t.cardBg, padding: sm ? "20px 16px" : "28px 24px" }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: sm ? 28 : 36,
                  fontWeight: 700, color: t.fg, marginBottom: 6, letterSpacing: "-1px",
                }}>
                  <AnimNum val={n} suffix={suffix} />
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  letterSpacing: 2, color: t.muted, textTransform: "uppercase",
                }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{
        overflow: "hidden", borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`,
        padding: "16px 0", background: theme === "dark" ? "#111" : "#F0F0EE",
      }}>
        <div className="mq-track">
          {[...Array(8)].map((_, i) => (
            <span key={i} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: 3, color: t.muted + "60", marginRight: 48, whiteSpace: "nowrap",
            }}>
              REACT — NEXT.JS — TYPESCRIPT — VITE — TAILWIND — NODE.JS — SUPABASE — AI INTEGRATION — FRAMER MOTION
            </span>
          ))}
        </div>
      </div>

      {/* ── WORK ── */}
      <section id="work" style={{ padding: `100px ${px}`, maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            letterSpacing: 3, color: t.accent, textTransform: "uppercase", marginBottom: 12,
          }}>
            Selected Work
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: 48, flexWrap: "wrap", gap: 16,
          }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: sm ? 32 : 44,
              letterSpacing: "-1.5px", lineHeight: 1.1, fontWeight: 700, color: t.fg,
            }}>
              Recent Projects
            </h2>
            <a href="https://github.com/tegatheprogrammer" target="_blank" rel="noreferrer" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2,
              color: t.accent, display: "flex", alignItems: "center", gap: 6,
            }}>
              ALL ON GITHUB <span style={{ fontSize: 16 }}>→</span>
            </a>
          </div>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: lg ? "repeat(3,1fr)" : md ? "repeat(2,1fr)" : "1fr",
          gap: 20,
        }}>
          {PROJECTS.map((p, idx) => (
            <Reveal key={p.num} delay={idx * 0.1}>
              <a href={p.link} target="_blank" rel="noreferrer" className="project-card">
                <div style={{
                  height: sm ? 140 : 180, background: p.gradient,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `radial-gradient(circle at 30% 70%, ${p.color}40, transparent 70%)`,
                  }} />
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: sm ? 28 : 36, color: "#fff", letterSpacing: "-1px",
                    position: "relative", zIndex: 1,
                  }}>
                    {p.name}
                  </span>
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
                    padding: "4px 10px", borderRadius: 20, fontSize: 10,
                    color: "#fff", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1,
                  }}>
                    LIVE ●
                  </div>
                </div>

                <div style={{ padding: "24px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif", fontSize: 20,
                        letterSpacing: "-0.3px", fontWeight: 700, color: t.fg,
                        marginBottom: 4, lineHeight: 1.2,
                      }}>
                        {p.name}
                      </h3>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        letterSpacing: 2, color: t.muted,
                      }}>
                        {p.type}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        color: t.muted, letterSpacing: 1,
                      }}>
                        {p.year}
                      </span>
                      <span style={{ fontSize: 16, color: t.accent }}>↗</span>
                    </div>
                  </div>

                  <p style={{ fontSize: 14, lineHeight: 1.7, color: t.muted, marginBottom: 18 }}>
                    {p.desc}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.stack.map((s) => (
                      <span key={s} style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        letterSpacing: 1, padding: "5px 12px",
                        border: `1px solid ${t.border}`, borderRadius: 6,
                        color: t.muted, background: t.bg,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: t.sectionAlt, padding: `100px ${px}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: 3, color: t.accent, textTransform: "uppercase", marginBottom: 12,
            }}>
              About Me
            </div>
          </Reveal>

          <div style={{
            display: "grid", gridTemplateColumns: lg ? "1fr 1fr" : "1fr",
            gap: lg ? 80 : 48, alignItems: "start",
          }}>
            <div>
              <Reveal delay={0.05}>
                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: sm ? 32 : 44,
                  letterSpacing: "-1.5px", lineHeight: 1.1, fontWeight: 700,
                  color: t.fg, marginBottom: 28,
                }}>
                  Developer, creator,<br />
                  <span style={{ color: t.muted }}>and lifelong builder.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontSize: sm ? 15 : 16, lineHeight: 1.85, color: t.muted, marginBottom: 18 }}>
                  I'm <strong style={{ color: t.fg, fontWeight: 600 }}>Great Anthony</strong> — a frontend developer
                  building products at <strong style={{ color: t.fg, fontWeight: 600 }}>Pantheon</strong>, a venture
                  studio in Abuja, while completing my Computer Science degree at Veritas University.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ fontSize: sm ? 15 : 16, lineHeight: 1.85, color: t.muted }}>
                  Outside of code I run a cinematic history YouTube channel, trade forex and
                  index markets, and build side projects I wish existed. Every pixel, every interaction matters.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.1}>
                <div style={{ border: `1.5px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
                  {[
                    ["Location", "Abuja, Nigeria"],
                    ["Status", "Open to Work"],
                    ["Stack", "React / Next.js / TypeScript"],
                    ["Education", "CS — Veritas University"],
                    ["Currently", "Pantheon Studio"],
                    ["Remote", "Available Worldwide"],
                  ].map(([k, v], i, arr) => (
                    <div key={k} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "16px 22px", borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none",
                      flexWrap: "wrap", gap: 8, transition: "background .2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = t.cardBg}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        letterSpacing: 2, color: t.muted,
                      }}>
                        {k}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: t.fg }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div style={{ marginTop: 16 }}>
                  <a href="#contact" className="btn-primary" style={{ width: "100%", justifyContent: "center", borderRadius: 8 }}>
                    Work With Me →
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Experience Timeline */}
          <div style={{ marginTop: 80 }}>
            <Reveal>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: sm ? 24 : 30,
                letterSpacing: "-1px", fontWeight: 700, color: t.fg, marginBottom: 40,
              }}>
                Experience
              </h3>
            </Reveal>

            <div style={{ position: "relative", paddingLeft: sm ? 24 : 40 }}>
              <div style={{
                position: "absolute", left: sm ? 5 : 5, top: 6, bottom: 6,
                width: 2, background: `linear-gradient(to bottom, ${t.accent}, ${t.accent}20)`,
              }} />

              {EXPERIENCE.map((exp, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{ position: "relative", marginBottom: i < EXPERIENCE.length - 1 ? 36 : 0, paddingLeft: sm ? 16 : 24 }}>
                    <div className="timeline-dot" style={{ position: "absolute", left: sm ? -24 : -40, top: 6 }} />
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                      letterSpacing: 2, color: t.accent, marginBottom: 6,
                    }}>
                      {exp.year}
                    </div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: 18,
                      fontWeight: 600, color: t.fg, marginBottom: 4,
                    }}>
                      {exp.role}
                    </div>
                    <div style={{ fontSize: 14, color: t.muted, marginBottom: 4 }}>
                      {exp.company}
                    </div>
                    <div style={{ fontSize: 13, color: t.muted + "90" }}>
                      {exp.desc}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: `100px ${px}`, maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            letterSpacing: 3, color: t.accent, textTransform: "uppercase", marginBottom: 12,
          }}>
            Tech Stack
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: sm ? 32 : 44,
            letterSpacing: "-1.5px", fontWeight: 700, color: t.fg, marginBottom: 48, lineHeight: 1.1,
          }}>
            My Toolkit
          </h2>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: lg ? "repeat(2, 1fr)" : "1fr",
          gap: 20,
        }}>
          {SKILLS.map((s) => (
            <SkillBar key={s.name} name={s.name} level={s.level} t={t} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: t.sectionAlt, padding: `100px ${px}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: 3, color: t.accent, textTransform: "uppercase", marginBottom: 12,
            }}>
              What I Do
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              marginBottom: 48, flexWrap: "wrap", gap: 16,
            }}>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: sm ? 32 : 44,
                letterSpacing: "-1.5px", lineHeight: 1.1, fontWeight: 700, color: t.fg,
              }}>
                Services
              </h2>
              <p style={{ fontSize: 14, color: t.muted, maxWidth: 320, lineHeight: 1.65 }}>
                I work with startups, agencies, and businesses of all sizes.
              </p>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: lg ? "repeat(2,1fr)" : "1fr",
            gap: 16,
          }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div className="svc-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                      letterSpacing: 2, color: t.muted,
                    }}>
                      {s.num}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 22,
                    letterSpacing: "-0.3px", fontWeight: 700, color: t.fg,
                    marginBottom: 12, lineHeight: 1.25,
                  }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: t.muted }}>
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: `100px ${px} 80px` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: 3, color: t.accent, textTransform: "uppercase", marginBottom: 12,
            }}>
              Contact
            </div>
          </Reveal>

          <div style={{
            display: "grid", gridTemplateColumns: lg ? "1fr 1fr" : "1fr",
            gap: lg ? 80 : 48, alignItems: "start",
          }}>
            <div>
              <Reveal delay={0.05}>
                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: sm ? "clamp(32px,10vw,44px)" : "clamp(44px,5vw,60px)",
                  letterSpacing: "-2px", fontWeight: 700, color: t.fg,
                  lineHeight: 1.05, marginBottom: 22,
                }}>
                  Let's build something{" "}
                  <span style={{ color: t.accent }}>great</span> together.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontSize: sm ? 15 : 16, lineHeight: 1.8, color: t.muted, maxWidth: 400 }}>
                  Open to freelance projects, contracts, and full-time remote roles.
                  International clients welcome — I invoice in USD.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{
                  padding: "22px 24px", border: `1.5px solid ${t.border}`, borderRadius: 10,
                  background: t.cardBg, transition: "border-color .2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = t.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = t.border}
                >
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    letterSpacing: 2, color: t.muted, marginBottom: 8,
                  }}>
                    EMAIL
                  </div>
                  <a href="mailto:agreat496@email.com" style={{
                    fontSize: 15, color: t.fg, fontWeight: 500,
                  }}>
                    agreat496@email.com
                  </a>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    ["GitHub", "https://github.com/tegatheprogrammer", "tegatheprogrammer"],
                    ["Twitter/X", "https://x.com/tegatheprogrammer", "@tegatheprogrammer"],
                  ].map(([label, href, val]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                      padding: "18px 18px", border: `1.5px solid ${t.border}`, borderRadius: 10,
                      display: "block", transition: "border-color .2s", background: t.cardBg,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = t.accent}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = t.border}
                    >
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        letterSpacing: 2, color: t.muted, marginBottom: 8,
                      }}>
                        {label.toUpperCase()}
                      </div>
                      <div style={{ fontSize: 13, color: t.fg, fontWeight: 500, wordBreak: "break-all" }}>
                        {val}
                      </div>
                    </a>
                  ))}
                </div>

                <a href="mailto:agreat496@email.com" className="btn-primary" style={{ textAlign: "center", justifyContent: "center", borderRadius: 8 }}>
                  Send Me an Email →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: `24px ${px}` }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", display: "flex",
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: t.fg,
          }}>
            GA<span style={{ color: t.accent }}>.</span>
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            letterSpacing: 2, color: t.muted,
          }}>
            © 2025 — ABUJA, NIGERIA
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              ["GitHub", "https://github.com/tegatheprogrammer"],
              ["Twitter/X", "https://x.com/tegatheprogrammer"],
              ["LinkedIn", "https://linkedin.com/in/tegatheprogrammer"],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                letterSpacing: 1, color: t.muted, transition: "color .2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = t.accent}
              onMouseLeave={(e) => e.currentTarget.style.color = t.muted}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button className="back-to-top" onClick={scrollToTop} style={{ opacity: showTop ? 1 : 0 }}>
          ↑
        </button>
      )}
    </div>
  );
}
