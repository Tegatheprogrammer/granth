import { useState, useEffect } from "react";

const INK = "#0D0D0D";
const PAPER = "#F7F4EF";

const NAV_LINKS = ["Work", "About", "Services", "Contact"];

const PROJECTS = [
  {
    num: "01",
    name: "Xlar AI",
    type: "Typescript Application",
    year: "2024",
    stack: ["Typescript", "JavaScript", "REST API", "Node"],
    desc: "This website offers a text summarization tool that supports a wide range of content types, including PDFs (both text and scanned), Word documents, plain text and Markdown files, images (with OCR), and web articles. It automatically processes scanned documents and images using OCR to extract text for summarization..",
    link: "https://xlar.vercel.app",
  },
  {
    num: "02",
    name: "Issygn Investment Platform",
    type: "Web Application",
    year: "2024",
    stack: ["React", "Vite", "CSS"],
    desc: "A conversion-focused investment platform built with clean architecture, intuitive user flows, and a fully responsive interface designed for real business impact.",
    link: "https://issygn.vercel.app",
  },
 
  {
    num: "03",
    name: "Futuristic Portfolio",
    type: "Portfolio Website",
    year: "2024",
    stack: ["React", "Vite", "CSS Animations"],
    desc: "A visually ambitious personal portfolio with custom animations and futuristic design language — pushing what a personal site can look and feel like.",
    link: "https://anth-ten.vercel.app",
  },
];

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Vite",
  "JavaScript ES6+",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "Framer Motion",
  "Supabase",
  "Firebase",
  "REST APIs",
  "Git & GitHub",
  "Figma",
  "Node.js",
];

const SERVICES = [
  {
    num: "01",
    title: "Landing Pages",
    desc: "Fast, conversion-focused pages that make your product impossible to ignore. Pixel-perfect on every screen size.",
  },
  {
    num: "02",
    title: "Web Applications",
    desc: "Full-featured React apps with auth, databases, and clean UX — built to ship and built to scale from day one.",
  },
  {
    num: "03",
    title: "UI/UX Development",
    desc: "From Figma file to flawless implementation. Smooth animations, thoughtful interactions, interfaces people enjoy.",
  },
  {
    num: "04",
    title: "AI Integration",
    desc: "Modern products powered by OpenAI, Claude API, and more. Smart features built right, from the very first line.",
  },
];

