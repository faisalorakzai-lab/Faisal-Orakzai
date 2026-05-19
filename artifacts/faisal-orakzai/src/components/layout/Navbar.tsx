import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/thinking", label: "Thinking" },
  { href: "/systems", label: "Systems" },
  { href: "/projects", label: "Projects" },
  { href: "/legacy", label: "Legacy" },
  { href: "/journal", label: "Journal" },
  { href: "/inner-circle", label: "Inner Circle" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12 bg-black/50 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="text-primary font-medium tracking-[0.2em] text-sm uppercase">
          Faisal Orakzai
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wider uppercase transition-colors duration-800 ${
                location === link.href ? "text-primary" : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(true)}
          data-testid="button-menu-open"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-black border-l border-white/10 flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button
                className="text-white"
                onClick={() => setIsOpen(false)}
                data-testid="button-menu-close"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col space-y-6 mt-16">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl tracking-widest uppercase transition-colors duration-500 ${
                    location === link.href ? "text-primary" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
