import { PageTransition, FadeIn } from "@/components/PageTransition";
import orakzaiBuildingImg from "@assets/-60gj9z_1779198484618.jpg";
import signatureLogo from "@assets/file_00000000a86c71fa922a0ad0f6542f75_1779198256732.png";

export default function Legacy() {
  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col pt-32 pb-24 px-6 md:px-12 bg-black overflow-hidden">
        {/* Background Image */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${orakzaiBuildingImg})` }}
        />
        <div className="fixed inset-0 z-0 bg-black/85" />
        
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center flex-1">
          
          <FadeIn className="w-full flex justify-center mb-24 mt-10">
            <img 
              src={signatureLogo} 
              alt="Faisal Orakzai Signature" 
              className="w-64 md:w-96 opacity-90 invert brightness-0 sepia sepia-[1] hue-rotate-[35deg] saturate-[300%] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" 
              style={{ filter: 'brightness(0) saturate(100%) invert(76%) sepia(21%) saturate(1089%) hue-rotate(5deg) brightness(88%) contrast(85%)' }}
            />
          </FadeIn>
          
          <FadeIn delay={0.2} className="text-center mb-32 max-w-4xl">
            <h2 className="text-3xl md:text-[52px] text-white font-medium leading-tight mb-4">
              Legacy is not built by noise.
            </h2>
            <h2 className="text-2xl md:text-[40px] text-primary font-medium leading-tight mb-4">
              It is built by consistent, disciplined action
            </h2>
            <h2 className="text-xl md:text-[32px] text-white/70 leading-tight">
              over decades that others cannot sustain.
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-32">
            {["Identity", "Discipline", "Vision"].map((principle, i) => (
              <FadeIn key={principle} delay={0.4 + (i * 0.1)}>
                <div className="bg-black/90 backdrop-blur-sm border border-primary/30 p-12 text-center transition-colors hover:border-primary/80">
                  <h3 className="text-white tracking-[0.2em] uppercase text-sm md:text-base font-medium">
                    {principle}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.8} className="mt-auto text-center w-full pb-10">
            <p className="text-xl md:text-[32px] text-primary italic font-serif tracking-wide">
              "This is not a chapter. This is the beginning of a dynasty."
            </p>
          </FadeIn>
          
        </div>
      </div>
    </PageTransition>
  );
}
