import React, { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { PageTransition, FadeIn } from "@/components/PageTransition";

import heroPortrait1 from "@assets/863cbd10-4af0-11f1-be21-078bed17610e_1779198373998.png";

const Globe = React.lazy(() => import("@/components/Globe"));

function TerminalAnim() {
  const lines = ["// OKBOND.LOAD()", ">> LEDGER.SYNC: OK", ">> CHAIN.STATUS: LIVE", ">> YIELD: OPTIMAL"];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % lines.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 font-mono text-[#D4AF37] text-xs space-y-1 h-20">
      {lines.slice(0, idx + 1).map((line, i) => (
        <div key={i} className="animate-in fade-in zoom-in">{line}</div>
      ))}
      <div className="animate-pulse">_</div>
    </div>
  );
}

export default function Home() {
  return (
    <PageTransition>
      {/* Section 1 - Hero */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden pt-20 lg:pt-0">
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative z-10">
          <img
            src={heroPortrait1}
            alt="Faisal Orakzai"
            className="w-full h-full object-cover"
            style={{ maskImage: "linear-gradient(to right, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, black 80%, transparent 100%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 z-20 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className="max-w-xl w-full"
          >
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-4xl md:text-6xl lg:text-[64px] font-bold tracking-[0.15em] text-white leading-tight mb-4"
            >
              FAISAL ORAKZAI
            </motion.h1>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-[#D4AF37] font-light tracking-wide text-sm md:text-base mb-8 uppercase"
            >
              Entrepreneur · Investor · System Builder
            </motion.p>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              className="h-[1px] w-16 bg-[#D4AF37] origin-left mb-8" 
            />
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="italic text-xl md:text-[22px] text-white/80 mb-8 font-['Playfair_Display']"
            >
              "I build systems that shape industries."
            </motion.p>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-sm text-[#D4AF37] tracking-[0.2em] mb-12 uppercase"
            >
              AI. Digital Assets. Real Systems.
            </motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Link
                href="/thinking"
                className="inline-block border border-[#D4AF37] text-[#D4AF37] px-8 py-3 uppercase tracking-widest text-xs transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:scale-105"
                data-testid="link-enter-vision"
              >
                Enter the Vision
              </Link>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-10 right-10 z-0 pointer-events-none opacity-50 hidden md:block">
            <Suspense fallback={null}>
              <Globe />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Section 2 - Transition */}
      <section className="py-32 px-6 flex flex-col items-center justify-center text-center max-w-4xl mx-auto min-h-[60vh]">
        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-[48px] text-white mb-6 leading-tight">The world is shifting.</h2>
        </FadeIn>
        <FadeIn delay={0.3}>
          <h2 className="text-2xl md:text-[36px] text-[#D4AF37] mb-6 leading-tight">From companies to systems.</h2>
        </FadeIn>
        <FadeIn delay={0.5}>
          <h2 className="text-2xl md:text-[36px] text-white mb-10 leading-tight">From effort to leverage.</h2>
        </FadeIn>
        <FadeIn delay={0.7}>
          <p className="text-lg md:text-[24px] text-white/50">I focus where these shifts converge.</p>
        </FadeIn>
      </section>

      {/* Section 3 - Philosophy */}
      <section className="py-32 px-6 bg-[#030303] border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col justify-center min-h-[50vh]">
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl text-white mb-4">Most build products.</h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h2 className="text-5xl md:text-6xl text-[#D4AF37] font-medium mb-12">Few build systems.</h2>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-16">
              I design structures that create and scale value.
            </p>
          </FadeIn>
          <FadeIn delay={0.7}>
            <p className="text-sm md:text-base text-white/40 italic font-['Playfair_Display']">
              This is not business. This is system architecture.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 4 - Domains */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* AI Card */}
            <div className="group p-10 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border border-[#D4AF37]/20 transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] cursor-default flex flex-col justify-between min-h-[280px]">
              <div>
                <h3 className="text-[#D4AF37] text-xl md:text-2xl font-medium tracking-wide mb-4">Artificial Intelligence</h3>
                <p className="text-white/60 text-sm md:text-base">Automation-first thinking</p>
              </div>
              <div className="mt-8 flex justify-center">
                <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-80">
                  <motion.g animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 3 }}>
                    <line x1="20" y1="50" x2="50" y2="20" stroke="#D4AF37" strokeWidth="2" />
                    <line x1="20" y1="50" x2="50" y2="80" stroke="#D4AF37" strokeWidth="2" />
                    <line x1="50" y1="20" x2="80" y2="50" stroke="#D4AF37" strokeWidth="2" />
                    <line x1="50" y1="80" x2="80" y2="50" stroke="#D4AF37" strokeWidth="2" />
                    <circle cx="20" cy="50" r="5" fill="#D4AF37" />
                    <circle cx="50" cy="20" r="5" fill="#D4AF37" />
                    <circle cx="50" cy="80" r="5" fill="#D4AF37" />
                    <circle cx="80" cy="50" r="5" fill="#D4AF37" />
                  </motion.g>
                </svg>
              </div>
            </div>

            {/* Digital Assets Card */}
            <div className="group p-10 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border border-[#D4AF37]/20 transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] cursor-default flex flex-col justify-between min-h-[280px]">
              <div>
                <h3 className="text-[#D4AF37] text-xl md:text-2xl font-medium tracking-wide mb-4">Digital Assets</h3>
                <p className="text-white/60 text-sm md:text-base">Modern financial systems</p>
              </div>
              <TerminalAnim />
            </div>

            {/* Real Assets Card */}
            <div 
              className="group p-10 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border border-[#D4AF37]/20 transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] cursor-default flex flex-col justify-between min-h-[280px] relative overflow-hidden"
            >
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(212,175,55,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.2) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
              <div className="relative z-10">
                <h3 className="text-[#D4AF37] text-xl md:text-2xl font-medium tracking-wide mb-4">Real Assets</h3>
                <p className="text-white/60 text-sm md:text-base">Long-term structured value</p>
              </div>
            </div>

          </div>
        </FadeIn>
      </section>

      {/* Section 5 - Execution */}
      <section className="py-40 px-6 bg-[#020202] text-center border-y border-white/5 pb-52">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-5xl text-white mb-6">Ideas are everywhere.</h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h2 className="text-4xl md:text-6xl text-[#D4AF37] font-medium mb-12 font-['Playfair_Display']">Execution is rare.</h2>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="text-lg md:text-2xl text-white/70">
              I build with discipline — from concept to reality.
            </p>
          </FadeIn>
        </div>
      </section>

    </PageTransition>
  );
}