"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, Heart, BookOpen, Mail, ChevronDown } from "lucide-react";

type NavItem = {
  name: string;
  labelJA: string;
  href: string;
  icon: any;
  dropdown?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
    { name: "HOME", labelJA: "ホーム", href: "/", icon: Home },
    { name: "ABOUT", labelJA: "私について", href: "/about", icon: User },
    { name: "E-BOOK", labelJA: "小冊子", href: "#ebook", icon: BookOpen },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 管理画面等は表示しない
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <nav
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999999 }}
        className="transition-all duration-500 py-6 bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className={`font-mincho text-xl font-bold tracking-widest transition-colors duration-300 ${
              isScrolled ? "text-charcoal" : "text-charcoal"
            }`}>
              Fumiko Yamazaki
            </span>
          </Link>

          {/* Desktop Navigation (Floating Pill) */}
          <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-transparent bg-white/40 backdrop-blur-sm shadow-sm transition-all duration-500">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all block group ${
                  pathname === item.href
                    ? "text-gold-600 bg-gold-50"
                    : "text-gray-600 hover:text-gold-600 hover:bg-white"
                }`}
              >
                <div className="flex flex-col items-center leading-none gap-1">
                  <span className="font-gothic tracking-widest">{item.name}</span>
                  <span className="text-[9px] font-medium opacity-60 group-hover:opacity-100 transition-opacity tracking-widest">{item.labelJA}</span>
                </div>
              </Link>
            ))}
            <div className="h-8 w-[1px] bg-gray-200 mx-2" />
            <Link href="/contact">
              <button className="px-6 py-2 rounded-full text-sm font-bold bg-charcoal text-white hover:bg-gold-600 transition-colors tracking-widest">
                CONTACT
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-full transition-all text-charcoal bg-white/50 backdrop-blur-md"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[140] md:hidden bg-white/95 backdrop-blur-2xl pt-32 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-8 pb-12">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-3xl font-bold text-gray-400 hover:text-gold-600 transition-colors"
                >
                  <item.icon size={28} className="text-gold-400" />
                  <div className="flex flex-col items-start leading-none gap-2">
                    <span className="font-mincho text-charcoal">{item.name}</span>
                    <span className="text-sm font-gothic tracking-widest opacity-60">{item.labelJA}</span>
                  </div>
                </Link>
              ))}
              <div className="h-[1px] w-full bg-gray-100" />
              <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full">
                <button className="w-full py-5 rounded-xl bg-charcoal text-white text-xl font-bold hover:bg-gold-600 transition-colors tracking-widest">
                  CONTACT
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
