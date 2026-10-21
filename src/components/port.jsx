import { useState, useEffect, useRef, useCallback } from "react";

const THEMES = {
  dark: {
    bg: "#111110", fg: "#F0EDE8", muted: "#8A8884", accent: "#C8FF00",
    border: "#222220", card: "#1A1A18", hover: "#1F1F1D",
    navBg: "#111110EE", selection: "#C8FF00",
  },
  light: {
    bg: "#F8F7F4", fg: "#1A1917", muted: "#6B6A66", accent: "#1A1917",
    border: "#E0DFDB", card: "#FFFFFF", hover: "#F0EFEC",
    navBg: "#F8F7F4F0", selection: "#1A1917",
  },
};

const NAV = ["Work", "About", "Process", "Services", "Contact"];

const PROJECTS = [
  {
    num: "01",
    name: "Xlar AI",
    type: "AI Summarization Tool",
    year: "2025",
    stack: ["TypeScript", "Node.js", "REST API", "OCR"],
    desc: "An intelligent text summarization engine supporting PDFs, Word docs, Markdown, images with OCR, and web articles. Processes scanned documents automatically for smart content extraction.",
    link: "https://xlar.vercel.app",
    color: "#6366F1",
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  },
  {
    num: "02",
    name: "HostHpp",
    type: "Migration tool",
    year: "2026",
    stack: ["React", "Vite", "Supabase", "Typescript"],
    desc: "A migration tool for migrating sites from one hosting provider to another seamlessly e.g (vercel - netlify).",
    link: "https://migrait-six.vercel.app",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
  },
  {
    num: "03",
    name: "SHIFT",
    type: "AI PLANNER",
    year: "2025",
    stack: ["React", "Node.js", "Next.js", "MongoDB", "Express"],
    desc: "Shift turns a long term goal into one task a day - then turns your work log into proof you can share.",
    link: "https://shift-web-ochre.vercel.app/",
    color: "#22C55E",
    gradient: "linear-gradient(135deg, #16A34A 0%, #14B8A6 100%)",
  },
];

const SKILLS = [
  "React", "Next.js", "TypeScript", "JavaScript ES6+",
  "Vite", "Tailwind CSS", "HTML5 & CSS3", "Framer Motion",
  "Node.js", "Supabase", "Firebase", "REST APIs",
  "Git & GitHub", "Figma",
];

const SERVICES = [
  { num: "01", title: "Landing Pages", desc: "Fast, conversion-focused pages that make your product impossible to ignore. Pixel-perfect on every device." },
  { num: "02", title: "Web Applications", desc: "Full-featured React apps with auth, real-time data, and polished UX. Architected to ship and scale." },
  { num: "03", title: "UI/UX Development", desc: "From Figma to flawless code. Smooth animations, considered interactions, interfaces people remember." },
  { num: "04", title: "AI Integration", desc: "Modern products with embedded intelligence. Smart features, recognition tools, and AI-powered workflows." },
];

const PROCESS = [
  { num: "01", title: "Discovery", desc: "I start by understanding your goals, users, and constraints. Research, not assumptions." },
  { num: "02", title: "Design", desc: "Wireframes and prototypes in Figma. We iterate until the vision is sharp and the UX is seamless." },
  { num: "03", title: "Develop", desc: "Clean, performant React code. Component architecture that scales. Ship-ready from day one." },
  { num: "04", title: "Deliver", desc: "Launch, monitor, and refine. I stay until the product is live, stable, and getting results." },
];

const EXPERIENCE = [
  { year: "2025", role: "Frontend Developer", place: "Pantheon Studio", desc: "Building products at a venture studio in Abuja" },
  { year: "2024", role: "Freelance Developer", place: "Independent", desc: "Shipped projects for startups and growing businesses" },
  { year: "2023", role: "CS Student", place: "Veritas University", desc: "Studying Computer Science, building side projects" },
];

