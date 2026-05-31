import { useState, useEffect, useRef } from "react";

// ─── TWO COLORS. NOTHING ELSE. ────────────────────────────────────────────────
const B = "#0B0B0B";   // near-black
const W = "#F4EFE8";   // warm off-white

const PROJECTS = [
  {
    num: "01",
    name: "Issygn Investment",
    type: "Web Application",
    year: "2024",
    stack: ["React", "Vite", "CSS"],
    desc: "Conversion-focused investment platform with intuitive user flows, clean architecture, and fully responsive layout built for real business impact.",
    link: "https://github.com/tegatheprogrammer",
  },
  {
    num: "02",
    name: "Movie Recognition App",
    type: "React Application",
    year: "2024",
    stack: ["React", "JavaScript", "API"],
    desc: "An intelligent movie recognition app powered by third-party APIs. Fast search, clean UI, and smooth interactions from data fetch to render.",
    link: "https://github.com/tegatheprogrammer",
  },
  {
    num: "03",
    name: "Futuristic Portfolio",
    type: "Portfolio Website",
    year: "2024",
    stack: ["React", "CSS Animations", "Vite"],
    desc: "A visually ambitious personal portfolio with custom animations, futuristic design language, and meticulous attention to interaction design.",
    link: "https://anth-ten.vercel.app",
  },
];

const SKILLS = [
  "React", "Next.js", "TypeScript", "Vite",
  "JavaScript", "HTML & CSS", "Tailwind CSS",
  "Supabase", "Firebase", "Framer Motion",
  "Git & GitHub", "REST APIs", "Figma", "Node.js",
];

const SERVICES = [
  {
    n: "01",
    title: "Landing Pages",
    desc: "High-converting, visually stunning pages built to make your product impossible to scroll past. Fast, responsive, pixel-perfect.",
  },
  {
    n: "02",
    title: "Web Applications",
    desc: "Full-featured React apps — authentication, databases, real-time features. Architected to scale, built to ship.",
  },
  {
    n: "03",
    title: "UI/UX Development",
    desc: "From Figma file to flawless implementation. Smooth animations, thoughtful interactions, and interfaces users actually enjoy.",
  },
  {
    n: "04",
    title: "AI Integration",
    desc: "Modern products powered by OpenAI, Claude, and similar APIs. Chatbots, recognition tools, smart features — built right.",
  },
];

