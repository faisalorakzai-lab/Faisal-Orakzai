import { useState } from "react";
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

const allProjects = [
  { id: "ORZ-001", name: "Orakzai Mart", div: "E-Commerce & Retail", status: "ACTIVE" },
  { id: "ORZ-012", name: "Orakzai Properties Engine", div: "Real Estate", status: "ACTIVE" },
  { id: "ORZ-027", name: "Luxury Store", div: "High-end Lifestyle", status: "ACTIVE" },
  { id: "ORZ-034", name: "Son of Orakzai", div: "Community", status: "ACTIVE" },
  { id: "ORZ-051", name: "OrakzaiX / Adam AI", div: "Technologies", status: "DEPLOYED" },
  { id: "ORZ-063", name: "Orakzai Empire Forex", div: "Fintech", status: "ACTIVE" },
  { id: "ORZ-078", name: "Shamim One", div: "Blockchain Data", status: "DEPLOYED" },
  { id: "ORZ-085", name: "Zova Ads", div: "Digital Advertising", status: "ACTIVE" },
  { id: "ORZ-101", name: "Orakzai Builders", div: "Real Estate", status: "ACTIVE" },
  { id: "ORZ-115", name: "PSC Exchange", div: "Blockchain Exchange", status: "IN-DEVELOPMENT" },
  { id: "ORZ-134", name: "Shamim Forever", div: "Luxury Lifestyle", status: "ACTIVE" },
  { id: "ORZ-150", name: "Orakzai Bond (OKBOND)", div: "DeFi", status: "DEPLOYED" },
  { id: "ORZ-178", name: "OTC Platform", div: "Mobility", status: "IN-DEVELOPMENT" },
  { id: "ORZ-211", name: "Orakzai Bank", div: "Fintech & Digital Banking", status: "IN-DEVELOPMENT" },
  { id: "ORZ-225", name: "Orakzai Media Network", div: "Entertainment", status: "IN-DEVELOPMENT" },
];