function useWidth() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const w = useWidth();
  const sm = w < 640;
  const md = w >= 640 && w < 1024;
  const lg = w >= 1024;
  const px = sm ? "20px" : md ? "40px" : "64px";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div
      style={{
        background: PAPER,
        color: INK,
        fontFamily: "'Libre Franklin', 'Helvetica Neue', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Libre+Franklin:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${INK}; color: ${PAPER}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${PAPER}; }
        ::-webkit-scrollbar-thumb { background: ${INK}20; }
        a { color: inherit; text-decoration: none; }
 
        .nav-a { font-size: 15px; font-weight: 500; color: ${INK}55; transition: color .18s; }
        .nav-a:hover { color: ${INK}; }
 
        .btn-dark {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: ${INK}; color: ${PAPER};
          padding: 13px 26px; font-family: inherit;
          font-size: 14px; font-weight: 500; border: none; cursor: pointer;
          transition: opacity .18s; letter-spacing: .2px;
        }
        .btn-dark:hover { opacity: .82; }
 
        .btn-outline {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: transparent; color: ${INK};
          padding: 13px 26px; font-family: inherit;
          font-size: 14px; font-weight: 500;
          border: 1.5px solid ${INK}22; cursor: pointer;
          transition: border-color .18s;
        }
        .btn-outline:hover { border-color: ${INK}; }
 
        .btn-light {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: ${PAPER}; color: ${INK};
          padding: 15px 28px; font-family: inherit;
          font-size: 15px; font-weight: 600; border: none; cursor: pointer;
          transition: opacity .18s;
        }
        .btn-light:hover { opacity: .85; }
 
        .project-card {
          border: 1.5px solid ${INK}12;
          padding: 28px 24px;
          background: ${PAPER};
          transition: border-color .18s, box-shadow .18s;
          display: block;
        }
        .project-card:hover { border-color: ${INK}55; box-shadow: 0 4px 24px ${INK}08; }
 
        .skill-tag {
          display: inline-block; padding: 7px 15px;
          border: 1.5px solid ${INK}14;
          font-size: 13px; font-weight: 500; color: ${INK}65;
          transition: all .15s; cursor: default;
        }
        .skill-tag:hover { border-color: ${INK}; color: ${INK}; background: ${INK}04; }
 
        .svc-card {
          padding: 28px 24px;
          border: 1.5px solid ${INK}12;
          transition: all .18s;
        }
        .svc-card:hover { background: ${INK}; border-color: ${INK}; }
        .svc-card:hover .sn { color: ${PAPER}22 !important; }
        .svc-card:hover .st { color: ${PAPER} !important; }
        .svc-card:hover .sd { color: ${PAPER}60 !important; }
 
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .au { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) both; }
        .d1 { animation-delay: .05s; } .d2 { animation-delay: .15s; }
        .d3 { animation-delay: .27s; } .d4 { animation-delay: .38s; }
        .d5 { animation-delay: .5s; }
 
        @keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .mq { display: flex; width: max-content; animation: mq 28s linear infinite; }
 
        .mobile-menu {
          position: fixed; inset: 0; background: ${INK};
          z-index: 300; display: flex; flex-direction: column;
          padding: 0 20px 32px;
          opacity: 0; pointer-events: none;
          transition: opacity .22s ease;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
      `}</style>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? PAPER + "F2" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid ${scrolled ? INK + "0A" : "transparent"}`,
          transition: "all .3s",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: `0 ${px}`,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 20,
              letterSpacing: "-.3px",
              color: INK,
            }}
          >
            Great Anthony
          </a>
          {!sm ? (
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {NAV_LINKS.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="nav-a">
                  {l}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-dark"
                style={{ padding: "10px 20px", fontSize: 13 }}
              >
                Hire Me
              </a>
            </div>
          ) : (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 22,
                    height: 1.5,
                    background: menuOpen ? PAPER : INK,
                    transition: "all .2s",
                    transform: menuOpen
                      ? i === 0
                        ? "rotate(45deg) translateY(5px)"
                        : i === 2
                        ? "rotate(-45deg) translateY(-5px)"
                        : "none"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 20,
              color: PAPER,
            }}
          >
            Great Anthony
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: PAPER,
              fontSize: 24,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(34px, 9vw, 50px)",
                color: PAPER,
                padding: "8px 0",
                borderBottom: `1px solid ${PAPER}10`,
                lineHeight: 1.15,
              }}
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="btn-light"
          style={{ borderRadius: 0 }}
        >
          Hire Me →
        </a>
      </div>

      {/* ── HERO ── */}
      <section
        style={{
          paddingTop: sm ? 104 : 120,
          paddingBottom: sm ? 64 : 96,
          paddingLeft: px,
          paddingRight: px,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          className="au d1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            border: `1.5px solid ${INK}14`,
            marginBottom: 36,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#16A34A",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: 2.5,
              color: INK + "60",
            }}
          >
            AVAILABLE FOR PROJECTS
          </span>
        </div>

        <h1
          className="au d2"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: sm
              ? "clamp(38px, 11vw, 52px)"
              : "clamp(56px, 7.5vw, 88px)",
            lineHeight: 1.08,
            letterSpacing: sm ? "-1px" : "-2px",
            color: INK,
            marginBottom: 24,
            maxWidth: 820,
          }}
        >
          I build web experiences
          <br />
          <em style={{ color: INK + "50" }}>that work beautifully.</em>
        </h1>

        <p
          className="au d3"
          style={{
            fontSize: sm ? 15 : 17,
            lineHeight: 1.8,
            color: INK + "65",
            maxWidth: 500,
            marginBottom: 36,
            fontWeight: 400,
          }}
        >
          Frontend developer based in Abuja, Nigeria. Specialising in React and
          Next.js — turning ideas into fast, polished, production-ready
          products.
        </p>

        <div
          className="au d4"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
          <a href="#work" className="btn-dark">
            View My Work →
          </a>
          <a href="#contact" className="btn-outline">
            Get in Touch
          </a>
        </div>

        <div
          className="au d5"
          style={{
            display: "grid",
            gridTemplateColumns: sm ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap: 1,
            background: INK + "10",
            border: `1.5px solid ${INK}10`,
          }}
        >
          {[
            ["10+", "Projects Shipped"],
            ["5+", "Years Building"],
            ["React", "Primary Stack"],
            ["Remote", "Work Ready"],
          ].map(([v, l]) => (
            <div
              key={l}
              style={{
                background: PAPER,
                padding: sm ? "18px 14px" : "22px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: sm ? 26 : 32,
                  color: INK,
                  marginBottom: 6,
                  letterSpacing: "-1px",
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: 2,
                  color: INK + "40",
                  textTransform: "uppercase",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee divider */}
      <div
        style={{
          overflow: "hidden",
          borderTop: `1px solid ${INK}08`,
          borderBottom: `1px solid ${INK}08`,
          padding: "13px 0",
          background: INK,
        }}
      >
        <div className="mq">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: 4,
                color: PAPER + "22",
                marginRight: 48,
                whiteSpace: "nowrap",
              }}
            >
              REACT — NEXT.JS — TYPESCRIPT — VITE — TAILWIND — SUPABASE — AI
              INTEGRATION — FRAMER MOTION
            </span>
          ))}
        </div>
      </div>

      {/* ── WORK ── */}
      <section
        id="work"
        style={{ padding: `80px ${px}`, maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: 3.5,
            color: INK + "35",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          Selected Work
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: sm ? 32 : 44,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              color: INK,
            }}
          >
            Recent Projects
          </h2>
          <a
            href="https://github.com/tegatheprogrammer"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: 3,
              color: INK + "45",
              borderBottom: `1px solid ${INK}20`,
              paddingBottom: 2,
            }}
          >
            ALL ON GITHUB →
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: lg
              ? "repeat(3,1fr)"
              : md
              ? "repeat(2,1fr)"
              : "1fr",
            gap: 16,
          }}
        >
          {PROJECTS.map((p) => (
            <a
              key={p.num}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="project-card"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: INK + "28",
                    letterSpacing: 2,
                  }}
                >
                  {p.num}
                </span>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: INK + "30",
                      letterSpacing: 1,
                    }}
                  >
                    {p.year}
                  </span>
                  <span style={{ fontSize: 15, color: INK + "35" }}>↗</span>
                </div>
              </div>
              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 22,
                  letterSpacing: "-.5px",
                  color: INK,
                  marginBottom: 8,
                  lineHeight: 1.25,
                }}
              >
                {p.name}
              </h3>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 2,
                  color: INK + "40",
                  marginBottom: 14,
                }}
              >
                {p.type}
              </div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.78,
                  color: INK + "62",
                  marginBottom: 20,
                }}
              >
                {p.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      letterSpacing: 1,
                      padding: "4px 10px",
                      border: `1px solid ${INK}12`,
                      color: INK + "45",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: INK, padding: `80px ${px}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: 3.5,
              color: PAPER + "30",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            About Me
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: lg ? "1fr 1fr" : "1fr",
              gap: lg ? 80 : 48,
              alignItems: "start",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: sm ? 32 : 44,
                  letterSpacing: "-1.5px",
                  lineHeight: 1.12,
                  color: PAPER,
                  marginBottom: 28,
                }}
              >
                Developer, creator,
                <br />
                <em style={{ opacity: 0.5 }}>and lifelong builder.</em>
              </h2>
              <p
                style={{
                  fontSize: sm ? 15 : 16,
                  lineHeight: 1.85,
                  color: PAPER + "68",
                  marginBottom: 18,
                }}
              >
                I'm{" "}
                <strong style={{ color: PAPER, fontWeight: 600 }}>
                  Great Anthony
                </strong>{" "}
                — a frontend developer building products at{" "}
                <strong style={{ color: PAPER, fontWeight: 600 }}>
                  Pantheon
                </strong>
                , a venture studio in Abuja, while completing my Computer
                Science degree at Veritas University.
              </p>
              <p
                style={{
                  fontSize: sm ? 15 : 16,
                  lineHeight: 1.85,
                  color: PAPER + "50",
                }}
              >
                Outside of code I run a cinematic history YouTube channel, trade
                forex and index markets, and build side projects I wish existed.
                I take craft seriously — every pixel, every interaction matters.
              </p>
            </div>

            <div>
              <div style={{ border: `1px solid ${PAPER}10` }}>
                {[
                  ["Location", "Abuja, Nigeria"],
                  ["Status", "Open to Work"],
                  ["Stack", "React / Next.js / TypeScript"],
                  ["Education", "CS — Veritas University"],
                  ["Currently", "Pantheon Studio"],
                  ["Remote", "Available Worldwide"],
                ].map(([k, v], i, arr) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 20px",
                      borderBottom:
                        i < arr.length - 1 ? `1px solid ${PAPER}08` : "none",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        letterSpacing: 2.5,
                        color: PAPER + "30",
                      }}
                    >
                      {k}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: PAPER + "80",
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                <a
                  href="#contact"
                  className="btn-light"
                  style={{ width: "100%", borderRadius: 0 }}
                >
                  Work With Me →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        style={{ padding: `80px ${px}`, maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: 3.5,
            color: INK + "35",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          Tech Stack
        </div>
        <h2
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: sm ? 32 : 44,
            letterSpacing: "-1.5px",
            color: INK,
            marginBottom: 36,
            lineHeight: 1.1,
          }}
        >
          My Toolkit
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SKILLS.map((s) => (
            <span key={s} className="skill-tag">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        style={{
          padding: `80px ${px}`,
          borderTop: `1px solid ${INK}08`,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: 3.5,
            color: INK + "35",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          What I Do
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: sm ? 32 : 44,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              color: INK,
            }}
          >
            Services
          </h2>
          <p
            style={{
              fontSize: 14,
              color: INK + "55",
              maxWidth: 300,
              lineHeight: 1.65,
            }}
          >
            I work with startups, agencies, and businesses of all sizes.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: lg ? "repeat(2,1fr)" : "1fr",
            gap: 1,
            background: INK + "08",
          }}
        >
          {SERVICES.map((s) => (
            <div key={s.num} className="svc-card">
              <div
                className="sn"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 3,
                  color: INK + "22",
                  marginBottom: 16,
                  transition: "color .18s",
                }}
              >
                {s.num}
              </div>
              <h3
                className="st"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 23,
                  letterSpacing: "-.5px",
                  color: INK,
                  marginBottom: 12,
                  lineHeight: 1.25,
                  transition: "color .18s",
                }}
              >
                {s.title}
              </h3>
              <p
                className="sd"
                style={{
                  fontSize: 14,
                  lineHeight: 1.78,
                  color: INK + "58",
                  transition: "color .18s",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{ background: INK, padding: `80px ${px} 100px` }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: 3.5,
              color: PAPER + "28",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Contact
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: lg ? "1fr 1fr" : "1fr",
              gap: lg ? 80 : 48,
              alignItems: "start",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontStyle: "italic",
                  fontSize: sm
                    ? "clamp(34px,10vw,48px)"
                    : "clamp(44px,5.5vw,66px)",
                  letterSpacing: "-2px",
                  color: PAPER,
                  lineHeight: 1.08,
                  marginBottom: 22,
                }}
              >
                Let's build something great together.
              </h2>
              <p
                style={{
                  fontSize: sm ? 15 : 16,
                  lineHeight: 1.8,
                  color: PAPER + "52",
                  maxWidth: 380,
                }}
              >
                Open to freelance projects, contracts, and full-time remote
                roles. International clients welcome — I invoice in USD.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  padding: "20px 22px",
                  border: `1.5px solid ${PAPER}12`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    letterSpacing: 3,
                    color: PAPER + "28",
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  Email
                </div>
                <a
                  href="mailto:agreat496@email.com"
                  style={{
                    fontSize: 15,
                    color: PAPER + "75",
                    fontWeight: 500,
                    borderBottom: `1px solid ${PAPER}20`,
                    paddingBottom: 2,
                  }}
                >
                  agreat496@email.com"
                </a>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  [
                    "GitHub",
                    "https://github.com/tegatheprogrammer",
                    "tegatheprogrammer",
                  ],
                  [
                    "Portfolio",
                    "https://anth-ten.vercel.app",
                    "anth-ten.vercel.app",
                  ],
                ].map(([label, href, val]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: "18px 18px",
                      border: `1.5px solid ${PAPER}10`,
                      display: "block",
                      transition: "border-color .18s",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        letterSpacing: 3,
                        color: PAPER + "28",
                        marginBottom: 8,
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: PAPER + "60",
                        fontWeight: 500,
                        wordBreak: "break-all",
                      }}
                    >
                      {val}
                    </div>
                  </a>
                ))}
              </div>

              <a href="mailto:agreat496@email.com" className="btn-light">
                Send Me an Email →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: INK,
          borderTop: `1px solid ${PAPER}07`,
          padding: `20px ${px}`,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 16,
              color: PAPER + "35",
            }}
          >
            Great Anthony
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: 3,
              color: PAPER + "20",
            }}
          >
            © 2026 — ABUJA, NIGERIA
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: 2,
              color: PAPER + "20",
            }}
          >
            FRONTEND DEVELOPER
          </span>
        </div>
      </footer>
    </div>
  );
}
