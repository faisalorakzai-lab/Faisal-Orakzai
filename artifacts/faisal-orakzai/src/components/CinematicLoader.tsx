import { motion } from "framer-motion";
  import { useState, useEffect } from "react";

  interface Props {
    onComplete: () => void;
  }

  export function CinematicLoader({ onComplete }: Props) {
    const [phase, setPhase] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
      const timers = [
        setTimeout(() => setPhase(1), 300),
        setTimeout(() => setPhase(2), 1100),
        setTimeout(() => setPhase(3), 2000),
        setTimeout(() => setDone(true), 2800),
        setTimeout(() => onComplete(), 3400),
      ];
      return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    if (done) return null;

    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
        {/* Grid */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Corner brackets */}
        {phase >= 1 && (
          <>
            {[
              "top-8 left-8 border-t border-l",
              "top-8 right-8 border-t border-r",
              "bottom-8 left-8 border-b border-l",
              "bottom-8 right-8 border-b border-r",
            ].map((cls, i) => (
              <motion.div
                key={i}
                className={`absolute w-5 h-5 border-[#C9A84C]/25 ${cls}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </>
        )}

        <div className="relative flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.65, filter: "blur(24px)" }}
            animate={phase >= 1 ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <img
              src="/logo-nobg.png"
              alt="FO"
              className="w-[88px] h-[88px] object-contain select-none"
              style={{
                filter: "hue-rotate(-75deg) saturate(0.85) brightness(1.15) drop-shadow(0 0 24px rgba(201,168,76,0.45))",
              }}
            />
            {phase >= 1 && (
              <motion.div
                className="absolute inset-0 rounded-full border border-[#C9A84C]/15"
                animate={{ scale: [1, 2.8], opacity: [0.5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </motion.div>

          {/* Name + divider */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-3 min-w-[220px]"
          >
            <div className="text-[#C9A84C] tracking-[0.6em] text-[11px] font-light uppercase">
              FAISAL ORAKZAI
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={phase >= 2 ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/45 to-transparent"
            />
          </motion.div>

          {/* Status dot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
            className="flex items-center gap-2.5"
          >
            <motion.div
              className="w-[5px] h-[5px] rounded-full bg-[#C9A84C]"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
            <span className="text-[#C9A84C]/35 text-[9px] tracking-[0.55em] uppercase font-mono">
              INITIALIZING
            </span>
          </motion.div>
        </div>
      </div>
    );
  }