"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";

interface NoteButtonProps {
  ruiUrl: string;
  kanakoUrl: string;
  ruiText: string;
  kanakoText: string;
}

export default function NoteButton({ ruiUrl, kanakoUrl, ruiText, kanakoText }: NoteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 items-center justify-center rounded-full border border-zinc-800 bg-black/50 backdrop-blur-md px-10 text-base font-bold text-white transition-colors hover:bg-zinc-900 gap-2 group"
      >
        <BookOpen size={18} />
        Read Note
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 pt-4 w-72 z-[200]"
          >
            <div className="p-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-xl shadow-2xl">
              <a
                href={ruiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-4 rounded-xl text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border-b border-zinc-800/50 last:border-0"
              >
                {ruiText}
              </a>
              <a
                href={kanakoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-4 rounded-xl text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
              >
                {kanakoText}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