const TESTIMONIALS = [
  { name: "Daniel O.", role: "Startup Founder", text: "Great Anthony delivered beyond expectations. The attention to detail and speed of execution was remarkable. Our conversion rate doubled after launch." },
  { name: "Sarah K.", role: "Product Manager", text: "Working with Great was seamless. He understood the vision immediately and translated it into a product that feels premium. Highly recommend." },
  { name: "James A.", role: "Agency Director", text: "One of the most talented frontend developers I've worked with. Clean code, beautiful interfaces, and always ahead of schedule." },
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

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0, y = 40, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      ...style, opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.9s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.9s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SplitText({ text, delay = 0, style = {} }) {
  const [ref, vis] = useReveal(0.3);
  return (
    <span ref={ref} style={{ ...style, display: "inline-block", overflow: "hidden" }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display: "inline-block",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0) rotate(0)" : "translateY(100%) rotate(5deg)",
          transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay + i * 0.025}s`,
          whiteSpace: ch === " " ? "pre" : undefined,
        }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

function MagneticWrap({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const w = useWidth();
  const handleMove = useCallback((e) => {
    if (w < 640) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength, w]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ display: "inline-block", transition: "transform 0.4s cubic-bezier(.22,1,.36,1)", willChange: "transform" }}>
      {children}
    </div>
  );
}

function Cursor({ t }) {
  const dot = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const w = useWidth();

  useEffect(() => {
    if (w < 640) return;
    const move = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      if (dot.current) dot.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      if (ring.current) {
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.08;
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.08;
        ring.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, [w]);

  if (w < 640) return null;
  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, background: t.accent, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, border: `1.5px solid ${t.accent}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, mixBlendMode: "difference", opacity: 0.3 }} />
    </>
  );
}

function AnimNum({ val, suffix = "+" }) {
  const [display, setDisplay] = useState(0);
  const [ref, vis] = useReveal();
  const started = useRef(false);
  useEffect(() => {
    if (vis && !started.current) {
      started.current = true;
      let n = 0;
      const step = () => { n += Math.ceil(val / 30); if (n >= val) { setDisplay(val); return; } setDisplay(n); requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
  }, [vis, val]);
  return <span ref={ref}>{display}{suffix}</span>;
}

function SkillPill({ name, t }) {
  const [ref, vis] = useReveal(0.1);
  const [hov, setHov] = useState(false);
  return (
    <span ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block", padding: "10px 20px",
        border: `1px solid ${hov ? t.accent : t.border}`,
        fontSize: 12, letterSpacing: 1.5, fontFamily: "'JetBrains Mono', monospace",
        color: hov ? (t === THEMES.dark ? t.bg : "#fff") : t.muted,
        background: hov ? t.accent : "transparent",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(12px)",
        cursor: "default",
      }}>
      {name}
    </span>
  );
}

