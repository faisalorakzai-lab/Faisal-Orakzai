import { PageTransition, FadeIn } from "@/components/PageTransition";
import thinkingPortrait from "@assets/ba912146-d692-413e-b031-37a9e5edce39_1779198430297.png";

export default function Thinking() {
  return (
    <PageTransition>
      <div className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-black overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image */}
        <div 
          className="fixed inset-0 z-0 opacity-[0.08] pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${thinkingPortrait})` }}
        />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <FadeIn className="text-center mb-24">
            <div className="text-primary text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">
              THINKING
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-tight mb-8">
              Everything operates as a system.
            </h1>
            
            <p className="text-xl md:text-[24px] text-white/70 max-w-3xl mx-auto mb-6">
              Markets, industries, and businesses are interconnected structures.
            </p>
            
            <p className="text-lg md:text-[20px] text-white/60 max-w-3xl mx-auto">
              Understanding systems creates leverage. Designing them creates control.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-px bg-white/5 p-px mb-32">
            {[
              { id: "01", title: "System Thinking", desc: "Seeing the whole, not the parts." },
              { id: "02", title: "Leverage", desc: "Maximum output, minimum friction." },
              { id: "03", title: "Scale", desc: "Growth without linear effort." },
              { id: "04", title: "Execution", desc: "Turning theory into structure." }
            ].map((principle, i) => (
              <FadeIn key={principle.id} delay={0.2 + (i * 0.1)} className="bg-black p-8 lg:p-10 flex flex-col">
                <span className="text-primary font-mono text-sm tracking-widest mb-6">
                  {principle.id}
                </span>
                <h3 className="text-white text-xl font-medium tracking-wide mb-4">
                  {principle.title}
                </h3>
                <p className="text-white/40 text-sm mt-auto">
                  {principle.desc}
                </p>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.8} className="text-center">
            <blockquote className="text-3xl md:text-[40px] text-primary italic font-serif">
              "I build ecosystems, not products."
            </blockquote>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
