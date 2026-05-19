import { useState } from "react";
import { PageTransition, FadeIn } from "@/components/PageTransition";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("chairman@faisalorakzai.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modalMsg, setModalMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(email === "chairman@faisalorakzai.com" && password === "Faisal@8686@") {
      setIsAuthenticated(true);
    } else {
      setError("ACCESS DENIED // Invalid credentials");
      setTimeout(() => setError(""), 2000);
    }
  };

  if(!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 border border-[#D4AF37]/30 bg-[#0a0a0a] shadow-2xl">
          <div className="font-sans font-bold text-[36px] text-[#D4AF37] mb-2 text-center">EXECUTIVE ACCESS</div>
          <div className="text-white/50 text-center text-sm mb-12">Orakzai Group Command Terminal</div>
          
          {error && <div className="text-red-500 mb-6 text-sm text-center">{error}</div>}

          <div className="space-y-6">
            <input 
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <input 
              type="password"
              placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button type="submit" className="w-full bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] py-3 hover:bg-[#D4AF37] hover:text-black transition-colors font-bold">
              ACCESS SYSTEM
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32 px-8 lg:px-12 font-sans relative">
        {/* Modals simulation */}
        {modalMsg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalMsg("")}>
            <div className="bg-[#0a0a0a] border border-[#D4AF37] p-8 max-w-sm w-full" onClick={e=>e.stopPropagation()}>
              <div className="text-[#D4AF37] mb-6 font-mono text-sm">{modalMsg}</div>
              <button onClick={() => setModalMsg("")} className="border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Close</button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-b border-[#D4AF37]/20 pb-6 gap-4">
            <div className="flex items-center gap-4">
              <h1 className="font-mono text-[#D4AF37] text-xl">COMMAND CENTER</h1>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-green-500 text-xs font-mono">SESSION: ACTIVE</span>
              </div>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="text-xs uppercase tracking-widest text-white/50 hover:text-white border border-white/10 px-4 py-2 hover:bg-white/5">
              LOGOUT
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 p-6">
              <div className="text-white/40 text-xs uppercase mb-2">Total Visitors</div>
              <div className="text-2xl font-bold">12,847 <span className="text-green-500 text-sm font-normal ml-2">+2.4%</span></div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 p-6">
              <div className="text-white/40 text-xs uppercase mb-2">Inner Circle Applications</div>
              <div className="text-2xl font-bold">23 <span className="text-white/40 text-sm font-normal">Pending</span></div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 p-6">
              <div className="text-white/40 text-xs uppercase mb-2">Journal Entries</div>
              <div className="text-2xl font-bold">8 <span className="text-white/40 text-sm font-normal">Active</span></div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 p-6 flex flex-col justify-center items-center text-center">
              <div className="text-white/40 text-xs uppercase mb-2">System Status</div>
              <div className="flex items-center gap-2 text-xl font-bold text-green-500">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"/> OPTIMAL
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setModalMsg("Entry queued for publication")} className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-6 py-3 hover:bg-[#D4AF37] hover:text-black transition-colors font-medium">
              + New Journal Entry
            </button>
            <button onClick={() => setModalMsg("Mock table of 3 applicants loaded.")} className="bg-transparent border border-white/20 text-white px-6 py-3 hover:bg-white/10 transition-colors font-medium">
              View Applicants
            </button>
            <button onClick={() => setModalMsg("Registry update interface — connect to CMS backend")} className="bg-transparent border border-white/20 text-white px-6 py-3 hover:bg-white/10 transition-colors font-medium">
              Update Registry
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Content Management Table */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-bold mb-6 text-[#D4AF37] uppercase">CONTENT REGISTRY</h2>
              <div className="border border-white/10 rounded-sm overflow-hidden">
                <table className="w-full text-left bg-[#0a0a0a]">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 text-xs uppercase">
                      <th className="p-4">SECTION</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4">LAST UPDATED</th>
                      <th className="p-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Home", "About", "Thinking", "Systems", "Projects", "Legacy", "Journal", "Inner Circle", "Contact"].map(s => (
                      <tr key={s} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4 text-sm font-medium">{s}</td>
                        <td className="p-4 text-xs font-bold text-green-500">LIVE</td>
                        <td className="p-4 text-xs text-white/40">Today, 09:41 AM</td>
                        <td className="p-4 text-right space-x-4 text-sm">
                          <button className="text-[#D4AF37] hover:underline">Edit</button>
                          <button className="text-white/50 hover:text-white">Preview</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side Widgets */}
            <div className="space-y-12">
              {/* System Health Widget */}
              <div>
                <h2 className="text-lg font-bold mb-6 text-[#D4AF37] uppercase">ECOSYSTEM HEALTH</h2>
                <div className="grid grid-cols-2 gap-4">
                  {["AI Core", "DeFi Layer", "Real Estate Engine", "Capital Systems", "Media Division", "Lifestyle Division"].map(sys => (
                    <div key={sys} className="bg-[#0a0a0a] border border-white/10 p-4">
                      <div className="text-white/60 text-xs mb-3 h-8">{sys}</div>
                      <div className="flex items-center gap-2 text-xs font-bold text-green-500">
                        <div className="w-2 h-2 rounded-full bg-green-500"/> ONLINE
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Log Widget */}
              <div>
                <h2 className="text-sm font-bold mb-6 text-[#D4AF37] font-mono">AI INQUIRY LOG</h2>
                <div className="bg-[#0a0a0a] border border-white/10 font-mono text-xs">
                  {[
                    "14:23:07 · Partnership Inquiry · ROUTED",
                    "11:45:32 · Investment Query · PROCESSED",
                    "09:12:18 · Media Request · PENDING"
                  ].map((log, i) => (
                    <div key={i} className="p-3 border-b border-white/5 last:border-0 text-white/60 hover:text-white hover:bg-white/5">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}