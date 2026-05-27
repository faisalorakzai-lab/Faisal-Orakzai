import React, { useRef, useEffect, useState } from "react";
  import { motion, useScroll, useTransform, useInView } from "framer-motion";
  import { Link } from "wouter";

  import heroPortrait from "@assets/863cbd10-4af0-11f1-be21-078bed17610e_1779198373998.png";

  // ─── Ambient Particles ────────────────────────────────────────
  function ParticleField() {
    const particles = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.4 + 0.5,
      dur: Math.random() * 9 + 7,
      delay: Math.random() * 6,
      drift: (Math.random() - 0.5) * 28,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#C9A84C]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, p.drift * 3, 0], x: [0, p.drift, 0], opacity: [0, 0.45, 0.2, 0.55, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`s${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#C9A84C]/15 to-transparent"
            style={{ top: `${18 + i * 28}%`, width: "45%" }}
            animate={{ x: ["-100%", "260%"], opacity: [0, 0.8, 0] }}
            transition={{ duration: 5 + i * 1.8, delay: i * 3.5 + 1, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
    );
  }

  // ─── Scroll Reveal ────────────────────────────────────────────
  function Reveal({
    children,
    delay = 0,
    className = "",
  }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-12%" });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // ─── Magnetic CTA Button ──────────────────────────────────────
  function MagneticButton({ href, label }: { href: string; label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMove = (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({
        x: (e.clientX - rect.left - rect.width / 2) * 0.16,
        y: (e.clientY - rect.top - rect.height / 2) * 0.16,
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setPos({ x: 0, y: 0 }); }}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="inline-block"
      >
        <Link href={href} className="relative inline-block group overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-[#C9A84C]"
            animate={{ x: hover ? "0%" : "-102%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          />
          <span
            className="relative border border-[#C9A84C]/55 px-8 py-3.5 text-[11px] tracking-[0.42em] uppercase font-medium flex items-center gap-3 transition-colors duration-[350ms]"
            style={{ color: hover ? "#000" : "#C9A84C" }}
          >
            {label}
            <motion.span animate={{ x: hover ? 4 : 0 }} transition={{ duration: 0.2 }}>
              →
            </motion.span>
          </span>
        </Link>
      </motion.div>
    );
  }

  // ─── Hero ─────────────────────────────────────────────────────
  function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -35]);
    const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    useEffect(() => {
      const h = (e: MouseEvent) =>
        setCursor({ x: (e.clientX / window.innerWidth - 0.5) * 18, y: (e.clientY / window.innerHeight - 0.5) * 18 });
      window.addEventListener("mousemove", h, { passive: true });
      return () => window.removeEventListener("mousemove", h);
    }, []);

    return (
      <section
        ref={containerRef}
        className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-black"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 60% at 60% 50%, #0d0a00 0%, #000 70%)" }}
          />
          <ParticleField />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>

        {/* Portrait */}
        <motion.div
          style={{ y: portraitY }}
          className="w-full lg:w-[52%] relative overflow-hidden h-[64vh] lg:h-screen z-10 shrink-0"
        >
          <motion.img
            src={heroPortrait}
            alt="Faisal Orakzai"
            className="w-full h-full object-cover object-center portrait-breath"
            style={{ x: cursor.x * 0.25, y: cursor.y * 0.18 }}
          />
          {/* Mask fade right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, transparent 50%, black 100%)",
            }}
          />
          {/* Mask fade bottom mobile */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-black/60 to-transparent lg:hidden pointer-events-none" />
          {/* Gold rim edge */}
          <div className="absolute right-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-[#C9A84C]/18 to-transparent" />
        </motion.div>

        {/* Text panel */}
        <motion.div
          style={{ y: textY, opacity: fadeOut }}
          className="w-full lg:w-[48%] flex items-center justify-start px-8 py-14 lg:px-14 xl:px-20 lg:py-0 z-20 relative lg:absolute lg:right-0 lg:inset-y-0"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.4 } },
            }}
            className="max-w-xl w-full"
          >
            {/* Live indicator */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
              className="flex items-center gap-2 mb-10"
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
              <span className="text-[#C9A84C]/45 text-[9px] tracking-[0.5em] uppercase font-mono">
                SYSTEM ACTIVE
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
              className="font-light leading-[0.88] mb-6 text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(52px, 7vw, 80px)",
                letterSpacing: "-0.025em",
              }}
            >
              FAISAL
              <br />
              <span
                style={{
                  color: "#C9A84C",
                  textShadow: "0 0 50px rgba(201,168,76,0.25), 0 0 100px rgba(201,168,76,0.08)",
                }}
              >
                ORAKZAI
              </span>
            </motion.h1>

            {/* Gold line */}
            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
              className="h-px w-12 bg-[#C9A84C]/55 origin-left mb-6"
            />

            {/* Role */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
              className="text-white/40 text-xs tracking-[0.3em] uppercase mb-8 font-light"
            >
              Entrepreneur · Investor · System Builder
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
              className="text-white/80 font-light leading-snug mb-3"
              style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              I build systems
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
              className="text-white/30 font-light leading-snug mb-12"
              style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              that shape industries.
            </motion.p>

            {/* CTA */}
            <motion.div variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
              <MagneticButton href="/thinking" label="ENTER THE VISION" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none"
        >
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/35 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>
    );
  }

  // ─── Manifesto ────────────────────────────────────────────────
  function ManifestoSection() {
    const words = [
      { text: "The world is", gold: false },
      { text: "shifting.", gold: true },
      { text: "Power moves", gold: false },
      { text: "to builders.", gold: false },
    ];

    return (
      <section className="relative py-36 lg:py-56 bg-black overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 50% at 65% 45%, rgba(201,168,76,0.04) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="max-w-5xl">
            {words.map((w, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className="leading-[0.86] mb-2 font-light"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(50px, 8vw, 108px)",
                    letterSpacing: "-0.035em",
                    color: w.gold ? "#C9A84C" : "rgba(255,255,255,0.9)",
                  }}
                >
                  {w.text}
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.55} className="mt-14">
              <p className="text-white/30 text-base lg:text-lg font-light max-w-sm leading-relaxed">
                Most entrepreneurs compete within existing systems. Few understand how to architect the systems themselves.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  // ─── Philosophy ───────────────────────────────────────────────
  const philosophyBlocks = [
    {
      index: "01",
      title: "Most build products.",
      sub: "I build operating systems for industries.",
      body: "Products get replaced. Systems endure. Every venture is designed to become foundational infrastructure — not another product in a crowded market.",
    },
    {
      index: "02",
      title: "Most think local.",
      sub: "I think in global architectures.",
      body: "Geography is a limitation for those who think small. Every system I build is designed for scale — from day one, from anywhere, for everywhere.",
    },
    {
      index: "03",
      title: "Most react to change.",
      sub: "I build the change.",
      body: "AI. Digital assets. Sovereign identity. These are the new foundations. I position before the wave — not after it breaks.",
    },
  ];

  function PhilosophyRow({ index, title, sub, body, delay }: (typeof philosophyBlocks)[0] & { delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });
    const [hovered, setHovered] = useState(false);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[90px_1fr_1fr] gap-6 lg:gap-14 border-b border-white/5 cursor-default"
      >
        <div className="text-[#C9A84C]/22 text-[10px] tracking-[0.35em] font-mono pt-1.5">{index}</div>
        <div>
          <div
            className="text-white/88 text-2xl lg:text-[28px] font-light mb-2 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.01em" }}
          >
            {title}
          </div>
          <div className="text-[#C9A84C]/65 text-base font-light">{sub}</div>
        </div>
        <motion.p
          animate={{ opacity: hovered ? 1 : 0.35 }}
          transition={{ duration: 0.35 }}
          className="text-white/50 text-sm leading-relaxed font-light self-center"
        >
          {body}
        </motion.p>
      </motion.div>
    );
  }

  function PhilosophySection() {
    return (
      <section className="relative py-36 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <Reveal className="mb-20">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-[#C9A84C]/35" />
              <span className="text-[#C9A84C]/40 text-[9px] tracking-[0.55em] uppercase font-mono">Philosophy</span>
            </div>
          </Reveal>
          <div>
            {philosophyBlocks.map((b, i) => (
              <PhilosophyRow key={i} {...b} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── What I Build ─────────────────────────────────────────────
  const systemsData = [
    { label: "AI Infrastructure", desc: "Cognitive layers for the next wave of intelligent systems and decision architectures." },
    { label: "Digital Assets", desc: "Sovereign financial instruments beyond traditional market structures." },
    { label: "Real Systems", desc: "Physical-digital integration. Tangible value engineered at global scale." },
    { label: "Identity Systems", desc: "Sovereign identity in the age of AI. True ownership of self and data." },
  ];

  function SystemsSection() {
    return (
      <section className="relative py-36 bg-black">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <Reveal className="mb-16">
            <h2
              className="font-light text-white/92 tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.03em",
              }}
            >
              What I build.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.04]">
            {systemsData.map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="group p-10 lg:p-14 bg-black hover:bg-[#C9A84C]/[0.025] transition-all duration-500 cursor-default">
                  <div className="text-[#C9A84C]/28 text-[10px] tracking-[0.45em] uppercase mb-6 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="text-white/88 text-xl font-light mb-4 group-hover:text-white transition-colors duration-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {s.label}
                  </div>
                  <div className="text-white/32 text-sm leading-relaxed font-light">{s.desc}</div>
                  <motion.div
                    className="mt-8 h-px bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C]/35 to-[#C9A84C]/0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: i * 0.08 }}
                    viewport={{ once: true }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Closing CTA ──────────────────────────────────────────────
  function ClosingSection() {
    return (
      <section className="relative py-52 lg:py-72 bg-black overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(201,168,76,0.045) 0%, transparent 70%)" }}
        />
        <ParticleField />
        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <Reveal>
            <div className="text-[#C9A84C]/35 text-[9px] tracking-[0.7em] uppercase mb-8 font-mono">
              The Vision
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-light text-white/95 leading-[0.86] mb-14"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(48px, 7vw, 92px)",
                letterSpacing: "-0.035em",
              }}
            >
              This is not
              <br />
              <span style={{ color: "#C9A84C" }}>the beginning.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-white/30 text-base lg:text-lg font-light mb-14 max-w-sm mx-auto leading-relaxed">
              It is a checkpoint in an already moving system. The architecture is already in motion.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticButton href="/thinking" label="EXPLORE THINKING" />
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-3.5 text-[11px] tracking-[0.42em] uppercase text-white/28 hover:text-white/65 transition-colors duration-300 border border-white/8 hover:border-white/18"
              >
                OPEN A CHANNEL
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // ─── Home ─────────────────────────────────────────────────────
  export default function Home() {
    return (
      <main className="bg-black">
        <HeroSection />
        <ManifestoSection />
        <PhilosophySection />
        <SystemsSection />
        <ClosingSection />
      </main>
    );
  }