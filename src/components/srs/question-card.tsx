"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

type QuestionCardProps = {
  question: {
    id: number;
    text: string;
    category: string;
  };
  onAnswer: (answer: "yes" | "no") => void;
  index: number;
  total: number;
};

export default function QuestionCard({ question, onAnswer, index, total }: QuestionCardProps) {
  return (
    <div className="relative w-full max-w-md aspect-[3/4] mx-auto">
      <motion.div
        key={question.id}
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 1.1, opacity: 0, y: -50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-zinc-200/50"
      >
        {/* Header */}
        <div className="flex justify-between items-center text-zinc-400 text-xs font-mono tracking-widest">
          <span>Q.{String(index + 1).padStart(2, "0")} / {total}</span>
          <span className="uppercase text-amber-600/50 font-bold">{question.category}</span>
        </div>

        {/* Question Text */}
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => onAnswer("no")}
            className="group flex items-center justify-center gap-2 py-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-red-50 hover:border-red-200 transition-all duration-200"
          >
            <X className="w-5 h-5 text-zinc-400 group-hover:text-red-500 transition-colors" />
            <span className="text-sm font-bold text-zinc-500 group-hover:text-red-500 transition-colors">NO</span>
          </button>
          
          <button
            onClick={() => onAnswer("yes")}
            className="group flex items-center justify-center gap-2 py-4 rounded-xl border border-amber-200 bg-zinc-900 hover:bg-zinc-800 hover:border-amber-300 transition-all duration-200 shadow-lg shadow-zinc-900/20"
          >
            <Check className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-white">YES</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-100 rounded-t-3xl overflow-hidden">
          <motion.div
            className="h-full bg-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
