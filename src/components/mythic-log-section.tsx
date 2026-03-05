"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, ExternalLink } from "lucide-react";
import { MythicLogData } from "@/lib/markdown";

interface MythicLogSectionProps {
  label: string;
  title: string;
  logs: MythicLogData[];
}

export default function MythicLogSection({ label, title, logs }: MythicLogSectionProps) {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-500">{label}</h2>
          <h3 className="text-5xl sm:text-6xl font-bold tracking-tight font-sans text-white lowercase leading-none">{title}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {logs && logs.length > 0 ? (
            logs.map((log) => (
              <a 
                key={log.id} 
                href={log.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-8 p-1 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800 hover:border-zinc-500 transition-all duration-700 overflow-hidden"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem]">
                  <Image
                    src={log.image}
                    alt={log.author}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                      <BookOpen className="w-4 h-4" /> {log.author}
                    </div>
                    <h4 className="text-3xl sm:text-4xl font-bold font-noto text-white">{log.title}</h4>
                  </div>
                </div>
                
                <div className="px-8 pb-10 flex flex-col gap-6 text-left">
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    {log.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read on note <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-zinc-500 italic">
              No logs found in the empire archives.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
