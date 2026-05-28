"use client";
  import { useState, useEffect, useRef } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Navbar } from "@/components/Navbar";

  const INNER_CIRCLE_PASS = "orakzai2025";

  function AmbientParticles({ count = 60 }: { count?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      let raf: number;
      const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
      resize();
      window.addEventListener("resize", resize);
      const pts = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.2 + 0.4,
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
          ctx.fillStyle = "rgba(212,175,55,0.15)";
          ctx.fill();
        }
      };
      draw();
      return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, [count]);
    return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
  }

  // ─── Gate Screen ─────────────────────────────────────────────
  function GateScreen({ onUnlock }: { onUnlock: () => void }) {
    const [val, setVal] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [phase, setPhase] = useState(0);

    useEffect(() => {
      const t = [setTimeout(() => setPhase(1), 200), setTimeout(() => setPhase(2), 900)];
      return () => t.forEach(clearTimeout);
    }, []);

    const attempt = (input: string) => {
      if (input === INNER_CIRCLE_PASS) {
        setError(false);
        onUnlock();
      } else {
        setError(true);
        setShake(true);
        setVal("");
        setTimeout(() => { setShake(false); setError(false); }, 700);
      }
    };

    return (
      <div style={{
        position: "fixed", inset: 0, background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", zIndex: 50,
      }}>
        <AmbientParticles count={50} />
        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 2 }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Corner brackets */}
        {phase >= 1 && [
          { top: 24, left: 24, borderTop: "1px solid", borderLeft: "1px solid" },
          { top: 24, right: 24, borderTop: "1px solid", borderRight: "1px solid" },
          { bottom: 24, left: 24, borderBottom: "1px solid", borderLeft: "1px solid" },
          { bottom: 24, right: 24, borderBottom: "1px solid", borderRight: "1px solid" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{ position: "absolute", width: 20, height: 20, borderColor: "rgba(212,175,55,0.2)", ...s }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.5 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 40 }}
          >
            <div style={{
              width: 56, height: 56, border: "1px solid rgba(212,175,55,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <div style={{
              color: "#D4AF37", fontSize: 10, letterSpacing: "0.55em",
              textTransform: "uppercase", fontWeight: 300, marginBottom: 12,
            }}>
              INNER CIRCLE
            </div>
            <h1 style={{
              color: "rgba(255,255,255,0.9)", fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 300, letterSpacing: "-0.025em", marginBottom: 12,
            }}>
              Restricted Access
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.2)", fontSize: 13,
              fontWeight: 300, letterSpacing: "0.05em",
            }}>
              This space is invitation-only.
            </p>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 16 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{ width: "min(320px, 80vw)" }}
          >
            <motion.div
              animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <input
                type="password"
                value={val}
                placeholder="Access code"
                onChange={e => setVal(e.target.value)}
                onKeyDown={e => e.key === "Enter" && attempt(val)}
                autoFocus
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "14px 18px",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${error ? "rgba(255,80,80,0.5)" : "rgba(212,175,55,0.2)"}`,
                  color: "#fff", fontSize: 14, letterSpacing: "0.12em",
                  outline: "none",
                  fontFamily: "monospace",
                  transition: "border 0.3s",
                }}
              />
              <motion.button
                whileHover={{ background: "#D4AF37", color: "#000" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => attempt(val)}
                style={{
                  marginTop: 10, width: "100%", padding: "13px",
                  background: "transparent",
                  border: "1px solid rgba(212,175,55,0.4)",
                  color: "#D4AF37", fontSize: 10,
                  letterSpacing: "0.5em", textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "background 0.3s, color 0.3s",
                }}
              >
                ENTER
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginTop: 10, textAlign: "center", fontSize: 10,
                    color: "rgba(255,80,80,0.6)", letterSpacing: "0.2em",
                    textTransform: "uppercase", fontFamily: "monospace",
                  }}
                >
                  ACCESS DENIED
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Vault Content ─────────────────────────────────────────────
  const items = [
    { tag: "DISPATCH", title: "The Architecture Thesis", sub: "Q1 2025 · Private Document", desc: "On why the next decade belongs to system architects — not product builders." },
    { tag: "INSIGHT", title: "AI Infrastructure Playbook", sub: "2025 · Strategic Memo", desc: "The frameworks being used to build cognitive infrastructure across three verticals." },
    { tag: "MEMO", title: "Digital Asset Position", sub: "Updated Q4 2024 · Restricted", desc: "The long-term thesis on sovereign value storage and why digital assets are foundational." },
    { tag: "SIGNAL", title: "The Next Move", sub: "2025 · Confidential", desc: "What's being built in the next 24 months. Geographic. Structural. Definitive." },
  ];

  function VaultContent() {
    return (
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        <section style={{
          position: "relative", minHeight: "100vh", background: "#000",
          padding: "160px 0 200px", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 55% at 50% 35%, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }} />
          <AmbientParticles count={40} />

          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 2 }}>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: 80 }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 28,
              }}>
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4AF37" }}
                />
                <span style={{
                  color: "rgba(212,175,55,0.4)", fontSize: 9,
                  letterSpacing: "0.55em", textTransform: "uppercase", fontFamily: "monospace",
                }}>
                  INNER CIRCLE — ACCESS GRANTED
                </span>
              </div>
              <h1 style={{
                fontSize: "clamp(52px, 7vw, 92px)",
                fontWeight: 300, letterSpacing: "-0.04em",
                color: "rgba(255,255,255,0.95)", lineHeight: 0.88, marginBottom: 24,
              }}>
                The Vault
              </h1>
              <p style={{
                color: "rgba(255,255,255,0.25)", fontSize: 15,
                fontWeight: 300, maxWidth: 380, lineHeight: 1.7,
              }}>
                Exclusive dispatches, strategic memos, and private signals
                for those inside the architecture.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{
                height: 1, background: "rgba(212,175,55,0.1)",
                transformOrigin: "left", marginBottom: 60,
              }}
            />

            {/* Items grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: "rgba(255,255,255,0.04)" }}>
              {items.map((item, i) => (
                <VaultItem key={i} {...item} index={i} />
              ))}
            </div>

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                marginTop: 80, paddingTop: 40,
                borderTop: "1px solid rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 16,
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.12)", fontSize: 10, letterSpacing: "0.3em", fontFamily: "monospace" }}>
                FAISAL ORAKZAI — INNER CIRCLE 2025
              </div>
              <div style={{ color: "rgba(212,175,55,0.2)", fontSize: 10, letterSpacing: "0.3em", fontFamily: "monospace" }}>
                CONFIDENTIAL — NOT FOR DISTRIBUTION
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  function VaultItem({ tag, title, sub, desc, index }: {
    tag: string; title: string; sub: string; desc: string; index: number;
  }) {
    const [hov, setHov] = useState(false);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "44px 40px",
          background: hov ? "rgba(212,175,55,0.025)" : "#000",
          cursor: "pointer",
          transition: "background 0.35s",
        }}
      >
        <div style={{
          fontSize: 8, letterSpacing: "0.55em", color: "rgba(212,175,55,0.35)",
          textTransform: "uppercase", fontFamily: "monospace", marginBottom: 20,
        }}>{tag}</div>
        <div style={{
          fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 300,
          color: hov ? "#fff" : "rgba(255,255,255,0.88)",
          letterSpacing: "-0.01em", marginBottom: 8,
          transition: "color 0.3s",
        }}>{title}</div>
        <div style={{
          fontSize: 10, color: "rgba(212,175,55,0.3)",
          letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 16,
        }}>{sub}</div>
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,0.25)",
          lineHeight: 1.7, fontWeight: 300,
        }}>{desc}</p>
        <motion.div
          animate={{ width: hov ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: 28, height: 1, background: "rgba(212,175,55,0.2)" }}
        />
      </motion.div>
    );
  }

  // ─── Main ─────────────────────────────────────────────────────
  export default function InnerCirclePage() {
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem("ic_unlocked");
        if (saved === "1") setUnlocked(true);
      }
    }, []);

    const handleUnlock = () => {
      sessionStorage.setItem("ic_unlocked", "1");
      setUnlocked(true);
    };

    return (
      <main style={{ position: "relative", background: "#000", minHeight: "100vh" }}>
        <AnimatePresence>
          {!unlocked && (
            <motion.div key="gate" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <GateScreen onUnlock={handleUnlock} />
            </motion.div>
          )}
        </AnimatePresence>
        {unlocked && (
          <motion.div key="vault" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <VaultContent />
          </motion.div>
        )}
      </main>
    );
  }