function SectionLabel({ num, text, t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: t.accent }}>{num}</span>
      <div style={{ width: 32, height: 1, background: t.accent }} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: t.muted, textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mode, setMode] = useState("dark");
  const w = useWidth();
  const sm = w < 640;
  const md = w >= 640 && w < 1024;
  const lg = w >= 1024;
  const px = sm ? "20px" : md ? "48px" : "72px";
  const t = THEMES[mode];

  useEffect(() => { setTimeout(() => setLoaded(true), 1200); }, []);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 40); setShowTop(window.scrollY > 600); setScrollY(window.scrollY); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toTop = useCallback(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);
  const isDark = mode === "dark";

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: sm ? 44 : 64, color: t.fg, letterSpacing: "-3px", lineHeight: 1 }}>
            GA<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
          </div>
          <div style={{ marginTop: 28, width: 48, height: 2, background: t.border, borderRadius: 1, overflow: "hidden", margin: "28px auto 0" }}>
            <div style={{ width: "40%", height: "100%", background: isDark ? "#C8FF00" : t.fg, borderRadius: 1, animation: "loadSlide 1s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: t.bg, color: t.fg, fontFamily: "'Inter', 'Helvetica Neue', sans-serif", overflowX: "hidden", transition: "background .5s, color .5s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ${!sm ? `body { cursor: none; } * { cursor: none !important; }` : ""}
        ::selection { background: ${t.selection}; color: ${t.bg}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.accent}30; border-radius: 3px; }
        a { color: inherit; text-decoration: none; }

        @keyframes loadSlide { 0%{transform:translateX(-120%)} 50%{transform:translateX(180%)} 100%{transform:translateX(-120%)} }
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes lineGrow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        @keyframes menuSlide { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

        .noise::before {
          content:''; position:fixed; inset:0; z-index:9990; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity:${isDark ? 0.5 : 0.25};
        }
        .grid-line { position:fixed; top:0; bottom:0; width:1px; background:${t.fg}03; pointer-events:none; z-index:1; }
        .nav-a { font-size:13px; letter-spacing:1.5px; color:${t.muted}; transition:color .25s; position:relative; text-transform:uppercase; }
        .nav-a:hover { color:${t.fg}; }
        .nav-a::after { content:''; position:absolute; bottom:-6px; left:0; width:0; height:1px; background:${t.accent}; transition:width .3s cubic-bezier(.22,1,.36,1); }
        .nav-a:hover::after { width:100%; }

        .btn-fill {
          display:inline-flex; align-items:center; gap:10px;
          background:${t.accent}; color:${isDark ? t.bg : "#fff"};
          padding:16px 32px; font-family:'JetBrains Mono',monospace;
          font-size:11px; font-weight:500; letter-spacing:2px;
          border:none; text-transform:uppercase;
          transition:all .3s cubic-bezier(.22,1,.36,1);
        }
        .btn-fill:hover { opacity:.85; letter-spacing:3px; }

        .btn-line {
          display:inline-flex; align-items:center; gap:10px;
          background:transparent; color:${t.fg};
          padding:16px 32px; font-family:'JetBrains Mono',monospace;
          font-size:11px; font-weight:500; letter-spacing:2px;
          border:1px solid ${t.border}; text-transform:uppercase;
          transition:all .3s cubic-bezier(.22,1,.36,1);
        }
        .btn-line:hover { border-color:${t.accent}; color:${t.accent}; letter-spacing:3px; }

        .proj-card {
          display:block; border:1.5px solid ${t.border}; overflow:hidden;
          transition:all .4s cubic-bezier(.22,1,.36,1); background:${t.card};
        }
        .proj-card:hover { border-color:${t.accent}80; transform:translateY(-6px); box-shadow:0 24px 48px ${t.fg}08; }

        .svc-block {
          padding:${sm ? "28px 20px" : "40px 32px"}; border:1px solid ${t.border};
          transition:all .35s cubic-bezier(.22,1,.36,1);
          position:relative; overflow:hidden; background:${t.card};
        }
        .svc-block::before {
          content:''; position:absolute; bottom:0; left:0; right:0; height:0;
          background:${t.accent}; transition:height .4s cubic-bezier(.22,1,.36,1); z-index:0;
        }
        .svc-block:hover::before { height:100%; }
        .svc-block:hover { border-color:${t.accent}; }
        .svc-block:hover .svc-n, .svc-block:hover .svc-t, .svc-block:hover .svc-d {
          color:${isDark ? t.bg : "#fff"} !important; position:relative; z-index:1;
        }

        .mob-menu {
          position:fixed; inset:0; background:${t.bg}; z-index:500;
          display:flex; flex-direction:column; padding:0 20px 40px;
          opacity:0; pointer-events:none; transition:opacity .3s;
        }
        .mob-menu.open { opacity:1; pointer-events:all; }
        .mq-inner { display:flex; width:max-content; animation:mq 35s linear infinite; }

        .btt {
          position:fixed; bottom:${sm ? "20px" : "32px"}; right:${sm ? "20px" : "32px"}; z-index:200;
          width:44px; height:44px; background:${t.card};
          border:1px solid ${t.border}; color:${t.fg};
          display:flex; align-items:center; justify-content:center;
          font-size:16px; transition:all .3s;
        }
        .btt:hover { background:${t.accent}; border-color:${t.accent}; color:${isDark ? t.bg : "#fff"}; }

        .theme-toggle {
          width:40px; height:40px; border-radius:50%; border:1px solid ${t.border};
          background:${t.card}; display:flex; align-items:center; justify-content:center;
          font-size:15px; transition:all .3s; line-height:1;
        }
        .theme-toggle:hover { border-color:${t.accent}; transform:rotate(180deg); }

        .process-step {
          padding:${sm ? "24px 20px" : "36px 32px"}; border:1px solid ${t.border};
          background:${t.card}; transition:all .35s; position:relative;
        }
        .process-step:hover { border-color:${t.accent}; }
        .process-step::after {
          content:''; position:absolute; top:0; left:0; width:0; height:2px;
          background:${t.accent}; transition:width .4s cubic-bezier(.22,1,.36,1);
        }
        .process-step:hover::after { width:100%; }

        .testimonial-card {
          padding:${sm ? "24px 20px" : "32px 28px"}; border:1px solid ${t.border};
          background:${t.card}; transition:border-color .3s;
        }
        .testimonial-card:hover { border-color:${t.accent}40; }
      `}</style>

      <div className="noise" />
      {lg && <>
        <div className="grid-line" style={{ left: "72px" }} />
        <div className="grid-line" style={{ right: "72px" }} />
        <div className="grid-line" style={{ left: "50%" }} />
      </>}

      <Cursor t={t} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${px}`, height: sm ? 64 : 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        transition: "all .4s",
      }}>
        <MagneticWrap>
          <a href="#" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
            GA<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
          </a>
        </MagneticWrap>

        {!sm ? (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV.map((l) => (
              <MagneticWrap key={l} strength={0.15}>
                <a href={`#${l.toLowerCase()}`} className="nav-a">{l}</a>
              </MagneticWrap>
            ))}
            <button className="theme-toggle" onClick={() => setMode(isDark ? "light" : "dark")}>
              {isDark ? "☀" : "☾"}
            </button>
            <MagneticWrap>
              <a href="#contact" className="btn-fill" style={{ padding: "12px 24px", fontSize: 10 }}>Let's Talk</a>
            </MagneticWrap>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="theme-toggle" style={{ width: 36, height: 36, fontSize: 14 }} onClick={() => setMode(isDark ? "light" : "dark")}>
              {isDark ? "☀" : "☾"}
            </button>
            <button onClick={() => setMenuOpen((v) => !v)} style={{ background: "none", border: "none", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block", height: 1.5, background: t.fg, borderRadius: 1,
                  width: i === 1 ? 16 : 22, marginLeft: i === 1 ? "auto" : 0,
                  transition: "all .3s",
                  transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(3px,4px)" : i === 2 ? "rotate(-45deg) translate(3px,-4px)" : "scaleX(0)") : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20 }}>
            GA<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
          </span>
          <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: t.fg, fontSize: 28, lineHeight: 1 }}>
            +
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
          {NAV.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 10vw, 48px)",
              fontWeight: 800, color: t.fg, padding: "10px 0",
              borderBottom: `1px solid ${t.border}`, lineHeight: 1.15, letterSpacing: "-1.5px",
              animation: menuOpen ? `menuSlide 0.4s ${i * 0.06}s both` : "none",
            }}>
              {l}<span style={{ color: isDark ? "#C8FF00" : t.muted }}>.</span>
            </a>
          ))}
        </div>
        <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-fill" style={{ textAlign: "center", justifyContent: "center" }}>
          Let's Talk
        </a>
      </div>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", padding: `0 ${px}`,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        paddingBottom: sm ? 48 : 80, position: "relative",
      }}>
        {lg && (
          <Reveal delay={0.6} style={{
            position: "absolute", top: 100, right: 72,
            writingMode: "vertical-rl", fontSize: 10, letterSpacing: 4,
            fontFamily: "'JetBrains Mono', monospace", color: t.muted + "40",
          }}>
            FRONTEND DEV / 2025
          </Reveal>
        )}

        <Reveal delay={0}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: sm ? 24 : 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulse 2.5s ease infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: t.muted }}>
              OPEN TO OPPORTUNITIES
            </span>
          </div>
        </Reveal>

        <div style={{ marginBottom: sm ? 24 : 36 }}>
          <SplitText text="GREAT" delay={0.1} style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: `clamp(48px, 13vw, 140px)`, lineHeight: 0.9,
            letterSpacing: sm ? "-2px" : "-4px", display: "block", color: t.fg,
          }} />
          <SplitText text="ANTHONY." delay={0.3} style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: `clamp(48px, 13vw, 140px)`, lineHeight: 0.9,
            letterSpacing: sm ? "-2px" : "-4px", display: "block",
            WebkitTextStroke: `1.5px ${t.fg}${isDark ? "" : "60"}`, color: "transparent",
          }} />
        </div>

        <Reveal delay={0.5}>
          <p style={{ fontSize: sm ? 14 : 16, lineHeight: 1.85, color: t.muted, maxWidth: 480, marginBottom: sm ? 28 : 40 }}>
            Frontend developer based in Abuja, Nigeria. I craft fast, beautiful
            digital experiences with React and Next.js — obsessed with the details
            that make products feel alive.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: sm ? 40 : 72 }}>
            <MagneticWrap><a href="#work" className="btn-fill">View Work</a></MagneticWrap>
            <MagneticWrap><a href="#contact" className="btn-line">Get in Touch</a></MagneticWrap>
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <div style={{
            display: "grid", gridTemplateColumns: sm ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap: 1, background: t.border, maxWidth: lg ? 560 : "100%",
          }}>
            {[[10, "Projects Shipped", "+"], [5, "Years Building", "+"], [3, "Live Products", ""], [100, "Satisfaction", "%"]].map(([n, l, s]) => (
              <div key={l} style={{ background: t.bg, padding: sm ? "16px 14px" : "22px 20px", transition: "background .5s" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: sm ? 24 : 32, color: t.fg, marginBottom: 4, letterSpacing: "-1px" }}>
                  <AnimNum val={n} suffix={s} />
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: t.muted + "60", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{
          position: "absolute", bottom: sm ? 12 : 32, right: px,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: scrollY > 100 ? 0 : 1, transition: "opacity .5s",
        }}>
          <div style={{ width: 1, height: 40, background: t.muted + "30", transformOrigin: "top", animation: "lineGrow 1.5s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: 3, color: t.muted + "40", writingMode: "vertical-rl" }}>SCROLL</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "14px 0" }}>
        <div className="mq-inner">
          {[...Array(10)].map((_, i) => (
            <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: t.muted + "25", marginRight: 48, whiteSpace: "nowrap" }}>
              REACT &mdash; NEXT.JS &mdash; TYPESCRIPT &mdash; VITE &mdash; TAILWIND &mdash; NODE.JS &mdash; SUPABASE &mdash; AI INTEGRATION &mdash; FRAMER MOTION
            </span>
          ))}
        </div>
      </div>

      {/* WORK — Card-based */}
      <section id="work" style={{ padding: `${sm ? 60 : 100}px ${px} ${sm ? 40 : 80}px`, maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SectionLabel num="01" text="Selected Work" t={t} /></Reveal>
        <Reveal delay={0.05}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: sm ? 32 : 56, flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 32 : 52, letterSpacing: "-2px", lineHeight: 1.05, fontWeight: 800, color: t.fg }}>
              Recent<br />Projects<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
            </h2>
            <a href="https://github.com/tegatheprogrammer" target="_blank" rel="noreferrer" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3,
              color: t.muted, borderBottom: `1px solid ${t.border}`, paddingBottom: 2,
              transition: "color .25s, border-color .25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border; }}
            >ALL ON GITHUB</a>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: lg ? "repeat(3,1fr)" : sm ? "1fr" : "repeat(2,1fr)", gap: sm ? 16 : 20 }}>
          {PROJECTS.map((p, idx) => (
            <Reveal key={p.num} delay={idx * 0.1}>
              <a href={p.link} target="_blank" rel="noreferrer" className="proj-card">
                <div style={{ height: sm ? 160 : 200, background: p.gradient, display: "flex", alignItems: "flex-end", padding: sm ? 16 : 24, position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 20% 80%, ${p.color}50, transparent 60%)` }} />
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: sm ? 24 : 32, color: "#fff", letterSpacing: "-1px", position: "relative", zIndex: 1, lineHeight: 1.1 }}>
                    {p.name}
                  </span>
                  <span style={{
                    position: "absolute", top: sm ? 12 : 16, right: sm ? 12 : 16,
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 1.5,
                    color: "#ffffffCC", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                    padding: "4px 10px", zIndex: 1,
                  }}>LIVE</span>
                </div>
                <div style={{ padding: sm ? "18px 16px" : "24px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: t.muted }}>{p.type}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: t.muted, letterSpacing: 1 }}>{p.year}</span>
                      <span style={{ fontSize: 14, color: t.accent }}>&#x2197;</span>
                    </div>
                  </div>
                  <p style={{ fontSize: sm ? 13 : 14, lineHeight: 1.7, color: t.muted, marginBottom: 16 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.stack.map((s) => (
                      <span key={s} style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 1,
                        padding: "4px 10px", border: `1px solid ${t.border}`, color: t.muted + "80",
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: `${sm ? 60 : 100}px ${px}`, borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionLabel num="02" text="About" t={t} /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: lg ? "1.2fr 1fr" : "1fr", gap: lg ? 80 : 40, alignItems: "start" }}>
            <div>
              <Reveal delay={0.05}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 32 : 52, letterSpacing: "-2px", lineHeight: 1.05, fontWeight: 800, color: t.fg, marginBottom: sm ? 24 : 32 }}>
                  Developer, creator,<br />
                  <span style={{ WebkitTextStroke: `1px ${t.fg}60`, color: "transparent" }}>lifelong builder</span>
                  <span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontSize: sm ? 14 : 15, lineHeight: 1.9, color: t.muted, marginBottom: 20 }}>
                  I'm <span style={{ color: t.fg }}>Great Anthony</span> — a frontend developer
                  building products at <span style={{ color: t.fg }}>Pantheon</span>, a venture studio
                  in Abuja, while completing my Computer Science degree at Veritas University.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ fontSize: sm ? 14 : 15, lineHeight: 1.9, color: t.muted + "90" }}>
                  Outside of code I run a cinematic history YouTube channel, trade forex and
                  index markets, and build side projects I wish existed. I take craft
                  seriously — every pixel, every interaction matters.
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal delay={0.1}>
                <div style={{ border: `1px solid ${t.border}` }}>
                  {[["Location", "Abuja, Nigeria"], ["Status", "Open to Work"], ["Stack", "React / Next.js / TS"], ["Education", "CS — Veritas University"], ["Currently", "Pantheon Studio"], ["Remote", "Available Worldwide"]].map(([k, v], i, arr) => (
                    <div key={k} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: sm ? "14px 16px" : "16px 20px",
                      borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none",
                      transition: "background .25s", flexWrap: "wrap", gap: 8,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = t.hover}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: t.muted + "60" }}>{k}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: t.fg }}>{v}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div style={{ marginTop: 16 }}>
                  <MagneticWrap><a href="#contact" className="btn-fill" style={{ width: "100%", justifyContent: "center" }}>Work With Me</a></MagneticWrap>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginTop: sm ? 60 : 100 }}>
            <Reveal>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 26 : 36, letterSpacing: "-1.5px", fontWeight: 800, color: t.fg, marginBottom: sm ? 32 : 48 }}>
                Experience<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
              </h3>
            </Reveal>
            <div style={{ position: "relative", paddingLeft: sm ? 28 : 44 }}>
              <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 1, background: `linear-gradient(to bottom, ${t.accent}, ${t.accent}10)` }} />
              {EXPERIENCE.map((exp, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{ position: "relative", marginBottom: i < EXPERIENCE.length - 1 ? (sm ? 28 : 40) : 0 }}>
                    <div style={{ position: "absolute", left: sm ? -28 : -44, top: 8, width: 10, height: 10, borderRadius: "50%", background: t.accent, border: `3px solid ${t.bg}`, boxShadow: `0 0 0 1px ${t.accent}40` }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: t.accent, display: "block", marginBottom: 6 }}>{exp.year}</span>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 16 : 18, fontWeight: 700, color: t.fg, marginBottom: 4, letterSpacing: "-0.3px" }}>{exp.role}</div>
                    <div style={{ fontSize: 13, color: t.muted }}>{exp.place}</div>
                    <div style={{ fontSize: 12, color: t.muted + "70", marginTop: 2 }}>{exp.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: `${sm ? 60 : 100}px ${px}`, borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionLabel num="03" text="How I Work" t={t} /></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 32 : 52, letterSpacing: "-2px", fontWeight: 800, color: t.fg, marginBottom: sm ? 32 : 56, lineHeight: 1.05 }}>
              My Process<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: lg ? "repeat(4,1fr)" : sm ? "1fr" : "repeat(2,1fr)", gap: sm ? 12 : 1, background: sm ? "transparent" : t.border }}>
            {PROCESS.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.08}>
                <div className="process-step">
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: t.accent, marginBottom: sm ? 12 : 20 }}>{p.num}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 18 : 22, fontWeight: 800, letterSpacing: "-0.5px", color: t.fg, marginBottom: sm ? 8 : 12, lineHeight: 1.2 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: t.muted }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section style={{ padding: `${sm ? 60 : 100}px ${px}`, borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionLabel num="04" text="Tech Stack" t={t} /></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 32 : 52, letterSpacing: "-2px", fontWeight: 800, color: t.fg, marginBottom: sm ? 28 : 48, lineHeight: 1.05 }}>
              My Toolkit<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: sm ? 8 : 10 }}>
            {SKILLS.map((s) => <SkillPill key={s} name={s} t={t} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: `${sm ? 60 : 100}px ${px}`, borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionLabel num="05" text="What I Do" t={t} /></Reveal>
          <Reveal delay={0.05}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: sm ? 32 : 56, flexWrap: "wrap", gap: 16 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 32 : 52, letterSpacing: "-2px", lineHeight: 1.05, fontWeight: 800, color: t.fg }}>
                Services<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
              </h2>
              <p style={{ fontSize: 13, color: t.muted, maxWidth: 300, lineHeight: 1.7 }}>I work with startups, agencies, and ambitious teams worldwide.</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: lg ? "repeat(2,1fr)" : "1fr", gap: sm ? 12 : 1, background: sm ? "transparent" : t.border }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.06}>
                <div className="svc-block">
                  <div className="svc-n" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: t.muted + "30", marginBottom: sm ? 12 : 20, transition: "color .35s" }}>{s.num}</div>
                  <h3 className="svc-t" style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 18 : 24, fontWeight: 800, letterSpacing: "-0.5px", color: t.fg, marginBottom: sm ? 8 : 14, lineHeight: 1.2, transition: "color .35s" }}>{s.title}</h3>
                  <p className="svc-d" style={{ fontSize: 13, lineHeight: 1.75, color: t.muted, transition: "color .35s", maxWidth: 400 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: `${sm ? 60 : 100}px ${px}`, borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionLabel num="06" text="Kind Words" t={t} /></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: sm ? 32 : 52, letterSpacing: "-2px", fontWeight: 800, color: t.fg, marginBottom: sm ? 32 : 56, lineHeight: 1.05 }}>
              What they say<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: lg ? "repeat(3,1fr)" : sm ? "1fr" : "repeat(2,1fr)", gap: sm ? 12 : 16 }}>
            {TESTIMONIALS.map((tm, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="testimonial-card">
                  <div style={{ fontSize: 28, color: t.accent, marginBottom: 16, fontFamily: "Georgia, serif", lineHeight: 1 }}>&ldquo;</div>
                  <p style={{ fontSize: sm ? 13 : 14, lineHeight: 1.75, color: t.muted, marginBottom: 24 }}>{tm.text}</p>
                  <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 16 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: t.fg, marginBottom: 2 }}>{tm.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1.5, color: t.muted }}>{tm.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: `${sm ? 60 : 120}px ${px} ${sm ? 48 : 80}px`, borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><SectionLabel num="07" text="Contact" t={t} /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: lg ? "1.3fr 1fr" : "1fr", gap: lg ? 80 : 40, alignItems: "start" }}>
            <div>
              <Reveal delay={0.05}>
                <h2 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: sm ? "clamp(32px, 10vw, 44px)" : "clamp(48px, 6vw, 72px)",
                  letterSpacing: "-3px", fontWeight: 800, color: t.fg, lineHeight: 1, marginBottom: 24,
                }}>
                  LET'S<br />
                  <span style={{ WebkitTextStroke: `1.5px ${t.fg}60`, color: "transparent" }}>BUILD</span><br />
                  SOMETHING<span style={{ color: isDark ? "#C8FF00" : t.fg }}>.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontSize: sm ? 13 : 14, lineHeight: 1.85, color: t.muted, maxWidth: 380 }}>
                  Available for freelance projects, contracts, and full-time remote roles.
                  International clients welcome — I invoice in USD.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="mailto:agreat496@email.com" style={{ padding: sm ? "18px 16px" : "24px 22px", border: `1px solid ${t.border}`, display: "block", transition: "all .3s", background: t.card }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accent; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3, color: t.muted + "50", marginBottom: 8 }}>EMAIL</div>
                  <div style={{ fontSize: sm ? 14 : 15, fontWeight: 500, color: t.fg }}>agreat496@email.com</div>
                </a>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[["GitHub", "https://github.com/tegatheprogrammer", "tegatheprogrammer"], ["Twitter / X", "https://x.com/tegatheprogrammer", "@tegatheprogrammer"]].map(([label, href, val]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{ padding: sm ? "14px 14px" : "20px 18px", border: `1px solid ${t.border}`, display: "block", transition: "all .3s", background: t.card }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accent; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3, color: t.muted + "50", marginBottom: 8 }}>{label.toUpperCase()}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: t.fg, wordBreak: "break-all" }}>{val}</div>
                    </a>
                  ))}
                </div>
                <MagneticWrap><a href="mailto:agreat496@email.com" className="btn-fill" style={{ width: "100%", justifyContent: "center" }}>Send an Email</a></MagneticWrap>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: `24px ${px}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, color: t.muted + "50" }}>
            GA<span style={{ color: (isDark ? "#C8FF00" : t.fg) + "60" }}>.</span>
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3, color: t.muted + "35" }}>DESIGNED & BUILT BY GREAT ANTHONY</span>
          <div style={{ display: "flex", gap: 24 }}>
            {[["GH", "https://github.com/tegatheprogrammer"], ["TW", "https://x.com/tegatheprogrammer"], ["LI", "https://linkedin.com/in/tegatheprogrammer"]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: t.muted + "40", transition: "color .25s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = t.accent} onMouseLeave={(e) => e.currentTarget.style.color = t.muted + "40"}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {showTop && <button className="btt" onClick={toTop} aria-label="Back to top">&#x2191;</button>}
    </div>
  );
}
