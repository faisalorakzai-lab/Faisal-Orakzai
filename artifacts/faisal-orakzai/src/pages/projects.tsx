import { PageTransition, FadeIn } from "@/components/PageTransition";

import orakzaiGroupLogo from "@assets/file_0000000003e871faaafed737bba6aee2_1779198374121.png";
import orakzaiPropertiesLogo from "@assets/e6fe19f0-4a69-11f1-ace0-c146947e61d3_1779198306750.png";
import orakzaiXLogo from "@assets/file_0000000014f061f99aee8ecd62fbad5e_1779198374261.png";
import orakzaiBondLogo from "@assets/-ee81fu_1779198477373.jpg";
import shamimOneLogo from "@assets/file_0000000096407206badb1d12613bd5df_1779198374065.png";
import zovaAdsLogo from "@assets/file_00000000945061f7aaebf01c665c8e89_1779198374152.png";
import pscExchangeLogo from "@assets/file_00000000b8b861f68aeb4bebada858d1_1779198374208.png";
import shamimForeverLogo from "@assets/ChatGPT_Image_May_16,_2026,_12_56_29_PM_1779198430132.png";
import sonOfOrakzaiLogo from "@assets/FB_IMG_1775866729010_1779198447667.jpg";

export default function Projects() {
  const projects = [
    { name: "OTC System", desc: "Mobility-focused OTC platform", logo: orakzaiGroupLogo },
    { name: "Orakzai Properties", desc: "Real Estate Super Marketplace & Exchange", logo: orakzaiPropertiesLogo },
    { name: "OrakzaiX", desc: "AI and automation exploration", logo: orakzaiXLogo },
    { name: "Son of Orakzai", desc: "Public support community", logo: sonOfOrakzaiLogo },
    { name: "Orakzai Empire", desc: "Forex Broker", logo: null },
    { name: "Shamim One", desc: "Blockchain-based data storage", logo: shamimOneLogo },
    { name: "Zova Ads", desc: "Digital & Ground Advertising", logo: zovaAdsLogo },
    { name: "PSC Exchange", desc: "Crypto, Forex & Stock combined blockchain exchange", logo: pscExchangeLogo },
    { name: "Shamim Forever", desc: "Luxury shopping brand", logo: shamimForeverLogo },
    { name: "Orakzai Bond (OKBOND)", desc: "World's first Prize Capital Back decentralized Bond", logo: orakzaiBondLogo },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeIn className="mb-24">
          <div className="text-primary text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
            PROJECTS
          </div>
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight">
            Venture Portfolio
          </h1>
        </FadeIn>
        
        <div className="space-y-0">
          {projects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 0.08}>
              <div className="group py-8 border-b border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors duration-500 hover:border-primary/60 cursor-default relative overflow-hidden">
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                <div className="z-10">
                  <h3 className="text-2xl md:text-3xl text-white font-medium mb-3 tracking-wide">
                    {project.name}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base tracking-wide">
                    {project.desc}
                  </p>
                </div>
                
                <div className="z-10 h-16 w-32 flex items-center justify-start sm:justify-end">
                  {project.logo ? (
                    <img 
                      src={project.logo} 
                      alt={`${project.name} logo`} 
                      className="max-h-full max-w-full object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0" 
                    />
                  ) : (
                    <span className="text-primary/30 text-xs tracking-widest uppercase">System</span>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
