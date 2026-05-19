import { PageTransition, FadeIn } from "@/components/PageTransition";

export default function Systems() {
  const systems = [
    {
      id: "SYS.01",
      title: "ARTIFICIAL INTELLIGENCE",
      desc: "Autonomous business orchestration, market analysis, and proprietary intelligence models.",
      tag: "// OrakzaiX & Adam AI"
    },
    {
      id: "SYS.02",
      title: "DIGITAL ASSETS & DEFI",
      desc: "Next-generation blockchain infrastructure, sovereign liquidity protocols, and RWA tokenization.",
      tag: "// Orakzai Bond / PSC Exchange"
    },
    {
      id: "SYS.03",
      title: "REAL ASSETS",
      desc: "Physical infrastructure integrated with 3D urban intelligence and fractionalized ownership models.",
      tag: "// Orakzai Properties"
    },
    {
      id: "SYS.04",
      title: "CAPITAL ORCHESTRATION",
      desc: "The master control system routing resources and leverage across multi-sector divisions.",
      tag: "// Ecosystem Level"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050505] text-white pb-32">
        <div className="pt-40 px-8 lg:px-16 max-w-5xl mx-auto mb-20">
          <FadeIn>
            <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
              INFRASTRUCTURE
            </div>
            <h1 className="font-bold text-[64px] tracking-wide mb-6 leading-tight">
              SYSTEMS DEPLOYED
            </h1>
            <p className="text-white/50 text-[18px] max-w-2xl leading-relaxed">
              The tangible infrastructure powering the 2040 vision. Not isolated companies — interconnected digital and physical engines.
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col w-full">
          {systems.map((sys, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group w-full border-b border-[#D4AF37]/10 bg-[rgba(5,5,5,1)] hover:bg-[#0a0a0a] hover:border-[#D4AF37]/40 transition-all duration-500 ease-out px-8 lg:px-16 py-12 flex flex-col md:flex-row items-start md:items-center gap-8 relative">
                <div className="text-[#D4AF37]/40 font-mono w-24 shrink-0">{sys.id}</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-[28px] mb-2">{sys.title}</h3>
                  <p className="text-white/60 mb-4">{sys.desc}</p>
                  <div className="text-[#D4AF37]/50 font-mono text-xs">{sys.tag}</div>
                </div>
                <div className="text-[#D4AF37] text-3xl opacity-0 transform -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block">
                  →
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}