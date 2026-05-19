import { useState } from "react";
import { PageTransition, FadeIn } from "@/components/PageTransition";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import heroPortrait2 from "@assets/cb2f6e44-0710-492f-abc7-1c2c8d0bcea3_1779198430336.png";

export default function InnerCircle() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    toast({
      title: "Request Received",
      description: "Your application for the Inner Circle has been submitted.",
      duration: 5000,
    });
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col pt-32 pb-24 px-6 md:px-12 bg-black overflow-hidden">
        {/* Right side portrait */}
        <div className="fixed top-0 right-0 w-full md:w-1/2 h-full z-0 opacity-40 pointer-events-none">
          <img 
            src={heroPortrait2} 
            alt="Faisal Orakzai Inner Circle" 
            className="w-full h-full object-cover object-top"
            style={{ maskImage: "linear-gradient(to left, black 50%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 100%)" }}
          />
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center">
          <FadeIn className="max-w-2xl mb-16">
            <div className="text-primary text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">
              INNER CIRCLE
            </div>
            
            <h1 className="text-4xl md:text-[60px] text-white font-bold leading-tight mb-8">
              This space is not for everyone.
            </h1>
            
            <p className="text-xl md:text-[22px] text-white/60 leading-relaxed">
              By invitation only. Built for those who think in systems.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mb-16">
            {[
              "Private Ecosystem", 
              "Elite Network", 
              "Future Collaborations"
            ].map((pillar, i) => (
              <FadeIn key={pillar} delay={0.2 + (i * 0.1)}>
                <div className="bg-black/80 backdrop-blur-md border border-primary/40 p-8 h-full flex items-center justify-center text-center transition-colors hover:border-primary">
                  <h3 className="text-white tracking-widest uppercase text-sm font-medium">
                    {pillar}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.6}>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button 
                  className="inline-block border border-primary text-primary px-10 py-4 uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:bg-primary hover:text-black hover:scale-105 bg-black/50 backdrop-blur-sm"
                  data-testid="button-request-access"
                >
                  Request Access
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#050505] border border-primary/20 text-white sm:max-w-md rounded-none">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-primary font-light tracking-wide uppercase mb-2">Request Access</DialogTitle>
                  <DialogDescription className="text-white/60">
                    Submit your details for consideration.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/70">Name</label>
                    <input 
                      id="name" 
                      required 
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-primary transition-colors rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/70">Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      required 
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-primary transition-colors rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="purpose" className="text-xs uppercase tracking-widest text-white/70">Intent</label>
                    <textarea 
                      id="purpose" 
                      required 
                      rows={3}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-primary transition-colors rounded-none resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full border border-primary text-primary py-3 uppercase tracking-widest text-sm transition-all duration-300 hover:bg-primary hover:text-black mt-4"
                  >
                    Submit Request
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
