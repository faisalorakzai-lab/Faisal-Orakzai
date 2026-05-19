import { PageTransition, FadeIn } from "@/components/PageTransition";

export default function Systems() {
  const domains = [
    {
      id: "01",
      title: "AI Systems",
      desc: "Automation and intelligence infrastructure"
    },
    {
      id: "02",
      title: "Digital Systems",
      desc: "Modern financial and blockchain infrastructure"
    },
    {
      id: "03",
      title: "Real Asset Systems",
      desc: "Long-term physical and structured asset frameworks"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto flex flex-col justify-center">
        <FadeIn className="mb-20">
          <div className="text-primary text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
            SYSTEMS
          </div>
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight">
            Core Infrastructure
          </h1>
        </FadeIn>
        
        <div className="space-y-6">
          {domains.map((domain, i) => (
            <FadeIn key={domain.id} delay={i * 0.15}>
              <div className="group block relative w-full bg-[#000000] border border-primary/20 p-10 md:p-16 transition-all duration-700 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] cursor-default">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-start gap-8">
                    <span className="text-primary font-mono text-sm md:text-base tracking-widest mt-2 md:mt-1">
                      {domain.id}
                    </span>
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-medium tracking-tight mb-4 transition-colors group-hover:text-primary/90">
                        {domain.title}
                      </h2>
                      <p className="text-white/50 text-base md:text-lg max-w-md">
                        {domain.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-12 h-[1px] bg-primary/30 transition-all duration-500 group-hover:w-24 group-hover:bg-primary" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
