import { useState } from "react";
import { PageTransition, FadeIn } from "@/components/PageTransition";
import { Shield, TrendingUp, Network } from "lucide-react";
import heroPortrait2 from "@assets/cb2f6e44-0710-492f-abc7-1c2c8d0bcea3_1779198430336.png";

export default function InnerCircle() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen text-white relative">
        <div className="fixed inset-0 pointer-events-none opacity-15">
          <img src={heroPortrait2} className="w-full h-full object-cover object-right" alt="Inner Circle Background" />
        </div>
        
        <div className="relative z-10 pt-40 pb-20 px-8 lg:px-16 max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
              THE INNER CIRCLE
            </div>
            <h1 className="font-['Playfair_Display'] text-[72px] leading-none mb-6">
              Exclusive Access.
            </h1>
            <p className="text-white/60 text-[20px] max-w-2xl leading-relaxed mb-20">
              Strategic alliances, high-level investment opportunities, and the Orakzai 2040 core matrix. Strictly by invitation or vetted application.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              { icon: Shield, title: "STRATEGIC ALLIANCES", text: "Direct collaboration within the Orakzai ecosystem and aligned ventures." },
              { icon: TrendingUp, title: "PRIVATE CAPITAL FLOWS", text: "Exclusive insights into RWA deployments, bond structures, and sovereign yield protocols." },
              { icon: Network, title: "FOUNDER'S NETWORK", text: "Direct connectivity to core leadership, vision, and strategic direction." }
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1} className="border-t border-[#D4AF37]/30 pt-6">
                <p.icon className="w-8 h-8 text-[#D4AF37] mb-6" />
                <h3 className="font-bold text-white mb-3">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.text}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="max-w-2xl bg-[rgba(255,255,255,0.02)] border border-[#D4AF37]/20 p-10 backdrop-blur-sm">
            <h2 className="text-[#D4AF37] tracking-widest text-sm uppercase mb-8 font-bold">SUBMIT APPLICATION</h2>
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-[#D4AF37] text-xl mb-4">Application Received.</div>
                <div className="text-white/50 text-sm">Your submission is under review by the executive team.</div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <input required placeholder="Full Name" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none placeholder:text-white/30" />
                <input required placeholder="Role / Institution (e.g., Investor, Partner, Founder)" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none placeholder:text-white/30" />
                <input required type="email" placeholder="Direct Contact Email" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none placeholder:text-white/30" />
                <textarea required placeholder="Why do you seek access? What do you bring to the ecosystem?" rows={4} minLength={50} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none placeholder:text-white/30 resize-none" />
                
                <button type="submit" className="w-full border border-[#D4AF37] text-[#D4AF37] py-4 uppercase tracking-[0.15em] text-sm hover:bg-[#D4AF37] hover:text-black transition-colors mt-4">
                  SUBMIT FOR REVIEW
                </button>
              </form>
            )}
            <div className="text-center text-white/30 text-xs mt-8">
              Membership to the inner circle is a responsibility. We prioritize alignment of vision and institutional impact.
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}