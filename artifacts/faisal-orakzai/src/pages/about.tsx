import { PageTransition, FadeIn } from "@/components/PageTransition";
import aboutPortrait from "@assets/a41d2ef1-fb04-40f8-bd66-df98ff195782_1779198430226.png";
import orakzaiGroupLogo from "@assets/file_0000000003e871faaafed737bba6aee2_1779198374121.png";

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col lg:flex-row pt-20 lg:pt-0">
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:fixed lg:left-0 lg:top-0 border-r border-white/5">
          <img
            src={aboutPortrait}
            alt="Faisal Orakzai Seated"
            className="w-full h-full object-cover object-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        </div>
        
        <div className="w-full lg:w-1/2 lg:ml-[50%] p-8 lg:p-24 xl:p-32 flex flex-col justify-center min-h-screen">
          <FadeIn>
            <div className="text-primary text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
              ABOUT
            </div>
            
            <h1 className="text-4xl md:text-[52px] text-white font-bold mb-12 tracking-tight">
              Faisal Orakzai
            </h1>
            
            <div className="space-y-8 text-white/75 text-base md:text-lg leading-[1.9] mb-16 max-w-2xl">
              <p>
                Faisal Orakzai is a Pakistani entrepreneur and founder of Orakzai Group.
              </p>
              <p>
                He began his journey at a young age through real estate, building his foundation through practical experience and disciplined execution.
              </p>
              <p>
                Over time, he expanded into digital markets including cryptocurrency and forex, focusing on scalable and adaptive systems.
              </p>
              <p>
                In 2023, he established Orakzai Group to develop long-term technology-driven ventures.
              </p>
            </div>
            
            <div className="mb-16">
              <div className="flex flex-wrap items-center gap-4 text-xs tracking-widest text-white/60 uppercase">
                <span>AI Systems</span>
                <span className="text-primary/50">•</span>
                <span>Digital Assets</span>
                <span className="text-primary/50">•</span>
                <span>Real Estate</span>
                <span className="text-primary/50">•</span>
                <span>Scalable Infrastructure</span>
              </div>
              <div className="h-[1px] w-full bg-primary/20 mt-6" />
            </div>
            
            <div className="mb-20">
              <blockquote className="text-2xl md:text-[32px] text-primary italic font-serif leading-tight">
                "I build systems that build businesses."
              </blockquote>
            </div>
            
            <div>
              <img 
                src={orakzaiGroupLogo} 
                alt="Orakzai Group Logo" 
                className="w-32 opacity-70 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100" 
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
