import { PageTransition, FadeIn } from "@/components/PageTransition";
import { motion } from "framer-motion";
import orakzaiBuildingImg from "@assets/-60gj9z_1779198484618.jpg";
import signatureLogo from "@assets/file_00000000a86c71fa922a0ad0f6542f75_1779198256732.png";

export default function Legacy() {
  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen text-white relative">
        
        {/* Section 1 — Eternal Hero */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-8">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: `url(${orakzaiBuildingImg})` }}
          />
          <FadeIn className="relative z-10 flex flex-col items-center">
            <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">
              THE ARCHIVE
            </div>
            <h1 className="font-['Playfair_Display'] text-[80px] leading-none mb-6">
              The Chronicle
            </h1>
            <p className="text-white/50 text-[20px] max-w-2xl">
              A chronicle of principles, promises, and the vision that defines the Orakzai path.
            </p>
            <div className="w-[1px] h-24 bg-[#D4AF37]/40 mx-auto mt-12" />
          </FadeIn>
        </section>

        {/* Section 2 — Golden Thread Timeline */}
        <section className="py-24 px-8 lg:px-16 max-w-5xl mx-auto relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#D4AF37]/30 transform -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-24">
            {[
              { title: "THE ORIGIN", desc: "Born from humble beginnings, defined by an unwavering vision. The early years of observing the world, identifying its inefficiencies, and engineering a roadmap for total systemic change.", align: "left" },
              { title: "THE BUILDING ERA", desc: "The transition from idea to infrastructure. Systematizing the 12 Mother Companies. Converting abstract thought into physical engines of value, capital, and technology.", align: "right" },
              { title: "THE ETERNAL PROMISE — SHAMIM FOREVER", desc: "More than a brand—a tribute. The embodiment of honor and royal standards. This division stands as the emotional bedrock of my legacy, crafting timeless value for the future.", align: "left", special: true },
              { title: "THE 2040 MATRIX", desc: "The target is clear. By 2040, the conglomerate acts not as an entity, but as the world's underlying infrastructure. A legacy of systems that function perfectly in my absence.", align: "right" }
            ].map((node, i) => (
              <FadeIn key={i} className={`flex flex-col md:flex-row w-full ${node.align === 'left' ? 'md:justify-start' : 'md:justify-end'} relative`}>
                <div className={`hidden md:block absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border-[3px] border-[#D4AF37] z-10`} />
                <div className={`md:w-[45%] bg-[rgba(255,255,255,0.02)] p-10 border ${node.special ? 'border-l-4 border-l-[#4169E1] border-t border-b border-r border-[#D4AF37]/20' : 'border-[#D4AF37]/20'}`}>
                  <h3 className="font-['Playfair_Display'] text-[24px] text-[#D4AF37] mb-4">{node.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">{node.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Section 3 — Founder's Seal */}
        <section className="py-40 px-8 flex flex-col items-center text-center bg-black">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <img 
              src={signatureLogo} 
              alt="Faisal Orakzai Signature" 
              className="w-48 mx-auto opacity-70 mb-12"
              style={{ filter: "sepia(1) brightness(0.8) hue-rotate(5deg) saturate(2)" }}
            />
            <blockquote className="font-['Playfair_Display'] italic text-[32px] text-white/90 leading-tight mb-8">
              "True power is not what you control today, but the systems that continue to operate flawlessly in your absence."
            </blockquote>
            <div className="text-[#D4AF37] tracking-widest text-sm uppercase">
              — Faisal Orakzai
            </div>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}