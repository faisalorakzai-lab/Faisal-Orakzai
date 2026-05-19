import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { PageTransition, FadeIn } from "@/components/PageTransition";

import heroPortrait1 from "@assets/863cbd10-4af0-11f1-be21-078bed17610e_1779198373998.png";

const Globe = React.lazy(() => import("@/components/Globe"));

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
              className="text-primary font-light tracking-wide text-sm md:text-base mb-8 uppercase"
            >
              Entrepreneur · Investor · System Builder
            </motion.p>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              className="h-[1px] w-16 bg-primary origin-left mb-8" 
            />
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="italic text-xl md:text-[22px] text-white/80 mb-8 font-serif"
            >
              "I build systems that shape industries."
            </motion.p>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-sm text-primary tracking-[0.2em] mb-12 uppercase"
            >
              AI. Digital Assets. Real Systems.
            </motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Link
                href="/thinking"
                className="inline-block border border-primary text-primary px-8 py-3 uppercase tracking-widest text-xs transition-all duration-300 hover:bg-primary hover:text-black hover:scale-105"
                data-testid="link-enter-vision"
              >
                Enter the Vision
              </Link>
            </motion.div>
          </motion.div>

          {/* Lazy loaded globe overlay */}
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
          <h2 className="text-2xl md:text-[36px] text-primary mb-6 leading-tight">From companies to systems.</h2>
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
            <h2 className="text-5xl md:text-6xl text-primary font-medium mb-12">Few build systems.</h2>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-16">
              I design structures that create and scale value.
            </p>
          </FadeIn>
          <FadeIn delay={0.7}>
            <p className="text-sm md:text-base text-white/40 italic font-serif">
              This is not business. This is system architecture.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 4 - Domains */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Artificial Intelligence", desc: "Automation-first thinking" },
              { title: "Digital Assets", desc: "Modern financial systems" },
              { title: "Real Assets", desc: "Long-term structured value" }
            ].map((domain, i) => (
              <div 
                key={domain.title} 
                className="group p-10 bg-black border border-primary/20 transition-all duration-500 hover:border-primary/60 hover:-translate-y-2 cursor-default flex flex-col justify-between min-h-[280px]"
              >
                <h3 className="text-primary text-xl md:text-2xl font-medium tracking-wide mb-8">{domain.title}</h3>
                <p className="text-white/60 text-sm md:text-base">{domain.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Section 5 - Execution */}
      <section className="py-40 px-6 bg-[#020202] text-center border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-5xl text-white mb-6">Ideas are everywhere.</h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h2 className="text-4xl md:text-6xl text-primary font-medium mb-12">Execution is rare.</h2>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="text-lg md:text-2xl text-white/70">
              I build with discipline — from concept to reality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 6 - Final */}
      <section className="py-48 px-6 text-center max-w-5xl mx-auto min-h-[60vh] flex flex-col items-center justify-center">
        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-[52px] text-white leading-tight mb-16">
            The future belongs to those who design systems.
          </h2>
        </FadeIn>
        <FadeIn delay={0.4}>
          <Link
            href="/systems"
            className="inline-block border border-primary text-primary px-10 py-4 uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:bg-primary hover:text-black hover:scale-105"
            data-testid="link-explore-ecosystem"
          >
            Explore the Ecosystem
          </Link>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