// ─── CURSOR ───────────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      if (dot.current) {
        dot.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      if (ring.current) {
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
        ring.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, background: W, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, border: `1px solid ${W}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, mixBlendMode: "difference", opacity: 0.4 }} />
    </>
  );
}

// ─── ANIMATED NUMBER ──────────────────────────────────────────────────────────
function AnimNum({ val }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = () => {
          start += Math.ceil(val / 30);
          if (start >= val) { setDisplay(val); return; }
          setDisplay(start);
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [val]);
  return <span ref={ref}>{display}</span>;
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function Label({ num, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32, paddingBottom: 16, borderBottom: `1px solid ${W}12` }}>
      <span style={{ fontSize: 9, letterSpacing: 4, color: `${W}30`, fontFamily: "inherit" }}>{num}</span>
      <span style={{ fontSize: 9, letterSpacing: 5, color: `${W}35`, textTransform: "uppercase", fontFamily: "inherit" }}>{text}</span>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: B, color: W, fontFamily: "'DM Mono', 'Courier New', monospace", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { cursor: none; }
        * { cursor: none !important; }
        ::selection { background: ${W}; color: ${B}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${B}; }
        ::-webkit-scrollbar-thumb { background: ${W}20; }
        a { text-decoration: none; color: inherit; }

        /* HOVER INVERT */
        .inv { transition: background 0.18s, color 0.18s; }
        .inv:hover { background: ${W} !important; color: ${B} !important; }
        .inv:hover * { color: ${B} !important; border-color: ${B}40 !important; }

        /* PROJECT ROW */
        .proj { border-bottom: 1px solid ${W}08; transition: background 0.18s; }
        .proj:hover { background: ${W}; }
        .proj:hover * { color: ${B} !important; border-color: ${B}25 !important; }

        /* SKILL PILL */
        .pill { border: 1px solid ${W}15; padding: 9px 16px; font-size: 9px; letter-spacing: 2.5px;
                color: ${W}50; transition: all 0.15s; display: inline-block; }
        .pill:hover { background: ${W}; color: ${B} !important; border-color: ${W}; }

        /* CTA BUTTON */
        .btn-solid { background: ${W}; color: ${B}; padding: 15px 32px; font-size: 10px;
                     letter-spacing: 3px; border: 1px solid ${W}; display: inline-block;
                     transition: background 0.18s, color 0.18s; font-family: inherit; }
        .btn-solid:hover { background: transparent; color: ${W}; }
        .btn-ghost { background: transparent; color: ${W}60; padding: 15px 32px; font-size: 10px;
                     letter-spacing: 3px; border: 1px solid ${W}15; display: inline-block;
                     transition: all 0.18s; font-family: inherit; }
        .btn-ghost:hover { border-color: ${W}; color: ${W}; }

        /* NAV LINK */
        .nav-a { font-size: 9px; letter-spacing: 4px; color: ${W}50; transition: color 0.15s; }
        .nav-a:hover { color: ${W}; }

        /* MARQUEE */
        @keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .mq-inner { display: flex; width: max-content; animation: mq 22s linear infinite; }

        /* FADE IN UP */
        @keyframes fiu { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-line { animation: fiu 0.8s cubic-bezier(.16,1,.3,1) both; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.25s; }
        .d3 { animation-delay: 0.4s; }
        .d4 { animation-delay: 0.55s; }
        .d5 { animation-delay: 0.7s; }

        /* BLINK */
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .blink { animation: blink 1.1s step-end infinite; }

        /* NOISE OVERLAY */
        .noise::after {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9990; opacity: 0.5;
        }

        /* GRID LINE */
        .vline { position: fixed; top: 0; bottom: 0; width: 1px; background: ${W}04; pointer-events: none; z-index: 1; }
      `}</style>

      <Cursor />

      {/* Subtle vertical grid lines */}
      <div className="vline" style={{ left: "24px" }} />
      <div className="vline" style={{ right: "24px" }} />
      <div className="vline" style={{ left: "50%" }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        padding: "0 24px", height: 58,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? `${B}EE` : "transparent",
        borderBottom: scrolled ? `1px solid ${W}08` : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "all 0.3s",
      }}>
        <a href="#" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: 1 }}>
          GA<span className="blink" style={{ color: `${W}50` }}>_</span>
        </a>
        <div style={{ display: "flex", gap: 28 }}>
          {[["#work", "Work"], ["#about", "About"], ["#contact", "Contact"]].map(([h, l]) => (
            <a key={l} href={h} className="nav-a">{l}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", padding: "0 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 64, position: "relative" }}>
        {/* Top right tag */}
        <div style={{ position: "absolute", top: 80, right: 24, writingMode: "vertical-rl", fontSize: 9, letterSpacing: 4, color: `${W}20` }} className="hero-line d1">
          FRONTEND DEV — 2026
        </div>

        <div className="hero-line d1" style={{ fontSize: 9, letterSpacing: 6, color: `${W}30`, marginBottom: 24 }}>
          BASED IN ABUJA, NIGERIA
        </div>

        <h1 className="hero-line d2" style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(56px, 15vw, 140px)",
          lineHeight: 0.88,
          letterSpacing: "-4px",
          marginBottom: 40,
        }}>
          GREAT<br />
          <span style={{ WebkitTextStroke: `1px ${W}`, color: "transparent" }}>ANTHONY</span>
          <span style={{ color: `${W}` }}>.</span>
        </h1>

        <p className="hero-line d3" style={{ fontSize: 13, lineHeight: 1.9, color: `${W}55`, maxWidth: 440, marginBottom: 40 }}>
          I build fast, beautiful web experiences for startups and growing businesses.
          React specialist. CS student. I ship things that matter.
        </p>

        <div className="hero-line d4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 60 }}>
          <a href="#work" className="btn-solid">VIEW WORK</a>
          <a href="#contact" className="btn-ghost">GET IN TOUCH</a>
        </div>

        {/* Stats bar */}
        <div className="hero-line d5" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: `${W}08`,
          borderTop: `1px solid ${W}08`,
          paddingTop: 1,
          maxWidth: 480,
        }}>
          {[[3, "Projects Shipped"], [2, "Years Building"], [1, "Venture Studio"]].map(([n, l]) => (
            <div key={l} style={{ background: B, padding: "18px 16px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: -1, marginBottom: 4 }}>
                <AnimNum val={n} />+
              </div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: `${W}35` }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 28, right: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 1, height: 40, background: `${W}20` }} />
          <div style={{ fontSize: 8, letterSpacing: 4, color: `${W}25`, writingMode: "vertical-rl" }}>SCROLL</div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ overflow: "hidden", borderTop: `1px solid ${W}08`, borderBottom: `1px solid ${W}08`, padding: "14px 0" }}>
        <div className="mq-inner">
          {[...Array(8)].map((_, i) => (
            <span key={i} style={{ fontSize: 9, letterSpacing: 5, color: `${W}18`, marginRight: 48, whiteSpace: "nowrap" }}>
              REACT — NEXT.JS — TYPESCRIPT — VITE — TAILWIND — SUPABASE — FRAMER MOTION — AI INTEGRATION
            </span>
          ))}
        </div>
      </div>

      {/* ── WORK ── */}
      <section id="work" style={{ padding: "80px 24px 0" }}>
        <Label num="01 ——" text="Selected Work" />

        <div style={{ marginBottom: 8 }}>
          {PROJECTS.map((p) => (
            <a key={p.num} href={p.link} target="_blank" rel="noreferrer" className="proj"
              style={{ display: "grid", gridTemplateColumns: "36px 1fr auto", gap: 20, padding: "28px 12px", alignItems: "start" }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: `${W}25`, paddingTop: 3 }}>{p.num}</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: -0.5, marginBottom: 8, lineHeight: 1 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 11, lineHeight: 1.8, color: `${W}55`, marginBottom: 12, maxWidth: 520 }}>{p.desc}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.stack.map((s) => (
                    <span key={s} style={{ fontSize: 8, letterSpacing: 2, border: `1px solid ${W}15`, padding: "3px 10px", color: `${W}40` }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right", paddingTop: 3 }}>
                <div style={{ fontSize: 9, color: `${W}25`, letterSpacing: 2, marginBottom: 6 }}>{p.year}</div>
                <div style={{ fontSize: 9, color: `${W}35`, letterSpacing: 1 }}>{p.type}</div>
                <div style={{ fontSize: 16, color: `${W}25`, marginTop: 12 }}>↗</div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ padding: "32px 12px" }}>
          <a href="https://github.com/tegatheprogrammer" target="_blank" rel="noreferrer"
            style={{ fontSize: 9, letterSpacing: 4, color: `${W}35`, borderBottom: `1px solid ${W}20`, paddingBottom: 2 }}
            className="nav-a">
            SEE ALL WORK ON GITHUB →
          </a>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "80px 24px 0" }}>
        <Label num="02 ——" text="About Me" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48 }}>
          <div>
            <p style={{ fontSize: 15, lineHeight: 2.1, color: `${W}70`, maxWidth: 600, marginBottom: 24 }}>
              I'm <span style={{ color: W }}>Great Anthony</span> — a frontend developer building at{" "}
              <span style={{ color: W }}>Pantheon</span>, a venture studio in Abuja, while finishing my
              Computer Science degree at Veritas University.
            </p>
            <p style={{ fontSize: 15, lineHeight: 2.1, color: `${W}55`, maxWidth: 600 }}>
              Outside of code I run a{" "}
              <span style={{ color: W }}>cinematic history YouTube channel</span>, trade forex
              and index markets, and build side products I wish existed. I take craft seriously.
            </p>
          </div>

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: `${W}08`, border: `1px solid ${W}08` }}>
            {[
              ["Location", "Abuja, Nigeria"],
              ["Status", "Open to Work"],
              ["Speciality", "React / Next.js"],
              ["Education", "Veritas University"],
              ["Currently", "Pantheon Studio"],
              ["Also", "Trader & Creator"],
            ].map(([k, v]) => (
              <div key={k} className="inv" style={{ background: B, padding: "20px 18px" }}>
                <div style={{ fontSize: 8, letterSpacing: 4, color: `${W}30`, marginBottom: 8 }}>{k}</div>
                <div style={{ fontSize: 11, letterSpacing: 1.5 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section style={{ padding: "80px 24px 0" }}>
        <Label num="03 ——" text="Tech Stack" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SKILLS.map((s) => <span key={s} className="pill">{s}</span>)}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: "80px 24px 0" }}>
        <Label num="04 ——" text="Services" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 1, background: `${W}08` }}>
          {SERVICES.map((s) => (
            <div key={s.n} className="inv" style={{ background: B, padding: "28px 24px", display: "flex", gap: 24, alignItems: "flex-start" }}>
              <div style={{ fontSize: 9, color: `${W}20`, letterSpacing: 3, paddingTop: 3, flexShrink: 0 }}>{s.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: -0.3, marginBottom: 10 }}>{s.title}</div>
                <div style={{ fontSize: 12, lineHeight: 1.85, color: `${W}55`, maxWidth: 420 }}>{s.desc}</div>
              </div>
              <div style={{ fontSize: 20, color: `${W}15`, alignSelf: "center", flexShrink: 0 }}>→</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 24px 120px" }}>
        <Label num="05 ——" text="Let's Work" />

        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(42px, 12vw, 100px)",
          lineHeight: 0.9,
          letterSpacing: "-3px",
          marginBottom: 40,
        }}>
          LET'S<br />
          <span style={{ WebkitTextStroke: `1px ${W}60`, color: "transparent" }}>BUILD</span><br />
          SOMETHING.
        </h2>

        <p style={{ fontSize: 13, lineHeight: 1.9, color: `${W}50`, maxWidth: 380, marginBottom: 48 }}>
          Available for freelance projects, contracts, and full-time remote roles.
          International clients welcome — I invoice in USD.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 64 }}>
          <a href="mailto:greatanthony@email.com" className="btn-solid" style={{ width: "fit-content" }}>
            SEND AN EMAIL →
          </a>
          <a href="https://github.com/tegatheprogrammer" target="_blank" rel="noreferrer" className="btn-ghost" style={{ width: "fit-content" }}>
            GITHUB PROFILE →
          </a>
          <a href="https://anth-ten.vercel.app" target="_blank" rel="noreferrer" className="btn-ghost" style={{ width: "fit-content" }}>
            LIVE PORTFOLIO →
          </a>
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${W}08`, paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 2 }}>GA.</div>
          <div style={{ fontSize: 9, letterSpacing: 4, color: `${W}25` }}>
            ABUJA — NIGERIA — 2026
          </div>
          <div style={{ fontSize: 9, letterSpacing: 3, color: `${W}20` }}>
            DESIGNED & BUILT BY GREAT ANTHONY
          </div>
        </div>
      </section>
    </div>
  );
}
