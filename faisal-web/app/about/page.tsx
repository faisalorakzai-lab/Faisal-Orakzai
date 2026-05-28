"use client";
  import { useRef, useState, useEffect } from "react";
  import dynamic from "next/dynamic";
  import Image from "next/image";
  import {
    motion, useScroll, useTransform, useInView, useSpring, AnimatePresence
  } from "framer-motion";
  import { Navbar } from "@/components/Navbar";

  const ThreeScene = dynamic(() => import("@/components/ThreeScene"), { ssr: false });

  // ─── Helpers ─────────────────────────────────────────────────
  function Reveal({
    children, delay = 0, y = 40, style,
  }: {
    children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-8%" });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  // ─── Ambient Particles (lightweight canvas) ───────────────────
  function AmbientParticles({ count = 80, opacity = 0.18 }: { count?: number; opacity?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      let raf: number;
      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      resize();
      window.addEventListener("resize", resize);
      const pts = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.4,
      }));
      const draw = () => {
        raf = requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212,175,55,${opacity})`;
          ctx.fill();
        }
      };
      draw();
      return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, [count, opacity]);
    return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
  }

  // ─── Opening Sequence ─────────────────────────────────────────
  function OpeningSection() {
    const [phase, setPhase] = useState(0);
    useEffect(() => {
      const t = [
        setTimeout(() => setPhase(1), 300),
        setTimeout(() => setPhase(2), 900),
        setTimeout(() => setPhase(3), 1600),
      ];
      return () => t.forEach(clearTimeout);
    }, []);

    return (
      <section style={{
        position: "relative", height: "100vh", background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* AI Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 2.5 }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <AmbientParticles count={60} opacity={0.12} />

        {/* Gold radial glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 3 }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
          }}
        />

        <div style={{ position: "relative", textAlign: "center", zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
              color: "rgba(212,175,55,0.3)", fontSize: 9,
              letterSpacing: "0.65em", textTransform: "uppercase",
              fontFamily: "monospace", marginBottom: 48,
            }}
          >
            FAISAL ORAKZAI — ORIGIN DOCUMENT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={phase >= 2 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(80px, 12vw, 160px)",
              fontWeight: 300, lineHeight: 0.82, letterSpacing: "-0.04em",
              color: "#fff", marginBottom: 32,
            }}
          >
            THE
            <br />
            <span style={{
              color: "#D4AF37",
              textShadow: "0 0 80px rgba(212,175,55,0.3), 0 0 160px rgba(212,175,55,0.08)",
            }}>
              JOURNEY
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: "rgba(255,255,255,0.25)", fontSize: "clamp(13px, 1.6vw, 18px)",
              fontWeight: 300, lineHeight: 1.6, maxWidth: 420, margin: "0 auto",
            }}
          >
            From early struggle to system-driven ambition.
            <br />
            Built through discipline, adaptation, and long-term thinking.
          </motion.p>
        </div>

        {/* Scroll arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ delay: 1 }}
          style={{
            position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: "rgba(212,175,55,0.4)", fontSize: 18 }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // ─── Hero Portrait ─────────────────────────────────────────────
  function HeroPortrait() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);

    return (
      <section ref={ref} style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#000" }}>
        <motion.div style={{ position: "absolute", inset: 0, y }}>
          <Image
            src="/portrait.png"
            alt="Faisal Orakzai"
            fill
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center 15%",
              filter: "brightness(0.55) contrast(1.1) saturate(0.9)",
            }}
          />
          {/* Dark cinematic overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.7) 90%, rgba(0,0,0,1) 100%)",
          }} />
          {/* Gold edge light */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: 0, width: 180,
            background: "linear-gradient(to right, rgba(212,175,55,0.06), transparent)",
          }} />
          <div style={{
            position: "absolute", top: 0, bottom: 0, right: 0, width: 180,
            background: "linear-gradient(to left, rgba(212,175,55,0.06), transparent)",
          }} />
        </motion.div>

        <motion.div
          style={{
            position: "absolute", bottom: "12%", left: "50%",
            transform: "translateX(-50%)", textAlign: "center",
            zIndex: 10, opacity,
          }}
        >
          <Reveal>
            <div style={{
              fontSize: "clamp(13px, 1.4vw, 16px)", color: "rgba(212,175,55,0.5)",
              letterSpacing: "0.45em", textTransform: "uppercase",
              fontWeight: 300, fontFamily: "monospace",
            }}>
              Entrepreneur · Investor · System Builder
            </div>
          </Reveal>
        </motion.div>
      </section>
    );
  }

  // ─── Story Section ─────────────────────────────────────────────
  function StorySection() {
    const blocks = [
      {
        tag: "ORIGIN",
        heading: "Born from the grind,
not the classroom.",
        body: "Born in Pakistan. Business wasn't studied — it was lived. Every lesson came from real markets, real people, real consequences. The understanding of leverage, systems, and human behavior was forged through experience, not theory.",
      },
      {
        tag: "TRANSITION",
        heading: "From local operations
to scalable systems.",
        body: "Real estate was the first domain. Then digital finance. The shift wasn't just industry — it was a complete architectural change in thinking. From survival to infrastructure. From reacting to the market to building the structures others operate within.",
      },
      {
        tag: "EVOLUTION",
        heading: "The system became
the mission.",
        body: "Over time, the focus expanded beyond business execution into system design itself. Automation, AI, digital frameworks, long-term structures. The goal was no longer to win in a market — it was to build the market.",
      },
    ];

    return (
      <section style={{ position: "relative", background: "#000", padding: "160px 0 120px", overflow: "hidden" }}>
        {/* Background atmosphere */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,55,0.025) 0%, transparent 60%)",
        }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
          {blocks.map((b, i) => (
            <StoryBlock key={i} {...b} index={i} />
          ))}
        </div>
      </section>
    );
  }

  function StoryBlock({ tag, heading, body, index }: {
    tag: string; heading: string; body: string; index: number;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 160, position: "relative" }}
      >
        {/* Number */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            color: "rgba(212,175,55,0.15)", fontSize: 11,
            letterSpacing: "0.5em", fontFamily: "monospace",
            marginBottom: 28,
          }}
        >
          {tag}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 300, lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.95)",
            marginBottom: 36,
            whiteSpace: "pre-line",
          }}
        >
          {heading}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1, width: 64, transformOrigin: "left",
            background: "rgba(212,175,55,0.4)", marginBottom: 28,
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontSize: "clamp(15px, 1.6vw, 18px)",
            color: "rgba(255,255,255,0.35)",
            fontWeight: 300, lineHeight: 1.8,
            maxWidth: 540,
          }}
        >
          {body}
        </motion.p>

        {/* Atmospheric number */}
        <div style={{
          position: "absolute", right: -20, top: -20,
          fontSize: "clamp(100px, 14vw, 180px)",
          fontWeight: 700, color: "rgba(212,175,55,0.025)",
          lineHeight: 1, letterSpacing: "-0.05em",
          pointerEvents: "none", userSelect: "none",
        }}>
          0{index + 1}
        </div>
      </motion.div>
    );
  }

  // ─── Quote Section ─────────────────────────────────────────────
  function QuoteSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: false, margin: "-20%" });

    return (
      <section
        ref={ref}
        style={{
          position: "relative", minHeight: "100vh", background: "#000",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", padding: "80px 40px",
        }}
      >
        <AmbientParticles count={50} opacity={0.1} />

        {/* Glow pulse */}
        <motion.div
          animate={inView ? { opacity: [0.04, 0.09, 0.04] } : { opacity: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(212,175,55,1) 0%, transparent 70%)",
          }}
        />

        <div style={{ position: "relative", textAlign: "center", zIndex: 10, maxWidth: 900, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.2 }}
            style={{
              height: 1, width: 60, background: "rgba(212,175,55,0.4)",
              margin: "0 auto 60px",
            }}
          />

          <motion.blockquote
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(44px, 7vw, 96px)",
              fontWeight: 300, lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.95)",
              margin: 0, marginBottom: 56,
            }}
          >
            "I build systems
            <br />
            <motion.span
              initial={{ color: "rgba(255,255,255,0.95)" }}
              animate={inView ? { color: "#D4AF37" } : {}}
              transition={{ delay: 0.5, duration: 1.2 }}
              style={{
                display: "block",
                textShadow: "0 0 80px rgba(212,175,55,0.3)",
              }}
            >
              that build businesses."
            </motion.span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              color: "rgba(212,175,55,0.3)", fontSize: 10,
              letterSpacing: "0.45em", textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            — Faisal Orakzai
          </motion.div>
        </div>
      </section>
    );
  }

  // ─── Mindset Grid ─────────────────────────────────────────────
  function MindsetGrid() {
    const panels = [
      { tag: "01", label: "AI Systems", body: "Automation-first thinking. Building cognitive infrastructure before it becomes standard." },
      { tag: "02", label: "Digital Assets", body: "Modern financial frameworks. Sovereignty in value storage beyond traditional systems." },
      { tag: "03", label: "Real Systems", body: "Long-term infrastructure. Physical-digital integration built to compound over decades." },
      { tag: "04", label: "Scale", body: "Build beyond local limitations. Every system designed for global architecture from day one." },
    ];

    return (
      <section style={{ position: "relative", background: "#040404", padding: "160px 0 180px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <Reveal style={{ marginBottom: 80 }}>
            <h2 style={{
              fontSize: "clamp(44px, 6vw, 80px)",
              fontWeight: 300, letterSpacing: "-0.035em",
              color: "rgba(255,255,255,0.92)", lineHeight: 0.9,
            }}>
              The mindset
              <br />
              <span style={{ color: "rgba(255,255,255,0.25)" }}>behind the systems.</span>
            </h2>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}>
            {panels.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <GlassCard {...p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function GlassCard({ tag, label, body }: { tag: string; label: string; body: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hov, setHov] = useState(false);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
      setTilt({ x, y });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
        animate={{
          rotateX: tilt.y, rotateY: tilt.x,
          scale: hov ? 1.03 : 1,
          y: hov ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{
          perspective: 1000,
          padding: "44px 36px",
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(16px)",
          border: hov ? "1px solid rgba(212,175,55,0.2)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
                         : "0 8px 32px rgba(0,0,0,0.4)",
          cursor: "default", transformStyle: "preserve-3d",
          transition: "border 0.3s, box-shadow 0.3s",
        }}
      >
        <div style={{
          color: "rgba(212,175,55,0.2)", fontSize: 10,
          letterSpacing: "0.45em", fontFamily: "monospace",
          marginBottom: 24,
        }}>
          {tag}
        </div>

        {/* Minimal line visual */}
        <motion.div
          animate={{ width: hov ? "40px" : "24px" }}
          transition={{ duration: 0.3 }}
          style={{ height: 1, background: "rgba(212,175,55,0.5)", marginBottom: 20 }}
        />

        <div style={{
          fontSize: 22, fontWeight: 300,
          color: hov ? "#fff" : "rgba(255,255,255,0.88)",
          letterSpacing: "-0.01em", marginBottom: 16,
          transition: "color 0.3s",
        }}>
          {label}
        </div>
        <div style={{
          fontSize: 13, color: "rgba(255,255,255,0.3)",
          lineHeight: 1.75, fontWeight: 300,
        }}>
          {body}
        </div>
      </motion.div>
    );
  }

  // ─── Timeline Section ─────────────────────────────────────────
  const milestones = [
    { year: "2018", title: "The Beginning", desc: "Entered the business world. Real estate operations. The first lessons in leverage, market dynamics, and human psychology." },
    { year: "2022", title: "Digital Finance", desc: "Expanded into digital assets and financial systems. The shift from local to global thinking began." },
    { year: "2023", title: "Orakzai Group", desc: "Founded the infrastructure that would become the operating system for all ventures. A holding architecture for long-term compounding." },
    { year: "2024", title: "AI Expansion", desc: "Moved into AI systems and automation infrastructure. Building cognitive layers before they become commodities." },
  ];

  function TimelineSection() {
    return (
      <section style={{ position: "relative", background: "#000", padding: "160px 0 180px", overflow: "hidden" }}>
        <AmbientParticles count={30} opacity={0.06} />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px" }}>
          <Reveal style={{ marginBottom: 100 }}>
            <h2 style={{
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 300, letterSpacing: "-0.035em",
              color: "rgba(255,255,255,0.92)",
            }}>
              Mission
              <br />
              <span style={{ color: "#D4AF37" }}>progression.</span>
            </h2>
          </Reveal>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: 1, background: "rgba(212,175,55,0.08)",
            }} />

            {milestones.map((m, i) => (
              <TimelineItem key={i} {...m} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  function TimelineItem({ year, title, desc, index }: {
    year: string; title: string; desc: string; index: number;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-8%" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{ paddingLeft: 52, paddingBottom: 72, position: "relative" }}
      >
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", left: -5, top: 6,
            width: 10, height: 10, borderRadius: "50%",
            background: "#D4AF37",
            boxShadow: inView ? "0 0 20px rgba(212,175,55,0.5)" : "none",
          }}
        />

        {/* Line fill */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", left: 0, top: 20, height: "calc(100% - 20px)",
            width: 1, background: "rgba(212,175,55,0.2)",
            transformOrigin: "top",
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            color: "#D4AF37", fontSize: 11,
            letterSpacing: "0.4em", fontFamily: "monospace",
            marginBottom: 12,
          }}>
            {year}
          </div>
          <div style={{
            fontSize: "clamp(24px, 3vw, 34px)",
            fontWeight: 300, letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.92)", marginBottom: 14,
          }}>
            {title}
          </div>
          <p style={{
            fontSize: 14, color: "rgba(255,255,255,0.3)",
            lineHeight: 1.75, fontWeight: 300, maxWidth: 460,
          }}>
            {desc}
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // ─── Closing CTA ──────────────────────────────────────────────
  function ClosingCTA() {
    return (
      <section style={{
        position: "relative", background: "#000",
        padding: "160px 0 200px", textAlign: "center", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto", padding: "0 40px" }}>
          <Reveal>
            <div style={{
              color: "rgba(212,175,55,0.3)", fontSize: 9,
              letterSpacing: "0.6em", textTransform: "uppercase",
              fontFamily: "monospace", marginBottom: 40,
            }}>
              The architecture is in motion.
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontSize: "clamp(44px, 6vw, 76px)",
              fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.035em",
              color: "rgba(255,255,255,0.92)", marginBottom: 52,
            }}>
              Ready to
              <br />
              <span style={{ color: "#D4AF37" }}>connect.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="mailto:faisal@orakzai.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 14,
                border: "1px solid rgba(212,175,55,0.45)",
                padding: "14px 36px", fontSize: 11,
                letterSpacing: "0.45em", textTransform: "uppercase",
                color: "#D4AF37", textDecoration: "none",
                transition: "all 0.35s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#D4AF37";
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#D4AF37";
              }}
            >
              OPEN A CHANNEL →
            </a>
          </Reveal>
        </div>
      </section>
    );
  }

  // ─── Main ─────────────────────────────────────────────────────
  export default function AboutPage() {
    return (
      <main style={{ position: "relative", background: "#000", minHeight: "100vh" }}>
        <ThreeScene />
        <div style={{ position: "relative", zIndex: 10 }}>
          <Navbar />
          <OpeningSection />
          <HeroPortrait />
          <StorySection />
          <QuoteSection />
          <MindsetGrid />
          <TimelineSection />
          <ClosingCTA />
        </div>
      </main>
    );
  }