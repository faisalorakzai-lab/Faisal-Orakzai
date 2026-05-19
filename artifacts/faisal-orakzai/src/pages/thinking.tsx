import { PageTransition, FadeIn } from "@/components/PageTransition";

export default function Thinking() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050505] text-white">
        {/* Section 1 — Hero */}
        <section className="pt-40 pb-20 relative px-8 lg:px-16 flex flex-col items-center">
          <div className="w-full max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
                THE SOVEREIGN MINDSET
              </div>
              <h1 className="font-['Playfair_Display'] text-[72px] text-white leading-tight mb-8">
                Think in Systems.
              </h1>
              <p className="text-white/60 text-[20px] max-w-2xl leading-relaxed">
                The mental models and operating principles I use to build systems, orchestrate capital, and scale the Orakzai Group towards our 2040 global matrix.
              </p>
            </FadeIn>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mt-20" />
        </section>

        {/* Section 2 — 4 Mental Models */}
        <section className="py-20 px-8 lg:px-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { num: "01", title: "System Thinking", text: "I don't look at isolated variables. I build interconnected engines where every division feeds the other." },
              { num: "02", title: "Leverage", text: "Maximizing output while minimizing friction. I use AI and autonomous systems for heavy lifting, reserving human effort for strategic orchestration." },
              { num: "03", title: "Scale", text: "I design structures capable of non-linear expansion, detaching growth from physical time constraints." },
              { num: "04", title: "Execution", text: "Vision is irrelevant without deployment. Speed and ruthless execution are my ultimate competitive advantages." }
            ].map((model, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 p-10 transition-all duration-500 h-full flex flex-col">
                  <div className="text-[#D4AF37]/40 text-xs font-mono mb-6">{model.num}</div>
                  <h3 className="text-white text-2xl mb-4 font-medium">{model.title}</h3>
                  <p className="text-white/60 leading-relaxed flex-1">{model.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Section 3 — Personal Directive */}
        <section className="py-32 px-8 flex justify-center text-center">
          <FadeIn className="max-w-4xl w-full">
            <div className="w-full h-[1px] bg-[#D4AF37]/20 mb-16" />
            <blockquote className="font-['Playfair_Display'] italic text-[36px] text-white leading-snug mb-8">
              "I build ecosystems, not just products. The goal isn't to participate in the future — it's to architect it."
            </blockquote>
            <div className="text-[#D4AF37] tracking-widest uppercase text-sm">
              — Faisal Orakzai
            </div>
            <div className="w-full h-[1px] bg-[#D4AF37]/20 mt-16" />
          </FadeIn>
        </section>
      </div>
    </PageTransition>
  );
}