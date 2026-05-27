"use client";
  import { motion } from "framer-motion";
  import { useState, useEffect } from "react";
  import Image from "next/image";

  export function CinematicLoader({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
      const t = [
        setTimeout(() => setPhase(1), 200),
        setTimeout(() => setPhase(2), 900),
        setTimeout(() => setPhase(3), 1700),
        setTimeout(() => setPhase(4), 2500),
        setTimeout(() => setDone(true), 3100),
        setTimeout(() => onComplete(), 3600),
      ];
      return () => t.forEach(clearTimeout);
    }, [onComplete]);

    if (done) return null;

    return (
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 9999, background: "#000",
          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
        }}
      >
        {/* Scan line */}
        <motion.div
          initial={{ top: "-4px", opacity: 0 }}
          animate={phase >= 1 ? { top: "110%", opacity: [0, 0.5, 0.3, 0] } : {}}
          transition={{ duration: 2.5, ease: "linear" }}
          style={{
            position: "absolute", left: 0, right: 0, height: "2px",
            background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)",
          }}
        />

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Corner brackets */}
        {phase >= 1 && (
          <>
            {[
              { top: 28, left: 28, borderTop: "1px solid", borderLeft: "1px solid" },
              { top: 28, right: 28, borderTop: "1px solid", borderRight: "1px solid" },
              { bottom: 28, left: 28, borderBottom: "1px solid", borderLeft: "1px solid" },
              { bottom: 28, right: 28, borderBottom: "1px solid", borderRight: "1px solid" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  position: "absolute", width: 22, height: 22,
                  borderColor: "rgba(212,175,55,0.3)", ...s,
                }}
              />
            ))}
          </>
        )}

        {/* Center content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
            animate={phase >= 2 ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
          >
            <Image
              src="/logo.png"
              alt="FO"
              width={88}
              height={88}
              style={{
                objectFit: "contain",
                filter: "hue-rotate(-75deg) saturate(0.85) brightness(1.2) drop-shadow(0 0 30px rgba(212,175,55,0.5))",
              }}
              priority
            />
            {phase >= 2 && (
              <motion.div
                animate={{ scale: [1, 3.2], opacity: [0.4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute", inset: -4, borderRadius: "50%",
                  border: "1px solid rgba(212,175,55,0.15)",
                }}
              />
            )}
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center" }}
          >
            <div style={{
              color: "#D4AF37", letterSpacing: "0.6em", fontSize: 11,
              fontWeight: 300, textTransform: "uppercase", marginBottom: 10,
            }}>
              FAISAL ORAKZAI
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={phase >= 3 ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.15 }}
              style={{
                height: 1,
                background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)",
              }}
            />
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 4 ? { opacity: 1 } : {}}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4AF37" }}
            />
            <span style={{
              color: "rgba(212,175,55,0.4)", fontSize: 9,
              letterSpacing: "0.5em", textTransform: "uppercase", fontFamily: "monospace",
            }}>
              SYSTEM ONLINE
            </span>
          </motion.div>
        </div>

        {/* Fade out overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: [0, 0, 1] } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ position: "absolute", inset: 0, background: "#000", pointerEvents: "none" }}
        />
      </div>
    );
  }