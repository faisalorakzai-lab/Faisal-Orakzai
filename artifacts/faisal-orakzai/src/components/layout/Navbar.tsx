import { useState, useEffect } from "react";
  import { Link, useLocation } from "wouter";
  import { Menu, X } from "lucide-react";
  import { motion, AnimatePresence } from "framer-motion";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/thinking", label: "Thinking" },
    { href: "/systems", label: "Systems" },
    { href: "/projects", label: "Projects" },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  export function Navbar() {
    const [location] = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 40);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location]);

    return (
      <>
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-500 ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl border-b border-white/5"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.2 }}>
              <img
                src="/logo-nobg.png"
                alt="FO"
                className="w-8 h-8 object-contain"
                style={{
                  filter:
                    "hue-rotate(-75deg) saturate(0.85) brightness(1.15) drop-shadow(0 0 8px rgba(201,168,76,0.35))",
                }}
              />
            </motion.div>
            <span className="text-[#C9A84C] text-[11px] tracking-[0.35em] uppercase font-light hidden sm:block">
              Faisal Orakzai
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  location === link.href
                    ? "text-[#C9A84C]"
                    : "text-white/35 hover:text-white/75"
                }`}
              >
                {link.label}
                {location === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#C9A84C]/50"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white/50 hover:text-white/90 transition-colors p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.header>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-40 bg-black/96 backdrop-blur-2xl flex flex-col justify-center items-start px-10 lg:hidden"
            >
              <div className="absolute top-5 right-6">
                <button onClick={() => setIsOpen(false)} className="text-white/35 hover:text-white p-1">
                  <X size={18} />
                </button>
              </div>
              <nav className="space-y-7">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`block text-2xl font-light tracking-wide transition-colors duration-200 ${
                        location === link.href
                          ? "text-[#C9A84C]"
                          : "text-white/50 hover:text-white/90"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-14 h-px w-10 bg-[#C9A84C]/25" />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }