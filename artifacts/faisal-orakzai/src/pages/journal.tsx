import { useState } from "react";
import { PageTransition, FadeIn } from "@/components/PageTransition";

export default function Journal() {
  const [filter, setFilter] = useState("ALL");

  const allEntries = [
    { id: 1, date: "19 MAY 2026", category: "STRATEGY", status: "PUBLIC", title: "The Architecture of Sovereign Capital", body: "Capital, at its highest expression, is not money — it is structured leverage. The OKBOND framework represents a fundamental re-engineering of how yield, trust, and liquidity interact in a sovereign context." },
    { id: 2, date: "12 MAY 2026", category: "ECOSYSTEM", status: "PUBLIC", title: "OrakzaiX: The Autonomous Layer", body: "The deployment of Adam AI marks the first phase of full autonomous orchestration. Human decisions are now reserved for strategy; execution is automated." },
    { id: 3, date: "05 MAY 2026", category: "PHILOSOPHY", status: "PUBLIC", title: "Why Systems Always Beat Products", body: "A product solves one problem. A system creates an ecosystem of solutions. The difference in scale between these two paradigms is not linear — it is exponential." },
    { id: 4, date: "28 APR 2026", category: "PERSONAL", status: "INTERNAL", title: "On Building Quietly", body: "The most powerful moves are made in silence. The market rewards patience. Discipline in the absence of validation is the rarest form of strength." },
    { id: 5, date: "20 APR 2026", category: "STRATEGY", status: "PUBLIC", title: "Real Assets in a Digital World", body: "Physical infrastructure retains value when digital systems fluctuate. Orakzai Properties is not just real estate — it is a sovereign reserve network." },
    { id: 6, date: "10 APR 2026", category: "ECOSYSTEM", status: "PUBLIC", title: "The 12 Pillars Framework", body: "Every division of Orakzai Group feeds the next. Capital flows from finance to technology to infrastructure — a perpetual engine with no single point of failure." },
    { id: 7, date: "01 APR 2026", category: "PHILOSOPHY", status: "PUBLIC", title: "Execution is the Only Strategy", body: "Every founder has ideas. The differentiator is the capacity to execute with precision under pressure. Discipline is the strategy." },
    { id: 8, date: "25 MAR 2026", category: "PERSONAL", status: "INTERNAL", title: "The Promise That Built an Empire", body: "Shamim Forever was not born from a business plan. It was born from a promise to turn personal grief into something that outlasts its origin." }
  ];

  const filteredEntries = filter === "ALL" ? allEntries : allEntries.filter(e => e.category === filter);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050505] text-white pb-32">
        <div className="pt-40 px-8 lg:px-16 max-w-4xl mx-auto mb-16">
          <FadeIn>
            <h1 className="font-bold text-[64px] mb-4 tracking-tight">STRATEGIC LOG</h1>
            <p className="text-white/50 text-lg mb-12">
              Real-time documentation of mental models, ecosystem updates, and the 2040 mission.
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm tracking-widest uppercase">
              {["ALL", "STRATEGY", "ECOSYSTEM", "PHILOSOPHY", "PERSONAL"].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`pb-1 transition-all ${filter === f ? 'text-[#D4AF37] border-b border-[#D4AF37]' : 'text-white/40 border-b border-transparent hover:text-white/80'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto px-8 lg:px-16">
          <div className="border-l border-[#D4AF37]/30 pl-8 space-y-12">
            {filteredEntries.map((entry, i) => (
              <FadeIn key={entry.id} delay={i * 0.05} className="relative">
                <div className="absolute -left-[37px] top-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
                <div className="text-xs font-mono mb-2">
                  <span className="text-white/60">{entry.date}</span>
                  <span className="text-white/30 mx-2">—</span>
                  <span className="text-[#D4AF37]">{entry.category}</span>
                  <span className="text-white/30 mx-2">—</span>
                  <span className={entry.status === 'PUBLIC' ? 'text-white/40' : 'text-yellow-500/60'}>STATUS: {entry.status}</span>
                </div>
                <h2 className="text-[22px] font-semibold text-white mb-4 group inline-block cursor-pointer">
                  <span className="hover:underline decoration-[#D4AF37] underline-offset-4">{entry.title}</span>
                </h2>
                <p className="text-white/60 text-[16px] italic leading-relaxed max-w-2xl">
                  {entry.body}
                </p>
                <div className="h-[1px] w-full bg-white/5 mt-12" />
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.4} className="mt-24 text-center">
            <div className="font-mono text-[#D4AF37]/40 text-sm">
              END OF LOG // LOG.ID: ORZ-STRATEGY-2026
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}