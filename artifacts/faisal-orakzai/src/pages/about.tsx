import { motion } from "framer-motion";
import { PageTransition, FadeIn } from "@/components/PageTransition";
import aboutPortrait from "@assets/a41d2ef1-fb04-40f8-bd66-df98ff195782_1779198430226.png";

export default function About() {
  return (
    <PageTransition>
      <div className="bg-[#050505] min-h-screen text-white">
        {/* Section 1 — The Sovereign Biography */}
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="w-full lg:w-[55%] p-8 lg:p-24 flex flex-col justify-center">
            <FadeIn>
              <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
                BIOGRAPHY
              </div>
              <h1 className="font-['Playfair_Display'] text-[52px] text-white leading-tight mb-8">
                Muhammad Faisal Orakzai
              </h1>
              <div className="space-y-6 text-white/70 text-[17px] leading-[1.9] mb-12">
                <p>
                  Born on 30 April 2006 in Mamuzai, Orakzai Agency, Muhammad Faisal Orakzai began his entrepreneurial journey at the age of 12 amid profound family challenges. Moving to Karachi, he mastered real estate through relentless self-study and disciplined execution — building his first client base with no external funding.
                </p>
                <p>
                  Over subsequent years, he expanded into Peshawar and Kohat, establishing what would become the Orakzai Properties network. His parallel transition into cryptocurrency and forex trading sharpened his understanding of global capital systems.
                </p>
                <p>
                  In 2023, he formalized the Orakzai Group — a multi-sector conglomerate architected for long-term sovereign infrastructure. Today, he operates across artificial intelligence, real estate, digital assets, and luxury goods.
                </p>
              </div>
              <blockquote className="font-['Playfair_Display'] italic text-[28px] text-[#D4AF37]">
                "I build systems that build businesses."
              </blockquote>
            </FadeIn>
          </div>
          <div className="w-full lg:w-[45%] relative h-[50vh] lg:h-auto">
            <img
              src={aboutPortrait}
              alt="Faisal Orakzai"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ maskImage: "linear-gradient(to left, transparent 0%, black 20%)", WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 20%)" }}
            />
          </div>
        </div>

        {/* Section 2 — The Sacred Chapter: Shamim Forever */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-full py-24 px-8 lg:px-24 border-y border-[rgba(65,105,225,0.3)] relative"
          style={{ background: 'linear-gradient(to right, #020208, #050505)' }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#4169E1] to-[#D4AF37]" />
          <div className="max-w-4xl mx-auto">
            <div className="text-[rgba(65,105,225,0.8)] text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
              THE ETERNAL PROMISE
            </div>
            <h2 className="font-['Playfair_Display'] text-[48px] text-white mb-8">
              Shamim Forever
            </h2>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed mb-12 italic">
              <p>
                "Dunya kehti hai ke luxury business dimagh aur calculation se banta hai, lekin Shamim Forever ki buniyaad ek tute hue dil aur ek sovereign waade par rakhi gayi. Faisal Orakzai ki zindagi mein 'Shamim' sirf ek naam nahi tha—woh unka sab se haseen ehsaas, unka sukoon, aur unki puri dunya thin. Jab waqt ki berahmi ne unhein Faisal se juda kiya, toh us dukh ne unhein tora nahi, balki andar se ek unshakeable empire builder khara kar diya."
              </p>
              <p>
                "Faisal ne ek qasam khayi: 'Jo naam meri zindagi mein adhura reh gaya, use puri dunya ke liye Amar (Immortal) karunga.'"
              </p>
            </div>
            <div className="font-['Playfair_Display'] italic text-[#D4AF37] text-2xl mb-12">
              Shamim Forever — Built on Honor. Sustained for Eternity.
            </div>
            <div className="space-y-6">
              {[
                { title: "The Sapphire", desc: "Deep blue sapphire representing unwavering loyalty and emotional depth." },
                { title: "The Fragrance", desc: "Long-lasting scent representing an eternal, unfading memory." },
                { title: "The Silver", desc: "925 Sterling Silver representing the absolute purity of a sovereign bond." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-br from-[#4169E1] to-[#D4AF37]" />
                  <div>
                    <div className="text-[#D4AF37] font-semibold">{item.title}</div>
                    <div className="text-white/60 text-sm mt-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 3 — Timeline & Executive Registry */}
        <div className="flex flex-col lg:flex-row py-24 px-8 lg:px-24 gap-16">
          <div className="w-full lg:w-[60%] relative">
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#D4AF37]/30" />
            <div className="space-y-12">
              {[
                { year: "2018", text: "Journey begins at age 12. Karachi real estate, zero capital." },
                { year: "2018–2021", text: "Orakzai Properties expands across Karachi, Peshawar, Kohat." },
                { year: "2022", text: "Transition to Crypto & Forex. Digital capital systems." },
                { year: "2023", text: "Orakzai Group established." },
                { year: "2024", text: "Orakzai Empire and OrakzaiX AI initiatives launched." },
                { year: "2025", text: "OTC Super-App Initiative deployed." },
                { year: "2026", text: "Official Launch of $OKBOND Ecosystem." },
              ].map((node, i) => (
                <FadeIn key={i}>
                  <div className="relative pl-16">
                    <div className="absolute left-[21px] top-4 w-3 h-3 rounded-full bg-[#D4AF37] border-2 border-black" />
                    <div className="bg-[rgba(255,255,255,0.02)] border border-[#D4AF37]/20 p-6">
                      <div className="text-[#D4AF37] font-mono text-sm mb-2">{node.year}</div>
                      <div className="text-white/70">{node.text}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[40%]">
            <FadeIn>
              <div className="bg-[rgba(255,255,255,0.02)] border border-[#D4AF37]/20 p-8">
                <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">
                  EXECUTIVE REGISTRY
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Full Name", value: "Muhammad Faisal Orakzai" },
                    { label: "Born", value: "30 April 2006, Mamuzai, Orakzai Agency, Pakistan" },
                    { label: "Occupation", value: "Entrepreneur · Forex Trader · Business Executive" },
                    { label: "Title", value: "CEO, Orakzai Group" },
                    { label: "Industries", value: "Real Estate · Crypto · Forex · AI · Luxury Cosmetics" },
                    { label: "Contact", value: "[Business Registry]" },
                  ].map((row, i) => (
                    <div key={i} className="border-b border-[#D4AF37]/10 pb-4 last:border-0 last:pb-0">
                      <div className="text-[#D4AF37]/60 text-xs uppercase tracking-wider mb-1">{row.label}</div>
                      <div className="text-white/80 text-sm">{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}