export default function Projects() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filteredProjects = allProjects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    if (filter === "ALL") return matchesSearch;
    if (filter === "TECH" && p.div.includes("Technologies")) return matchesSearch;
    if (filter === "FINTECH" && (p.div.includes("Fintech") || p.div.includes("DeFi") || p.div.includes("Exchange"))) return matchesSearch;
    if (filter === "REAL ESTATE" && p.div.includes("Real Estate")) return matchesSearch;
    if (filter === "RETAIL" && p.div.includes("Retail")) return matchesSearch;
    if (filter === "LIFESTYLE" && p.div.includes("Lifestyle")) return matchesSearch;
    return false;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050505] text-white pb-32">
        {/* Section 1 — Hero */}
        <section className="pt-40 pb-20 px-8 lg:px-16 max-w-6xl mx-auto border-b border-[#D4AF37]/20">
          <FadeIn>
            <h1 className="font-bold text-[80px] tracking-[0.1em] leading-none mb-8">GLOBAL PORTFOLIO</h1>
            <p className="text-white/50 text-[18px] max-w-3xl leading-relaxed">
              Architecting a multi-sector sovereign conglomerate targeting Top 10 Global Company status by 2040. Currently orchestrating 12 Mother Companies and a pipeline of 250+ decentralized projects.
            </p>
          </FadeIn>
        </section>

        {/* Section 4 — Deep Anchor Highlights */}
        <section className="py-24 px-8 lg:px-16 max-w-6xl mx-auto">
          <FadeIn>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-8 bg-[rgba(255,255,255,0.02)] border border-[#D4AF37]/20 p-8 hover:border-[#D4AF37]/50 transition-colors">
                <img src={orakzaiPropertiesLogo} alt="Properties" className="w-48 object-contain" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Orakzai Properties Engine</h3>
                  <p className="text-white/60">Real-World Asset tokenization, fractionalized ownership models, and urban intelligence deployed across flagship sectors. The cornerstone physical infrastructure of the Orakzai 2040 vision.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 bg-[rgba(255,255,255,0.02)] border border-[#D4AF37]/20 p-8 hover:border-[#D4AF37]/50 transition-colors">
                <img src={orakzaiBondLogo} alt="OKBOND" className="w-48 object-contain" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">$OKBOND Ecosystem</h3>
                  <p className="text-white/60">The world's first capital-backed decentralized bond layer. Launching live with structural sovereign yields and proprietary blockchain infrastructure.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 bg-[rgba(255,255,255,0.02)] border border-[#D4AF37]/20 p-8 hover:border-[#D4AF37]/50 transition-colors">
                <img src={orakzaiXLogo} alt="OrakzaiX" className="w-48 object-contain" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">OrakzaiX / Adam AI</h3>
                  <p className="text-white/60">The central nervous system powering automated trading, enterprise intelligence, and autonomous business orchestration across all Orakzai divisions.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 bg-[rgba(255,255,255,0.02)] border-y border-[#D4AF37]/20 border-l-4 border-l-[#4169E1] border-r border-r-[#D4AF37] p-8 hover:border-[#D4AF37]/50 transition-colors">
                <img src={shamimForeverLogo} alt="Shamim Forever" className="w-48 object-contain" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Shamim Forever</h3>
                  <p className="text-white/60">A high-end luxury jewelry and cosmetics chapter. Perfume, sterling silver, and sapphire — each piece a physical manifestation of honor and royal standards.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Section 2 — 12 Corporate Pillars */}
        <section className="py-24 px-8 lg:px-16 max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-[#D4AF37] tracking-widest text-sm uppercase mb-12">THE 12 CORPORATE PILLARS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { n: "01", t: "Orakzai Technologies", d: "AI · Quantum · Cloud" },
                { n: "02", t: "Orakzai Finance & Capital", d: "Banking · Wallets · Forex" },
                { n: "03", t: "Orakzai Real Estate", d: "Smart Cities · Builders" },
                { n: "04", t: "Orakzai Food & Beverages", d: "Chains · Organic Farms" },
                { n: "05", t: "Orakzai Media", d: "Film · Studios · News" },
                { n: "06", t: "Orakzai Lifestyle", d: "Cosmetics · Jewelry" },
                { n: "07", t: "Orakzai Travel", d: "Logistics · Ride-Hailing" },
                { n: "08", t: "Orakzai Energy", d: "Renewables · Smart Grids" },
                { n: "09", t: "Orakzai Education", d: "AI Academies · Biotech" },
                { n: "10", t: "Orakzai Base", d: "Crypto · Blockchain Infrastructure" },
                { n: "11", t: "Orakzai Mills", d: "Agro Processing · Industrial" },
                { n: "12", t: "Orakzai Textile", d: "Garments · Manufacturing Exports" }
              ].map((p, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 p-8 transition-colors">
                  <div className="text-[#D4AF37]/30 font-mono mb-4">{p.n}</div>
                  <div className="text-white font-bold mb-2">{p.t}</div>
                  <div className="text-white/40 text-xs">{p.d}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Section 3 — Project Registry Terminal */}
        <section className="py-24 px-8 lg:px-16 max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-[#D4AF37] font-mono text-xl mb-8">PROJECT REGISTRY</h2>
            
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-[#0a0a0a] border border-[#D4AF37]/30 text-white px-4 py-2 w-full md:w-64 focus:outline-none focus:border-[#D4AF37]"
              />
              <div className="flex flex-wrap gap-2 text-xs">
                {["ALL", "TECH", "FINTECH", "REAL ESTATE", "RETAIL", "LIFESTYLE"].map(f => (
                  <button 
                    key={f} 
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 border transition-colors ${filter === f ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-white/50 hover:text-white'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#D4AF37]/30 text-[#D4AF37]/50 text-xs font-mono">
                    <th className="py-4 font-normal">ID</th>
                    <th className="py-4 font-normal">PROJECT NAME</th>
                    <th className="py-4 font-normal">DIVISION</th>
                    <th className="py-4 font-normal">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map(p => (
                    <tr key={p.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-4 font-mono text-white/60 text-sm">{p.id}</td>
                      <td className="py-4 text-white font-medium">{p.name}</td>
                      <td className="py-4 text-white/50 text-sm">{p.div}</td>
                      <td className="py-4 text-xs font-bold tracking-wider">
                        {p.status === "ACTIVE" && <span className="text-green-500">ACTIVE</span>}
                        {p.status === "IN-DEVELOPMENT" && <span className="text-[#D4AF37]">IN-DEVELOPMENT</span>}
                        {p.status === "DEPLOYED" && <span className="text-blue-400">DEPLOYED</span>}
                      </td>
                    </tr>
                  ))}
                  {filteredProjects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-white/40">No projects match criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </section>

      </div>
    </PageTransition>
  );
}