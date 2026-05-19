import { useState } from "react";
import { PageTransition, FadeIn } from "@/components/PageTransition";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatStatus, setChatStatus] = useState("Initializing secure channel... Processing your inquiry. Please describe your purpose.");

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(message.trim()) {
      setChatStatus("Message routed to executive team.");
      setMessage("");
    }
  }

  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen text-white relative pb-32">
        <div className="pt-40 px-8 lg:px-16 max-w-6xl mx-auto mb-20">
          <FadeIn>
            <h1 className="font-bold text-[64px] mb-4">EXECUTIVE OFFICE</h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Direct lines to the Orakzai Group leadership. All communications are monitored and prioritized by the autonomous AI assistant.
            </p>
          </FadeIn>
        </div>

        <div className="px-8 lg:px-16 max-w-6xl mx-auto mb-32">
          <FadeIn delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { l: "OPERATIONS", v: "team@faisalorakzai.com" },
              { l: "CHAIRMAN DIRECT", v: "chairman@faisalorakzai.com" },
              { l: "WHATSAPP", v: "+92 336 7970004", isWa: true }
            ].map((c, i) => (
              <div key={i} className="border-t border-[#D4AF37]/30 pt-6">
                <div className="text-[#D4AF37]/60 uppercase text-[10px] tracking-widest mb-2 flex items-center justify-between">
                  {c.l}
                  <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"/><span className="text-green-500">VERIFIED</span></div>
                </div>
                {c.isWa ? (
                  <a href="https://wa.me/923367970004" target="_blank" rel="noreferrer" className="text-white text-lg flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                    <FaWhatsapp className="text-[#D4AF37]" /> {c.v}
                  </a>
                ) : (
                  <div className="text-white text-lg">{c.v}</div>
                )}
              </div>
            ))}
          </FadeIn>
        </div>

        <div className="px-8 lg:px-16 max-w-2xl mx-auto">
          <FadeIn delay={0.4}>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[#D4AF37]/20 p-10">
              <h2 className="text-[#D4AF37] tracking-widest text-sm uppercase mb-8 font-bold">PRIORITY FORM</h2>
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <input required placeholder="Name" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none placeholder:text-white/30" />
                <select className="w-full bg-transparent border-b border-white/20 pb-3 text-white/80 focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none appearance-none">
                  <option value="" disabled selected>Inquiry Type</option>
                  <option className="bg-[#050505]">Investment</option>
                  <option className="bg-[#050505]">Partnership</option>
                  <option className="bg-[#050505]">Media</option>
                  <option className="bg-[#050505]">Personal</option>
                </select>
                <input required type="email" placeholder="Contact Info (Email/Phone)" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors rounded-none placeholder:text-white/30" />
                <button type="submit" className="w-full border border-[#D4AF37] text-[#D4AF37] py-4 uppercase tracking-[0.15em] text-sm hover:bg-[#D4AF37] hover:text-black transition-colors mt-4">
                  DISPATCH TO OFFICE
                </button>
              </form>
            </div>
            <div className="text-center mt-12">
              <div className="text-white/50 text-sm mb-2">Office Hours: 24/7 Global Infrastructure Monitoring.</div>
              <div className="text-white/30 text-xs">All incoming communications are analyzed by proprietary OrakzaiX intelligence protocols to ensure efficient resource allocation.</div>
            </div>
          </FadeIn>
        </div>

        {/* AI Assistant Widget */}
        <div className="fixed bottom-12 right-6 z-50 flex flex-col items-end">
          {chatOpen && (
            <div className="w-[320px] bg-[#050505] border border-[#D4AF37]/30 mb-4 flex flex-col shadow-2xl animate-in slide-in-from-bottom-5">
              <div className="bg-[#0a0a0a] border-b border-[#D4AF37]/30 p-3">
                <div className="font-mono text-[#D4AF37] text-xs">ORAKZAI AI // ACTIVE</div>
              </div>
              <div className="p-4 h-32 font-mono text-sm text-white/70 overflow-y-auto">
                <span className="animate-pulse">&gt; </span>{chatStatus}
              </div>
              <form onSubmit={handleChatSubmit} className="border-t border-[#D4AF37]/30 p-2 flex bg-[#0a0a0a]">
                <input 
                  value={message} onChange={e => setMessage(e.target.value)}
                  className="w-full bg-transparent font-mono text-sm text-white focus:outline-none placeholder:text-white/30 px-2"
                  placeholder=">_ Type your message..."
                />
              </form>
            </div>
          )}
          <button 
            onClick={() => setChatOpen(!chatOpen)}
            className="w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors shadow-lg"
          >
            <span className="font-mono text-xl">&gt;</span>
          </button>
        </div>

      </div>
    </PageTransition>
  );
}