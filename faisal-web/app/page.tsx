"use client";
  import { useRef, useState, useEffect } from "react";
  import dynamic from "next/dynamic";
  import Image from "next/image";
  import { motion, useScroll, useTransform, useInView } from "framer-motion";
  import { CinematicLoader } from "@/components/CinematicLoader";
  import { Navbar } from "@/components/Navbar";

  const ThreeScene = dynamic(() => import("@/components/ThreeScene"), { ssr: false });

  // ─── Utility: Scroll Reveal ───────────────────────────────────
  function Reveal({
    children,
    delay = 0,
    style,
  }: {
    children: React.ReactNode;
    delay?: number;
    style?: React.CSSProperties;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-12%" });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  // ─── Magnetic Button ─────────────────────────────────────────
  function GoldButton({ href, label }: { href: string; label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          if (!ref.current) return;
          const r = ref.current.getBoundingClientRect();
          setPos({ x: (e.clientX - r.left - r.width / 2) * 0.14, y: (e.clientY - r.top - r.height / 2) * 0.14 });
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setPos({ x: 0, y: 0 }); }}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <a href={href} style={{ position: "relative", display: "inline-block", overflow: "hidden", textDecoration: "none" }}>
          <motion.div
            animate={{ x: hover ? "0%" : "-102%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute", inset: 0, background: "#D4AF37",
            }}
          />
          <span style={{
            position: "relative",
            display: "inline-flex", alignItems: "center", gap: 12,
            border: "1px solid rgba(212,175,55,0.5)",
            padding: "14px 32px",
            fontSize: 11, letterSpacing: "0.44em", textTransform: "uppercase",
            fontWeight: 500,
            color: hover ? "#000" : "#D4AF37",
            transition: "color 0.35s",
          }}>
            {label}
            <motion.span animate={{ x: hover ? 5 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
          </span>
        </a>
      </motion.div>
    );
  }

  // ─── Hero Section ─────────────────────────────────────────────
  function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
      <section
        ref={ref}
        style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#000" }}
      >
        {/* Portrait */}
        <motion.div
          style={{
            position: "absolute", inset: 0, y: imgY,
          }}
        >
          <Image
            src="/portrait.png"
            alt="Faisal Orakzai"
            fill
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              filter: "brightness(0.82) contrast(1.05)",
            }}
            className="portrait-float"
          />
          {/* Portrait gradient mask */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.97) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.8) 100%)",
          }} />
          {/* Subtle gold rim */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, right: 0, width: 1,
            background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.18), transparent)",
          }} />
        </motion.div>

        {/* Text overlay — RIGHT */}
        <motion.div
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "min(480px, 50%)",
            display: "flex", alignItems: "center",
            padding: "0 48px 0 32px",
            y: textY, opacity,
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
            }}
          >
            {/* Pulse indicator */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36 }}
            >
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4AF37" }}
              />
              <span style={{
                color: "rgba(212,175,55,0.45)", fontSize: 9,
                letterSpacing: "0.5em", textTransform: "uppercase", fontFamily: "monospace",
              }}>
                SYSTEM ACTIVE
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
              style={{
                fontSize: "clamp(56px, 5.5vw, 82px)",
                fontWeight: 300,
                lineHeight: 0.88,
                letterSpacing: "-0.025em",
                color: "#fff",
                marginBottom: 20,
              }}
            >
              FAISAL
              <br />
              <span style={{
                color: "#D4AF37",
                textShadow: "0 0 60px rgba(212,175,55,0.28), 0 0 120px rgba(212,175,55,0.08)",
              }}>
                ORAKZAI
              </span>
            </motion.h1>

            {/* Gold line */}
            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
              style={{
                height: 1, width: 48, background: "rgba(212,175,55,0.6)",
                transformOrigin: "left", marginBottom: 20,
              }}
            />

            {/* Tagline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              style={{
                color: "rgba(255,255,255,0.4)", fontSize: 11,
                letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 28,
              }}
            >
              Entrepreneur · Investor · System Builder
            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              style={{
                fontSize: "clamp(18px, 2vw, 23px)",
                fontWeight: 300, lineHeight: 1.4,
                color: "rgba(255,255,255,0.82)", marginBottom: 6,
              }}
            >
              I build systems
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              style={{
                fontSize: "clamp(18px, 2vw, 23px)",
                fontWeight: 300, lineHeight: 1.4,
                color: "rgba(255,255,255,0.28)", marginBottom: 44,
              }}
            >
              that shape industries.
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
              <GoldButton href="#identity" label="ENTER THE VISION" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          style={{
            position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10,
          }}
        >
          <motion.div
            animate={{ scaleY: [1, 0.35, 1], y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 1, height: 40,
              background: "linear-gradient(to bottom, rgba(212,175,55,0.4), transparent)",
            }}
          />
        </motion.div>
      </section>
    );
  }

  // ─── Identity / Manifesto ─────────────────────────────────────
  function IdentitySection() {
    const lines = [
      { text: "The world is", gold: false },
      { text: "shifting.", gold: true },
      { text: "Power moves to", gold: false },
      { text: "builders.", gold: false },
    ];

    return (
      <section
        id="identity"
        style={{ position: "relative", padding: "160px 0 180px", background: "#000", overflow: "hidden" }}
      >
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 50% at 65% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px" }}>
          <div style={{ maxWidth: 900 }}>
            {lines.map((line, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  fontSize: "clamp(52px, 8vw, 108px)",
                  fontWeight: 300, lineHeight: 0.85,
                  letterSpacing: "-0.035em",
                  color: line.gold ? "#D4AF37" : "rgba(255,255,255,0.92)",
                  marginBottom: 6,
                }}>
                  {line.text}
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.55} style={{ marginTop: 56 }}>
              <p style={{
                color: "rgba(255,255,255,0.3)", fontSize: 17,
                fontWeight: 300, lineHeight: 1.7, maxWidth: 420,
              }}>
                Most entrepreneurs compete within existing systems. 
                Few understand how to architect the systems themselves.
              </p>
            </Reveal>
          </div>

          {/* Philosophy rows */}
          <div style={{ marginTop: 100, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              {
                n: "01", title: "Most build products.",
                sub: "I build operating systems for industries.",
                body: "Products get replaced. Systems endure. Every venture is designed to become foundational infrastructure — not another product in a crowded market.",
              },
              {
                n: "02", title: "Most think local.",
                sub: "I think in global architectures.",
                body: "Geography is a limitation for those who think small. Every system I build is designed for scale from day one — from anywhere, for everywhere.",
              },
              {
                n: "03", title: "Most react to change.",
                sub: "I build the change.",
                body: "AI. Digital assets. Sovereign identity. These aren't trends — they are new foundations. I position before the wave, not after it breaks.",
              },
            ].map((b, i) => (
              <PhiloRow key={i} {...b} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  function PhiloRow({ n, title, sub, body, delay }: {
    n: string; title: string; sub: string; body: string; delay: number;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-8%" });
    const [hov, setHov] = useState(false);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr 1fr",
          gap: "0 56px",
          padding: "56px 0",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          cursor: "default",
        }}
      >
        <span style={{ color: "rgba(212,175,55,0.2)", fontSize: 10, letterSpacing: "0.35em", fontFamily: "monospace", paddingTop: 4 }}>
          {n}
        </span>
        <div>
          <div style={{ fontSize: 26, fontWeight: 300, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.01em", marginBottom: 6 }}>
            {title}
          </div>
          <div style={{ fontSize: 15, color: "rgba(212,175,55,0.65)", fontWeight: 300 }}>{sub}</div>
        </div>
        <motion.p
          animate={{ opacity: hov ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontWeight: 300, alignSelf: "center" }}
        >
          {body}
        </motion.p>
      </motion.div>
    );
  }

  // ─── Systems ──────────────────────────────────────────────────
  function SystemsSection() {
    const systems = [
      { label: "AI Infrastructure", desc: "Cognitive layers for the next wave of intelligent systems and decision architectures." },
      { label: "Digital Assets", desc: "Sovereign financial instruments and yield systems beyond traditional market structures." },
      { label: "Real Systems", desc: "Physical-digital integration engineered at global scale with tangible output." },
      { label: "Identity Systems", desc: "Sovereign identity in the age of AI — true ownership of self, data, and reputation." },
    ];

    return (
      <section
        id="systems"
        style={{ position: "relative", padding: "160px 0", background: "#040404" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px" }}>
          <Reveal style={{ marginBottom: 72 }}>
            <h2 style={{
              fontSize: "clamp(44px, 5.5vw, 72px)",
              fontWeight: 300, letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.92)",
            }}>
              What I build.
            </h2>
          </Reveal>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1, background: "rgba(255,255,255,0.04)",
          }}>
            {systems.map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <SystemCard {...s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function SystemCard({ label, desc, index }: { label: string; desc: string; index: number }) {
    const [hov, setHov] = useState(false);
    return (
      <motion.div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        animate={{ background: hov ? "rgba(212,175,55,0.025)" : "#040404" }}
        transition={{ duration: 0.4 }}
        style={{ padding: "48px 52px", cursor: "default" }}
      >
        <div style={{ color: "rgba(212,175,55,0.25)", fontSize: 10, letterSpacing: "0.45em", fontFamily: "monospace", marginBottom: 20 }}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <div style={{
          fontSize: 21, fontWeight: 300,
          color: hov ? "#fff" : "rgba(255,255,255,0.88)",
          marginBottom: 14, transition: "color 0.3s",
          letterSpacing: "-0.01em",
        }}>
          {label}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.7, fontWeight: 300 }}>{desc}</div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: index * 0.08 }}
          viewport={{ once: true }}
          style={{
            marginTop: 32, height: 1,
            background: "linear-gradient(to right, rgba(212,175,55,0), rgba(212,175,55,0.35), rgba(212,175,55,0))",
            transformOrigin: "left",
          }}
        />
      </motion.div>
    );
  }


    // ─── Press / Awards ───────────────────────────────────────────
    function PressSection() {
      const pressItems = [
        {
          badge: "AWARDS",
          title: "Muhammad Faisal Orakzai Wins Stevie Gold Award for Technology Innovation 2026",
          description:
            "Pakistan's youngest blockchain architect, Muhammad Faisal Orakzai, receives the prestigious Stevie Gold Award — the first Pakistani to win in the Technology Innovation category, recognised for Orakzai Bond (OKBOND) on Polygon Layer-2 blockchain.",
          source: "Stevie Awards",
          date: "March 15, 2026",
          readSourceUrl: "https://www.stevieawards.com",
          seeAwardUrl: "https://drive.google.com/file/d/12YR3guJ8w-650RYqewhC-CuMUZKgubuk/view?usp=drivesdk",
        },
      ];

      return (
        <section
          id="press"
          style={{ position: "relative", padding: "160px 0", background: "#000", overflow: "hidden" }}
        >
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 50% 60% at 30% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)",
          }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 60px" }}>
            <Reveal style={{ marginBottom: 16 }}>
              <div style={{
                color: "rgba(212,175,55,0.35)", fontSize: 9,
                letterSpacing: "0.7em", textTransform: "uppercase",
                fontFamily: "monospace",
              }}>
                ⚡ AUTHORITATIVE SOURCE
              </div>
            </Reveal>
            <Reveal delay={0.06} style={{ marginBottom: 72 }}>
              <h2 style={{
                fontSize: "clamp(44px, 5.5vw, 72px)",
                fontWeight: 300, letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.92)",
              }}>
                Press &amp; Recognition.
              </h2>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {pressItems.map((item, i) => (
                <PressCard key={i} {...item} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>
      );
    }

    function PressCard({
      badge, title, description, source, date, readSourceUrl, seeAwardUrl, delay,
    }: {
      badge: string;
      title: string;
      description: string;
      source: string;
      date: string;
      readSourceUrl: string;
      seeAwardUrl: string;
      delay: number;
    }) {
      const [hov, setHov] = useState(false);

      return (
        <Reveal delay={delay}>
          <motion.div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            animate={{ borderColor: hov ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.05)" }}
            transition={{ duration: 0.35 }}
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              padding: "48px 52px",
              background: hov ? "rgba(212,175,55,0.02)" : "transparent",
              transition: "background 0.35s",
            }}
          >
            {/* Badge */}
            <div style={{ marginBottom: 20 }}>
              <span style={{
                display: "inline-block",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#D4AF37",
                fontSize: 9,
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                padding: "4px 12px",
                fontFamily: "monospace",
              }}>
                {badge}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: "clamp(22px, 2.4vw, 32px)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 20,
              maxWidth: 680,
            }}>
              {title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: 640,
              marginBottom: 32,
            }}>
              {description}
            </p>

            {/* Meta row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 28,
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                color: "rgba(255,255,255,0.25)", fontSize: 12,
              }}>
                <span style={{ opacity: 0.5 }}>⊕</span>
                <span style={{ letterSpacing: "0.06em" }}>{source}</span>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                color: "rgba(255,255,255,0.25)", fontSize: 12,
              }}>
                <span style={{ opacity: 0.5 }}>◷</span>
                <span style={{ letterSpacing: "0.06em" }}>{date}</span>
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              <a
                href={readSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  color: "rgba(212,175,55,0.65)",
                  fontSize: 11, letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#D4AF37"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,175,55,0.65)"; }}
              >
                <span style={{ fontSize: 13 }}>↗</span> Read Source
              </a>
              <a
                href={seeAwardUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 11, letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "8px 18px",
                  transition: "all 0.25s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                  e.currentTarget.style.background = "rgba(212,175,55,0.06)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 13 }}>⊞</span> See Award
              </a>
            </div>
          </motion.div>
        </Reveal>
      );
    }

    // ─── Signal / CTA ─────────────────────────────────────────────
  function SignalSection() {
    return (
      <section
        id="signal"
        style={{
          position: "relative", padding: "200px 0",
          background: "#000", overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", padding: "0 40px" }}>
          <Reveal>
            <div style={{ color: "rgba(212,175,55,0.35)", fontSize: 9, letterSpacing: "0.7em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 32 }}>
              The Vision
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 style={{
              fontSize: "clamp(50px, 7vw, 92px)",
              fontWeight: 300, lineHeight: 0.86,
              letterSpacing: "-0.035em",
              color: "rgba(255,255,255,0.95)",
              marginBottom: 56,
            }}>
              This is not
              <br />
              <span style={{
                color: "#D4AF37",
                textShadow: "0 0 60px rgba(212,175,55,0.25)",
              }}>
                the beginning.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p style={{
              color: "rgba(255,255,255,0.28)", fontSize: 17,
              fontWeight: 300, lineHeight: 1.7, maxWidth: 380,
              margin: "0 auto 56px",
            }}>
              It is a checkpoint in an already moving system. 
              The architecture is already in motion.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
              <GoldButton href="mailto:faisal@orakzai.com" label="OPEN A CHANNEL" />
              <a
                href="#identity"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "14px 28px", fontSize: 11,
                  letterSpacing: "0.4em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                EXPLORE VISION
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // ─── Main App ─────────────────────────────────────────────────
  export default function Page() {
    const [loaded, setLoaded] = useState(false);

    return (
      <main style={{ position: "relative", background: "#000", minHeight: "100vh" }}>
        <ThreeScene />
        <CinematicLoader onComplete={() => setLoaded(true)} />
        {loaded && (
          <div style={{ position: "relative", zIndex: 10 }}>
            <Navbar />
            <HeroSection />
            <IdentitySection />
            <SystemsSection />
            <SignalSection />
          </div>
        )}
      </main>
    );
  }