"use client";
  import { useState, useEffect } from "react";
  import { motion } from "framer-motion";
  import Image from "next/image";
  import Link from "next/link";

  const links = [
    { href: "/#identity", label: "Identity" },
    { href: "/about", label: "About" },
    { href: "/#systems", label: "Systems" },
    { href: "/inner-circle", label: "Inner Circle", gold: true },
  ];

  export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const fn = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", fn, { passive: true });
      return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 40px",
          background: scrolled ? "rgba(0,0,0,0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
          transition: "all 0.5s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.2 }}>
            <Image
              src="/logo.png"
              alt="FO"
              width={32}
              height={32}
              style={{
                objectFit: "contain",
                filter: "hue-rotate(-75deg) saturate(0.85) brightness(1.2) drop-shadow(0 0 10px rgba(212,175,55,0.4))",
              }}
            />
          </motion.div>
          <span style={{
            color: "#D4AF37", fontSize: 11, letterSpacing: "0.35em",
            textTransform: "uppercase", fontWeight: 300,
          }}>
            Faisal Orakzai
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: l.gold ? "rgba(212,175,55,0.65)" : "rgba(255,255,255,0.35)",
                fontSize: 10, letterSpacing: "0.22em",
                textTransform: "uppercase", textDecoration: "none",
                transition: "color 0.3s",
                display: "flex", alignItems: "center", gap: 6,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = l.gold ? "#D4AF37" : "rgba(255,255,255,0.85)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = l.gold ? "rgba(212,175,55,0.65)" : "rgba(255,255,255,0.35)";
              }}
            >
              {l.gold && (
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: "rgba(212,175,55,0.5)", flexShrink: 0,
                }} />
              )}
              {l.label}
            </Link>
          ))}
        </nav>
      </motion.header>
    );
  }