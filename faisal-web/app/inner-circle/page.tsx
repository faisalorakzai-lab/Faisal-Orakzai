"use client";
  import { useState, useEffect, useRef, useCallback } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Navbar } from "@/components/Navbar";

  const IC_PASS = "orakzai2025";
  const ADMIN_PASS = "admin-fo-2025";
  const STORAGE_KEY = "ic_vault_items";

  type VaultItem = {
    id: string;
    tag: string;
    title: string;
    sub: string;
    desc: string;
  };

  const DEFAULT_ITEMS: VaultItem[] = [
    { id: "1", tag: "DISPATCH", title: "The Architecture Thesis", sub: "Q1 2025 · Private Document", desc: "On why the next decade belongs to system architects — not product builders." },
    { id: "2", tag: "INSIGHT", title: "AI Infrastructure Playbook", sub: "2025 · Strategic Memo", desc: "The frameworks being used to build cognitive infrastructure across three verticals." },
    { id: "3", tag: "MEMO", title: "Digital Asset Position", sub: "Updated Q4 2024 · Restricted", desc: "The long-term thesis on sovereign value storage and why digital assets are foundational." },
    { id: "4", tag: "SIGNAL", title: "The Next Move", sub: "2025 · Confidential", desc: "What is being built in the next 24 months. Geographic. Structural. Definitive." },
  ];

  function loadItems(): VaultItem[] {
    if (typeof window === "undefined") return DEFAULT_ITEMS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_ITEMS;
  }
  function saveItems(items: VaultItem[]) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }
  function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

  // ─── Ambient Particles ─────────────────────────────────────────
  function AmbientParticles({ count = 60 }: { count?: number }) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      const canvas = ref.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      let raf: number;
      const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
      resize();
      window.addEventListener("resize", resize);
      const pts = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.3 + 0.4,
      }));
      const draw = () => {
        raf = requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of pts) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(212,175,55,0.15)";
          ctx.fill();
        }
      };
      draw();
      return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, [count]);
    return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
  }

  // ─── Gate Screen (shared for both IC and admin) ────────────────
  function GateScreen({ label, hint, onUnlock }: {
    label: string; hint?: string; onUnlock: (pass: string) => boolean;
  }) {
    const [val, setVal] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [phase, setPhase] = useState(0);
    useEffect(() => {
      const t = [setTimeout(() => setPhase(1), 200), setTimeout(() => setPhase(2), 900)];
      return () => t.forEach(clearTimeout);
    }, []);

    const attempt = () => {
      const ok = onUnlock(val);
      if (!ok) {
        setError(true); setShake(true); setVal("");
        setTimeout(() => { setShake(false); setError(false); }, 700);
      }
    };

    return (
      <div style={{ position: "fixed", inset: 0, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
        <AmbientParticles count={50} />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }} transition={{ duration: 2 }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {phase >= 1 && [
          { top: 24, left: 24, borderTop: "1px solid", borderLeft: "1px solid" },
          { top: 24, right: 24, borderTop: "1px solid", borderRight: "1px solid" },
          { bottom: 24, left: 24, borderBottom: "1px solid", borderLeft: "1px solid" },
          { bottom: 24, right: 24, borderBottom: "1px solid", borderRight: "1px solid" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{ position: "absolute", width: 20, height: 20, borderColor: "rgba(212,175,55,0.2)", ...s }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.5 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 40 }}
          >
            <div style={{ width: 56, height: 56, border: "1px solid rgba(212,175,55,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
            transition={{ duration: 0.9 }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <div style={{ color: "#D4AF37", fontSize: 10, letterSpacing: "0.55em", textTransform: "uppercase", fontWeight: 300, marginBottom: 12 }}>{label}</div>
            <h1 style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 300, letterSpacing: "-0.025em", marginBottom: 8 }}>
              Restricted Access
            </h1>
            {hint && <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 12, fontWeight: 300, letterSpacing: "0.05em" }}>{hint}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 16 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{ width: "min(320px, 80vw)" }}
          >
            <motion.div animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : {}} transition={{ duration: 0.4 }}>
              <input
                type="password"
                value={val}
                placeholder="Access code"
                onChange={e => setVal(e.target.value)}
                onKeyDown={e => e.key === "Enter" && attempt()}
                autoFocus
                style={{
                  width: "100%", boxSizing: "border-box", padding: "14px 18px",
                  background: "rgba(255,255,255,0.03)",
                  border: error ? "1px solid rgba(255,80,80,0.5)" : "1px solid rgba(212,175,55,0.2)",
                  color: "#fff", fontSize: 14, letterSpacing: "0.12em",
                  outline: "none", fontFamily: "monospace", transition: "border 0.3s",
                }}
              />
              <motion.button
                whileHover={{ background: "#D4AF37", color: "#000" }}
                whileTap={{ scale: 0.97 }}
                onClick={attempt}
                style={{
                  marginTop: 10, width: "100%", padding: "13px", background: "transparent",
                  border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37",
                  fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "inherit", transition: "background 0.3s, color 0.3s",
                }}
              >
                ENTER
              </motion.button>
            </motion.div>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ marginTop: 10, textAlign: "center", fontSize: 10, color: "rgba(255,80,80,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}
                >
                  ACCESS DENIED
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Vault Item Card ───────────────────────────────────────────
  function VaultCard({
    item, isAdmin, onEdit, onDelete,
  }: {
    item: VaultItem; isAdmin: boolean;
    onEdit: (item: VaultItem) => void;
    onDelete: (id: string) => void;
  }) {
    const [hov, setHov] = useState(false);
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "44px 40px", position: "relative",
          background: hov ? "rgba(212,175,55,0.025)" : "#000",
          transition: "background 0.35s", cursor: "default",
        }}
      >
        <div style={{ fontSize: 8, letterSpacing: "0.55em", color: "rgba(212,175,55,0.35)", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 20 }}>{item.tag}</div>
        <div style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 300, color: hov ? "#fff" : "rgba(255,255,255,0.88)", letterSpacing: "-0.01em", marginBottom: 8, transition: "color 0.3s" }}>{item.title}</div>
        <div style={{ fontSize: 10, color: "rgba(212,175,55,0.3)", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 16 }}>{item.sub}</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
        <motion.div animate={{ width: hov ? "100%" : "0%" }} transition={{ duration: 0.5 }} style={{ marginTop: 28, height: 1, background: "rgba(212,175,55,0.2)" }} />

        {/* Admin controls */}
        {isAdmin && (
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6, opacity: hov ? 1 : 0, transition: "opacity 0.3s" }}>
            <button
              onClick={() => onEdit(item)}
              style={{
                padding: "4px 12px", fontSize: 9, letterSpacing: "0.3em",
                background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)",
                color: "#D4AF37", cursor: "pointer", fontFamily: "inherit",
              }}
            >EDIT</button>
            <button
              onClick={() => onDelete(item.id)}
              style={{
                padding: "4px 12px", fontSize: 9, letterSpacing: "0.3em",
                background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.25)",
                color: "rgba(255,80,80,0.7)", cursor: "pointer", fontFamily: "inherit",
              }}
            >DELETE</button>
          </div>
        )}
      </motion.div>
    );
  }

  // ─── Edit Modal ────────────────────────────────────────────────
  function EditModal({
    item, onSave, onClose,
  }: {
    item: Partial<VaultItem> | null;
    onSave: (item: VaultItem) => void;
    onClose: () => void;
  }) {
    const [form, setForm] = useState<Partial<VaultItem>>(item || { tag: "", title: "", sub: "", desc: "" });
    if (!item && item !== null) return null;

    const set = (k: keyof VaultItem, v: string) => setForm(prev => ({ ...prev, [k]: v }));

    const fields: { key: keyof VaultItem; label: string; placeholder: string; area?: boolean }[] = [
      { key: "tag", label: "TAG", placeholder: "DISPATCH / INSIGHT / MEMO / SIGNAL" },
      { key: "title", label: "TITLE", placeholder: "Item title" },
      { key: "sub", label: "SUBTITLE", placeholder: "Q1 2025 · Private Document" },
      { key: "desc", label: "DESCRIPTION", placeholder: "What this dispatch covers...", area: true },
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
          style={{
            background: "#0a0a0a", border: "1px solid rgba(212,175,55,0.2)",
            padding: "44px 40px", width: "min(520px, 95vw)",
            maxHeight: "90vh", overflowY: "auto",
          }}
        >
          <div style={{ color: "#D4AF37", fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 24 }}>
            {form.id ? "EDIT ITEM" : "NEW ITEM"}
          </div>
          <h2 style={{ color: "rgba(255,255,255,0.9)", fontSize: 26, fontWeight: 300, letterSpacing: "-0.02em", marginBottom: 36 }}>
            {form.id ? "Edit Vault Item" : "Add New Dispatch"}
          </h2>

          {fields.map(({ key, label, placeholder, area }) => (
            <div key={key} style={{ marginBottom: 20 }}>
              <div style={{ color: "rgba(212,175,55,0.4)", fontSize: 9, letterSpacing: "0.45em", fontFamily: "monospace", marginBottom: 8 }}>{label}</div>
              {area ? (
                <textarea
                  value={form[key] || ""}
                  onChange={e => set(key, e.target.value)}
                  placeholder={placeholder}
                  rows={3}
                  style={{
                    width: "100%", boxSizing: "border-box", padding: "12px 14px",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.85)", fontSize: 13, outline: "none",
                    fontFamily: "inherit", resize: "vertical", lineHeight: 1.6,
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={form[key] || ""}
                  onChange={e => set(key, e.target.value)}
                  placeholder={placeholder}
                  style={{
                    width: "100%", boxSizing: "border-box", padding: "12px 14px",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.85)", fontSize: 13, outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              )}
            </div>
          ))}

          <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
            <motion.button
              whileHover={{ background: "#D4AF37", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (!form.title) return;
                onSave({ id: form.id || genId(), tag: form.tag || "DISPATCH", title: form.title || "", sub: form.sub || "", desc: form.desc || "" });
              }}
              style={{
                flex: 1, padding: "13px", background: "transparent",
                border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37",
                fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s",
              }}
            >
              SAVE
            </motion.button>
            <button
              onClick={onClose}
              style={{
                padding: "13px 24px", background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)",
                fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              CANCEL
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // ─── Vault Content (shared by both modes) ─────────────────────
  function VaultContent({ isAdmin }: { isAdmin: boolean }) {
    const [items, setItems] = useState<VaultItem[]>([]);
    const [editTarget, setEditTarget] = useState<Partial<VaultItem> | null | undefined>(undefined);
    const [adminMode, setAdminMode] = useState(false);
    const [showAdminGate, setShowAdminGate] = useState(false);

    useEffect(() => { setItems(loadItems()); }, []);

    const handleSave = useCallback((item: VaultItem) => {
      setItems(prev => {
        const next = prev.some(i => i.id === item.id)
          ? prev.map(i => i.id === item.id ? item : i)
          : [...prev, item];
        saveItems(next);
        return next;
      });
      setEditTarget(undefined);
    }, []);

    const handleDelete = useCallback((id: string) => {
      if (!confirm("Delete this item?")) return;
      setItems(prev => { const next = prev.filter(i => i.id !== id); saveItems(next); return next; });
    }, []);

    const resetToDefault = () => {
      if (!confirm("Reset all items to default? This cannot be undone.")) return;
      saveItems(DEFAULT_ITEMS);
      setItems(DEFAULT_ITEMS);
    };

    return (
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        <section style={{ position: "relative", minHeight: "100vh", background: "#000", padding: "140px 0 200px", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 55% at 50% 35%, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }} />
          <AmbientParticles count={40} />

          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 2 }}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ marginBottom: 60 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4AF37" }} />
                <span style={{ color: "rgba(212,175,55,0.4)", fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", fontFamily: "monospace" }}>
                  INNER CIRCLE — {adminMode ? "ADMIN MODE" : "ACCESS GRANTED"}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
                <div>
                  <h1 style={{ fontSize: "clamp(52px, 7vw, 92px)", fontWeight: 300, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.95)", lineHeight: 0.88, marginBottom: 20 }}>
                    {adminMode ? "Admin Panel" : "The Vault"}
                  </h1>
                  <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 14, fontWeight: 300, maxWidth: 380, lineHeight: 1.7 }}>
                    {adminMode
                      ? "Manage vault items — add, edit, reorder, or delete dispatches."
                      : "Exclusive dispatches, strategic memos, and private signals for those inside the architecture."}
                  </p>
                </div>

                {/* Admin toggle */}
                {isAdmin && (
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    {adminMode && (
                      <motion.button
                        whileHover={{ background: "rgba(212,175,55,0.1)" }}
                        onClick={() => setEditTarget({ tag: "DISPATCH", title: "", sub: "", desc: "" })}
                        style={{
                          padding: "10px 20px", background: "transparent",
                          border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37",
                          fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase",
                          cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        + ADD ITEM
                      </motion.button>
                    )}
                    {adminMode && (
                      <button
                        onClick={resetToDefault}
                        style={{
                          padding: "10px 16px", background: "transparent",
                          border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.2)",
                          fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
                          cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        RESET
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (adminMode) { setAdminMode(false); }
                        else { setShowAdminGate(true); }
                      }}
                      style={{
                        padding: "10px 18px", background: adminMode ? "rgba(255,60,60,0.08)" : "transparent",
                        border: adminMode ? "1px solid rgba(255,60,60,0.2)" : "1px solid rgba(255,255,255,0.08)",
                        color: adminMode ? "rgba(255,80,80,0.6)" : "rgba(255,255,255,0.2)",
                        fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase",
                        cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      {adminMode ? "EXIT ADMIN" : "ADMIN"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
              style={{ height: 1, background: "rgba(212,175,55,0.08)", transformOrigin: "left", marginBottom: 60 }}
            />

            {/* Items grid */}
            <AnimatePresence mode="popLayout">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 1, background: "rgba(255,255,255,0.04)" }}>
                {items.map((item) => (
                  <VaultCard
                    key={item.id}
                    item={item}
                    isAdmin={adminMode}
                    onEdit={setEditTarget}
                    onDelete={handleDelete}
                  />
                ))}
                {items.length === 0 && (
                  <div style={{ gridColumn: "1/-1", padding: "80px 40px", textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: 13, letterSpacing: "0.2em", fontFamily: "monospace" }}>
                    NO ITEMS — ADD YOUR FIRST DISPATCH
                  </div>
                )}
              </div>
            </AnimatePresence>

            {/* Footer */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              style={{ marginTop: 80, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div style={{ color: "rgba(255,255,255,0.08)", fontSize: 10, letterSpacing: "0.3em", fontFamily: "monospace" }}>
                FAISAL ORAKZAI — INNER CIRCLE 2025
              </div>
              <div style={{ color: "rgba(212,175,55,0.15)", fontSize: 10, letterSpacing: "0.3em", fontFamily: "monospace" }}>
                CONFIDENTIAL — NOT FOR DISTRIBUTION
              </div>
            </motion.div>
          </div>
        </section>

        {/* Admin gate modal */}
        <AnimatePresence>
          {showAdminGate && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={e => { if (e.target === e.currentTarget) setShowAdminGate(false); }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
                style={{ background: "#0a0a0a", border: "1px solid rgba(212,175,55,0.2)", padding: "48px 44px", width: "min(400px, 90vw)" }}
              >
                <InlineAdminGate
                  onSuccess={() => { setAdminMode(true); setShowAdminGate(false); }}
                  onCancel={() => setShowAdminGate(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit modal */}
        <AnimatePresence>
          {editTarget !== undefined && (
            <EditModal
              item={editTarget}
              onSave={handleSave}
              onClose={() => setEditTarget(undefined)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  function InlineAdminGate({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
    const [val, setVal] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const attempt = () => {
      if (val === ADMIN_PASS) { onSuccess(); }
      else { setError(true); setShake(true); setVal(""); setTimeout(() => { setShake(false); setError(false); }, 700); }
    };

    return (
      <>
        <div style={{ color: "#D4AF37", fontSize: 9, letterSpacing: "0.55em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 16 }}>ADMIN ACCESS</div>
        <h3 style={{ color: "rgba(255,255,255,0.9)", fontSize: 24, fontWeight: 300, letterSpacing: "-0.02em", marginBottom: 32 }}>Enter Admin Code</h3>
        <motion.div animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : {}} transition={{ duration: 0.4 }}>
          <input
            type="password" value={val} placeholder="Admin code" autoFocus
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === "Enter" && attempt()}
            style={{
              width: "100%", boxSizing: "border-box", padding: "12px 14px",
              background: "rgba(255,255,255,0.03)",
              border: error ? "1px solid rgba(255,80,80,0.5)" : "1px solid rgba(255,255,255,0.08)",
              color: "#fff", fontSize: 13, outline: "none", fontFamily: "monospace",
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <motion.button
              whileHover={{ background: "#D4AF37", color: "#000" }}
              onClick={attempt}
              style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s" }}
            >UNLOCK</motion.button>
            <button onClick={onCancel} style={{ padding: "12px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>
              CANCEL
            </button>
          </div>
        </motion.div>
        <AnimatePresence>
          {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ marginTop: 10, textAlign: "center", fontSize: 9, color: "rgba(255,80,80,0.6)", letterSpacing: "0.3em", fontFamily: "monospace" }}>ACCESS DENIED</motion.div>}
        </AnimatePresence>
      </>
    );
  }

  // ─── Main ─────────────────────────────────────────────────────
  export default function InnerCirclePage() {
    const [access, setAccess] = useState<"none" | "ic" | "admin">("none");

    useEffect(() => {
      if (typeof window === "undefined") return;
      const saved = sessionStorage.getItem("ic_access");
      if (saved === "admin" || saved === "ic") setAccess(saved as "ic" | "admin");
    }, []);

    const handleGateUnlock = (pass: string): boolean => {
      if (pass === ADMIN_PASS) {
        sessionStorage.setItem("ic_access", "admin");
        setAccess("admin");
        return true;
      }
      if (pass === IC_PASS) {
        sessionStorage.setItem("ic_access", "ic");
        setAccess("ic");
        return true;
      }
      return false;
    };

    return (
      <main style={{ position: "relative", background: "#000", minHeight: "100vh" }}>
        <AnimatePresence>
          {access === "none" && (
            <motion.div key="gate" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <GateScreen
                label="INNER CIRCLE"
                hint="This space is invitation-only."
                onUnlock={handleGateUnlock}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {access !== "none" && (
          <motion.div key="vault" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <VaultContent isAdmin={access === "admin"} />
          </motion.div>
        )}
      </main>
    );
  }