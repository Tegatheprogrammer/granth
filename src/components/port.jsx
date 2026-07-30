import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  bg: "#0A0A0A",
  fg: "#F0EDE8",
  muted: "#7A7772",
  accent: "#C8FF00",
  border: "#1E1E1E",
  card: "#121212",
  hover: "#181818",
};

const NAV = ["Work", "About", "Services", "Contact"];

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
  },
  {
    num: "02",
    name: "Cinee",
    type: "Streaming Platform",
    year: "2025",
    stack: ["React", "Vite", "TMDB API", "CSS"],
    desc: "A cinematic movie discovery platform with real-time search, curated collections, detailed film information, and a buttery-smooth browsing experience.",
    link: "https://cinee-sand.vercel.app",
    color: "#EF4444",
  },
  {
    num: "03",
    name: "KWASU Food",
    type: "Food Delivery App",
    year: "2025",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    desc: "Full-stack campus food ordering platform connecting students with local vendors. Real-time tracking, vendor dashboards, and seamless payments.",
    link: "https://kwasu-food.onrender.com",
    color: "#22C55E",
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

const EXPERIENCE = [
  { year: "2025", role: "Frontend Developer", place: "Pantheon Studio", desc: "Building products at a venture studio in Abuja" },
  { year: "2024", role: "Freelance Developer", place: "Independent", desc: "Shipped projects for startups and growing businesses" },
  { year: "2023", role: "CS Student", place: "Veritas University", desc: "Studying Computer Science, building side projects" },
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

function useReveal(threshold = 0.15) {
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
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.9s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.9s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SplitText({ text, delay = 0, as: Tag = "span", style = {} }) {
  const [ref, vis] = useReveal(0.3);
  return (
    <Tag ref={ref} style={{ ...style, display: "inline-block", overflow: "hidden" }}>
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
    </Tag>
  );
}

function MagneticWrap({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength]);
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

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      if (dot.current) {
        dot.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      if (ring.current) {
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.08;
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.08;
        ring.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, background: C.accent, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, border: `1.5px solid ${C.accent}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, mixBlendMode: "difference", opacity: 0.35 }} />
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
      const step = () => {
        n += Math.ceil(val / 30);
        if (n >= val) { setDisplay(val); return; }
        setDisplay(n);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [vis, val]);
  return <span ref={ref}>{display}{suffix}</span>;
}

function SkillPill({ name }) {
  const [ref, vis] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <span ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block", padding: "10px 20px",
        border: `1px solid ${hovered ? C.accent : C.border}`,
        fontSize: 12, letterSpacing: 1.5, fontFamily: "'JetBrains Mono', monospace",
        color: hovered ? C.bg : C.muted,
        background: hovered ? C.accent : "transparent",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
        cursor: "default",
      }}>
      {name}
    </span>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const w = useWidth();
  const sm = w < 640;
  const md = w >= 640 && w < 1024;
  const lg = w >= 1024;
  const px = sm ? "20px" : md ? "48px" : "72px";

  useEffect(() => { setTimeout(() => setLoaded(true), 1400); }, []);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 600);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toTop = useCallback(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  // Preloader
  if (!loaded) {
    return (
      <div style={{
        position: "fixed", inset: 0, background: C.bg, display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 9999,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: sm ? 44 : 64,
            color: C.fg, letterSpacing: "-3px", lineHeight: 1,
          }}>
            GA<span style={{ color: C.accent }}>.</span>
          </div>
          <div style={{
            marginTop: 28, width: 48, height: 2, background: C.border,
            borderRadius: 1, overflow: "hidden", margin: "28px auto 0",
          }}>
            <div style={{
              width: "40%", height: "100%", background: C.accent, borderRadius: 1,
              animation: "loadSlide 1s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: C.bg, color: C.fg,
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { cursor: none; }
        * { cursor: none !important; }
        ::selection { background: ${C.accent}; color: ${C.bg}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.accent}30; border-radius: 3px; }
        a { color: inherit; text-decoration: none; }

        @keyframes loadSlide { 0%{transform:translateX(-120%)} 50%{transform:translateX(180%)} 100%{transform:translateX(-120%)} }
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes lineGrow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        @keyframes menuSlide { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

        /* Noise overlay */
        .noise::before {
          content:''; position:fixed; inset:0; z-index:9990; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity:0.6;
        }

        /* Grid lines */
        .grid-line { position:fixed; top:0; bottom:0; width:1px; background:${C.fg}03; pointer-events:none; z-index:1; }

        /* Nav link */
        .nav-a { font-size:13px; letter-spacing:1.5px; color:${C.muted}; transition:color .25s; position:relative; text-transform:uppercase; }
        .nav-a:hover { color:${C.fg}; }
        .nav-a::after { content:''; position:absolute; bottom:-6px; left:0; width:0; height:1px; background:${C.accent}; transition:width .3s cubic-bezier(.22,1,.36,1); }
        .nav-a:hover::after { width:100%; }

        /* Buttons */
        .btn-fill {
          display:inline-flex; align-items:center; gap:10px;
          background:${C.accent}; color:${C.bg};
          padding:16px 32px; font-family:'JetBrains Mono',monospace;
          font-size:11px; font-weight:500; letter-spacing:2px;
          border:none; text-transform:uppercase;
          transition:all .3s cubic-bezier(.22,1,.36,1);
        }
        .btn-fill:hover { background:${C.fg}; letter-spacing:3px; }

        .btn-line {
          display:inline-flex; align-items:center; gap:10px;
          background:transparent; color:${C.fg};
          padding:16px 32px; font-family:'JetBrains Mono',monospace;
          font-size:11px; font-weight:500; letter-spacing:2px;
          border:1px solid ${C.border}; text-transform:uppercase;
          transition:all .3s cubic-bezier(.22,1,.36,1);
        }
        .btn-line:hover { border-color:${C.accent}; color:${C.accent}; letter-spacing:3px; }

        /* Project row */
        .proj-row {
          display:grid; grid-template-columns:60px 1fr auto; gap:24px;
          padding:36px 0; border-bottom:1px solid ${C.border};
          align-items:start; transition:all .35s cubic-bezier(.22,1,.36,1);
          position:relative;
        }
        .proj-row::before {
          content:''; position:absolute; inset:-1px -32px; background:${C.accent};
          opacity:0; transition:opacity .35s; z-index:-1;
        }
        .proj-row:hover::before { opacity:1; }
        .proj-row:hover { padding-left:16px; padding-right:16px; }
        .proj-row:hover * { color:${C.bg} !important; }
        .proj-row:hover .proj-tag { border-color:${C.bg}30 !important; }

        /* Service block */
        .svc-block {
          padding:40px 32px; border:1px solid ${C.border};
          transition:all .35s cubic-bezier(.22,1,.36,1);
          position:relative; overflow:hidden;
        }
        .svc-block::before {
          content:''; position:absolute; bottom:0; left:0; right:0; height:0;
          background:${C.accent}; transition:height .4s cubic-bezier(.22,1,.36,1); z-index:0;
        }
        .svc-block:hover::before { height:100%; }
        .svc-block:hover { border-color:${C.accent}; }
        .svc-block:hover .svc-n, .svc-block:hover .svc-t, .svc-block:hover .svc-d { color:${C.bg} !important; position:relative; z-index:1; }

        /* Mobile menu */
        .mob-menu {
          position:fixed; inset:0; background:${C.bg}; z-index:500;
          display:flex; flex-direction:column; padding:0 20px 40px;
          opacity:0; pointer-events:none; transition:opacity .3s;
        }
        .mob-menu.open { opacity:1; pointer-events:all; }

        /* Marquee */
        .mq-inner { display:flex; width:max-content; animation:mq 35s linear infinite; }

        /* Back to top */
        .btt {
          position:fixed; bottom:32px; right:32px; z-index:200;
          width:48px; height:48px; background:transparent;
          border:1px solid ${C.border}; color:${C.fg};
          display:flex; align-items:center; justify-content:center;
          font-size:16px; transition:all .3s; cursor:pointer !important;
        }
        .btt:hover { background:${C.accent}; border-color:${C.accent}; color:${C.bg}; }
      `}</style>

      <div className="noise" />
      {lg && <>
        <div className="grid-line" style={{ left: "72px" }} />
        <div className="grid-line" style={{ right: "72px" }} />
        <div className="grid-line" style={{ left: "50%" }} />
      </>}

      <Cursor />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${px}`, height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? `${C.bg}EE` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all .4s",
      }}>
        <MagneticWrap>
          <a href="#" style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20,
            letterSpacing: "-0.5px",
          }}>
            GA<span style={{ color: C.accent }}>.</span>
          </a>
        </MagneticWrap>

        {!sm ? (
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {NAV.map((l) => (
              <MagneticWrap key={l} strength={0.15}>
                <a href={`#${l.toLowerCase()}`} className="nav-a">{l}</a>
              </MagneticWrap>
            ))}
            <MagneticWrap>
              <a href="#contact" className="btn-fill" style={{ padding: "12px 24px", fontSize: 10 }}>
                Let's Talk
              </a>
            </MagneticWrap>
          </div>
        ) : (
          <button onClick={() => setMenuOpen((v) => !v)} style={{
            background: "none", border: "none", padding: 6,
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", height: 1.5, background: C.fg, borderRadius: 1,
                width: i === 1 ? 16 : 24,
                marginLeft: i === 1 ? "auto" : 0,
                transition: "all .3s",
                transform: menuOpen
                  ? (i === 0 ? "rotate(45deg) translate(4px, 5px)" : i === 2 ? "rotate(-45deg) translate(4px, -5px)" : "scaleX(0)")
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20 }}>
            GA<span style={{ color: C.accent }}>.</span>
          </span>
          <button onClick={() => setMenuOpen(false)} style={{
            background: "none", border: "none", color: C.fg, fontSize: 28, lineHeight: 1,
          }}>
            +
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
          {NAV.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 12vw, 56px)",
              fontWeight: 800, color: C.fg, padding: "12px 0",
              borderBottom: `1px solid ${C.border}`, lineHeight: 1.1,
              letterSpacing: "-2px",
              animation: menuOpen ? `menuSlide 0.4s ${i * 0.07}s both` : "none",
            }}>
              {l}<span style={{ color: C.accent }}>.</span>
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
        paddingBottom: sm ? 60 : 80, position: "relative",
      }}>
        {/* Vertical text */}
        {lg && (
          <Reveal delay={0.6} style={{
            position: "absolute", top: 100, right: 72,
            writingMode: "vertical-rl", fontSize: 10, letterSpacing: 4,
            fontFamily: "'JetBrains Mono', monospace", color: C.muted + "40",
          }}>
            FRONTEND DEV / 2025
          </Reveal>
        )}

        <Reveal delay={0}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: C.accent, animation: "pulse 2.5s ease infinite",
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.muted,
            }}>
              OPEN TO OPPORTUNITIES
            </span>
          </div>
        </Reveal>

        <div style={{ marginBottom: 36 }}>
          <SplitText text="GREAT" delay={0.1} style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: `clamp(52px, 14vw, 140px)`, lineHeight: 0.9,
            letterSpacing: "-4px", display: "block", color: C.fg,
          }} />
          <SplitText text="ANTHONY." delay={0.3} style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: `clamp(52px, 14vw, 140px)`, lineHeight: 0.9,
            letterSpacing: "-4px", display: "block",
            WebkitTextStroke: `1.5px ${C.fg}`, color: "transparent",
          }} />
        </div>

        <Reveal delay={0.5}>
          <p style={{
            fontSize: sm ? 14 : 16, lineHeight: 1.85, color: C.muted,
            maxWidth: 480, marginBottom: 40,
          }}>
            Frontend developer based in Abuja, Nigeria. I craft fast, beautiful
            digital experiences with React and Next.js — obsessed with the details
            that make products feel alive.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: sm ? 48 : 72 }}>
            <MagneticWrap><a href="#work" className="btn-fill">View Work</a></MagneticWrap>
            <MagneticWrap><a href="#contact" className="btn-line">Get in Touch</a></MagneticWrap>
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <div style={{
            display: "grid", gridTemplateColumns: sm ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap: 1, background: C.border, maxWidth: lg ? 560 : "100%",
          }}>
            {[
              [10, "Projects Shipped", "+"],
              [5, "Years Building", "+"],
              [3, "Live Products", ""],
              [100, "Client Satisfaction", "%"],
            ].map(([n, l, s]) => (
              <div key={l} style={{ background: C.bg, padding: sm ? "18px 14px" : "22px 20px" }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: sm ? 26 : 32,
                  color: C.fg, marginBottom: 6, letterSpacing: "-1px",
                }}>
                  <AnimNum val={n} suffix={s} />
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  letterSpacing: 2.5, color: C.muted + "60", textTransform: "uppercase",
                }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: sm ? 16 : 32, right: px,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          opacity: scrollY > 100 ? 0 : 1, transition: "opacity .5s",
        }}>
          <div style={{
            width: 1, height: 48, background: C.muted + "30",
            transformOrigin: "top", animation: "lineGrow 1.5s ease-in-out infinite",
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: 3,
            color: C.muted + "40", writingMode: "vertical-rl",
          }}>
            SCROLL
          </span>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{
        overflow: "hidden", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
        padding: "16px 0",
      }}>
        <div className="mq-inner">
          {[...Array(10)].map((_, i) => (
            <span key={i} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4,
              color: C.muted + "25", marginRight: 56, whiteSpace: "nowrap",
            }}>
              REACT &mdash; NEXT.JS &mdash; TYPESCRIPT &mdash; VITE &mdash; TAILWIND &mdash; NODE.JS &mdash; SUPABASE &mdash; AI INTEGRATION &mdash; FRAMER MOTION
            </span>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section id="work" style={{ padding: `100px ${px} 80px`, maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.accent,
            }}>
              01
            </span>
            <div style={{ width: 32, height: 1, background: C.accent }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase",
            }}>
              Selected Work
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: 56, flexWrap: "wrap", gap: 16,
          }}>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontSize: sm ? 36 : 52,
              letterSpacing: "-2px", lineHeight: 1.05, fontWeight: 800, color: C.fg,
            }}>
              Recent<br />Projects<span style={{ color: C.accent }}>.</span>
            </h2>
            <a href="https://github.com/tegatheprogrammer" target="_blank" rel="noreferrer" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3,
              color: C.muted, borderBottom: `1px solid ${C.border}`, paddingBottom: 2,
              transition: "color .25s, border-color .25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.accent; e.currentTarget.style.borderColor = C.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}
            >
              ALL ON GITHUB
            </a>
          </div>
        </Reveal>

        <div>
          {PROJECTS.map((p, idx) => (
            <Reveal key={p.num} delay={idx * 0.08}>
              <a href={p.link} target="_blank" rel="noreferrer" className="proj-row">
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3,
                  color: C.muted + "40", paddingTop: 6, transition: "color .35s",
                }}>
                  {p.num}
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: sm ? 22 : 28,
                    letterSpacing: "-0.5px", marginBottom: 10, lineHeight: 1.1,
                    transition: "color .35s",
                  }}>
                    {p.name}
                  </div>
                  <p style={{
                    fontSize: 13, lineHeight: 1.75, color: C.muted, marginBottom: 16,
                    maxWidth: 560, transition: "color .35s",
                  }}>
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.stack.map((s) => (
                      <span key={s} className="proj-tag" style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 1.5,
                        padding: "4px 12px", border: `1px solid ${C.border}`,
                        color: C.muted + "80", transition: "all .35s",
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right", paddingTop: 6 }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted + "50",
                    letterSpacing: 2, marginBottom: 8, transition: "color .35s",
                  }}>
                    {p.year}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.muted + "40",
                    letterSpacing: 1, marginBottom: 16, transition: "color .35s",
                  }}>
                    {p.type}
                  </div>
                  <div style={{
                    fontSize: 20, color: C.muted + "30", transition: "color .35s",
                  }}>
                    &#x2197;
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: `100px ${px}`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.accent }}>02</span>
              <div style={{ width: 32, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>About</span>
            </div>
          </Reveal>

          <div style={{
            display: "grid", gridTemplateColumns: lg ? "1.2fr 1fr" : "1fr",
            gap: lg ? 80 : 48, alignItems: "start",
          }}>
            <div>
              <Reveal delay={0.05}>
                <h2 style={{
                  fontFamily: "'Syne', sans-serif", fontSize: sm ? 36 : 52,
                  letterSpacing: "-2px", lineHeight: 1.05, fontWeight: 800,
                  color: C.fg, marginBottom: 32,
                }}>
                  Developer, creator,<br />
                  <span style={{ WebkitTextStroke: `1px ${C.fg}60`, color: "transparent" }}>
                    lifelong builder
                  </span><span style={{ color: C.accent }}>.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p style={{ fontSize: sm ? 14 : 15, lineHeight: 1.9, color: C.muted, marginBottom: 20 }}>
                  I'm <span style={{ color: C.fg }}>Great Anthony</span> — a frontend developer
                  building products at <span style={{ color: C.fg }}>Pantheon</span>, a venture studio
                  in Abuja, while completing my Computer Science degree at Veritas University.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ fontSize: sm ? 14 : 15, lineHeight: 1.9, color: C.muted + "90" }}>
                  Outside of code I run a cinematic history YouTube channel, trade forex and
                  index markets, and build side projects I wish existed. I take craft
                  seriously — every pixel, every interaction, every millisecond matters.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.1}>
                <div style={{ border: `1px solid ${C.border}` }}>
                  {[
                    ["Location", "Abuja, Nigeria"],
                    ["Status", "Open to Work"],
                    ["Stack", "React / Next.js / TS"],
                    ["Education", "CS — Veritas University"],
                    ["Currently", "Pantheon Studio"],
                    ["Remote", "Available Worldwide"],
                  ].map(([k, v], i, arr) => (
                    <div key={k} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "16px 20px",
                      borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                      transition: "background .25s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = C.hover}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        letterSpacing: 2.5, color: C.muted + "60",
                      }}>{k}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div style={{ marginTop: 16 }}>
                  <MagneticWrap>
                    <a href="#contact" className="btn-fill" style={{ width: "100%", justifyContent: "center" }}>
                      Work With Me
                    </a>
                  </MagneticWrap>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginTop: 100 }}>
            <Reveal>
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontSize: sm ? 28 : 36,
                letterSpacing: "-1.5px", fontWeight: 800, color: C.fg, marginBottom: 48,
              }}>
                Experience<span style={{ color: C.accent }}>.</span>
              </h3>
            </Reveal>

            <div style={{ position: "relative", paddingLeft: sm ? 28 : 44 }}>
              <div style={{
                position: "absolute", left: 5, top: 8, bottom: 8,
                width: 1, background: `linear-gradient(to bottom, ${C.accent}, ${C.accent}10)`,
              }} />

              {EXPERIENCE.map((exp, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{ position: "relative", marginBottom: i < EXPERIENCE.length - 1 ? 40 : 0 }}>
                    <div style={{
                      position: "absolute", left: sm ? -28 : -44, top: 8,
                      width: 10, height: 10, borderRadius: "50%",
                      background: C.accent, border: `3px solid ${C.bg}`,
                      boxShadow: `0 0 0 1px ${C.accent}40`,
                    }} />
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                      letterSpacing: 2, color: C.accent, display: "block", marginBottom: 8,
                    }}>
                      {exp.year}
                    </span>
                    <div style={{
                      fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700,
                      color: C.fg, marginBottom: 4, letterSpacing: "-0.3px",
                    }}>
                      {exp.role}
                    </div>
                    <div style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>{exp.place}</div>
                    <div style={{ fontSize: 12, color: C.muted + "70" }}>{exp.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section style={{ padding: `100px ${px}`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.accent }}>03</span>
              <div style={{ width: 32, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>Tech Stack</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontSize: sm ? 36 : 52,
              letterSpacing: "-2px", fontWeight: 800, color: C.fg, marginBottom: 48, lineHeight: 1.05,
            }}>
              My Toolkit<span style={{ color: C.accent }}>.</span>
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SKILLS.map((s) => (
              <SkillPill key={s} name={s} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: `100px ${px}`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.accent }}>04</span>
              <div style={{ width: 32, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>What I Do</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              marginBottom: 56, flexWrap: "wrap", gap: 16,
            }}>
              <h2 style={{
                fontFamily: "'Syne', sans-serif", fontSize: sm ? 36 : 52,
                letterSpacing: "-2px", lineHeight: 1.05, fontWeight: 800, color: C.fg,
              }}>
                Services<span style={{ color: C.accent }}>.</span>
              </h2>
              <p style={{ fontSize: 13, color: C.muted, maxWidth: 300, lineHeight: 1.7 }}>
                I work with startups, agencies, and ambitious teams worldwide.
              </p>
            </div>
          </Reveal>

          <div style={{
            display: "grid", gridTemplateColumns: lg ? "repeat(2,1fr)" : "1fr",
            gap: 1, background: C.border,
          }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.06}>
                <div className="svc-block" style={{ background: C.bg }}>
                  <div className="svc-n" style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    letterSpacing: 3, color: C.muted + "30", marginBottom: 20,
                    transition: "color .35s",
                  }}>
                    {s.num}
                  </div>
                  <h3 className="svc-t" style={{
                    fontFamily: "'Syne', sans-serif", fontSize: sm ? 20 : 24,
                    fontWeight: 800, letterSpacing: "-0.5px", color: C.fg,
                    marginBottom: 14, lineHeight: 1.2, transition: "color .35s",
                  }}>
                    {s.title}
                  </h3>
                  <p className="svc-d" style={{
                    fontSize: 13, lineHeight: 1.75, color: C.muted, transition: "color .35s", maxWidth: 400,
                  }}>
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: `120px ${px} 80px`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.accent }}>05</span>
              <div style={{ width: 32, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>Contact</span>
            </div>
          </Reveal>

          <div style={{
            display: "grid", gridTemplateColumns: lg ? "1.3fr 1fr" : "1fr",
            gap: lg ? 80 : 48, alignItems: "start",
          }}>
            <div>
              <Reveal delay={0.05}>
                <h2 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: sm ? "clamp(36px, 10vw, 48px)" : "clamp(48px, 6vw, 72px)",
                  letterSpacing: "-3px", fontWeight: 800, color: C.fg,
                  lineHeight: 1, marginBottom: 28,
                }}>
                  LET'S<br />
                  <span style={{ WebkitTextStroke: `1.5px ${C.fg}60`, color: "transparent" }}>BUILD</span><br />
                  SOMETHING<span style={{ color: C.accent }}>.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{
                  fontSize: sm ? 13 : 14, lineHeight: 1.85, color: C.muted, maxWidth: 380,
                }}>
                  Available for freelance projects, contracts, and full-time remote roles.
                  International clients welcome — I invoice in USD.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="mailto:agreat496@email.com" style={{
                  padding: "24px 22px", border: `1px solid ${C.border}`, display: "block",
                  transition: "all .3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.hover; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                    letterSpacing: 3, color: C.muted + "50", marginBottom: 10,
                  }}>EMAIL</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: C.fg }}>agreat496@email.com</div>
                </a>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    ["GitHub", "https://github.com/tegatheprogrammer", "tegatheprogrammer"],
                    ["Twitter / X", "https://x.com/tegatheprogrammer", "@tegatheprogrammer"],
                  ].map(([label, href, val]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                      padding: "20px 18px", border: `1px solid ${C.border}`, display: "block",
                      transition: "all .3s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.hover; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "transparent"; }}
                    >
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                        letterSpacing: 3, color: C.muted + "50", marginBottom: 10,
                      }}>{label.toUpperCase()}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: C.fg, wordBreak: "break-all" }}>{val}</div>
                    </a>
                  ))}
                </div>

                <MagneticWrap>
                  <a href="mailto:agreat496@email.com" className="btn-fill" style={{ width: "100%", justifyContent: "center" }}>
                    Send an Email
                  </a>
                </MagneticWrap>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${C.border}`, padding: `28px ${px}`,
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16,
        }}>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, color: C.muted + "50",
          }}>
            GA<span style={{ color: C.accent + "60" }}>.</span>
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 3, color: C.muted + "35",
          }}>
            DESIGNED & BUILT BY GREAT ANTHONY
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              ["GH", "https://github.com/tegatheprogrammer"],
              ["TW", "https://x.com/tegatheprogrammer"],
              ["LI", "https://linkedin.com/in/tegatheprogrammer"],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                letterSpacing: 2, color: C.muted + "40", transition: "color .25s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.accent}
              onMouseLeave={(e) => e.currentTarget.style.color = C.muted + "40"}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button className="btt" onClick={toTop} aria-label="Back to top">
          &#x2191;
        </button>
      )}
    </div>
  );
}
