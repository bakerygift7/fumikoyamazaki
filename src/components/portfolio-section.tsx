"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PortfolioProjectData } from "@/lib/markdown";

interface PortfolioSectionProps {
  label: string;
  title: string;
  projects: PortfolioProjectData[];
}

function ExtractionCrossfade() {
  const [index, setIndex] = useState(0);
  const images = ["/images/extraction_1.png", "/images/extraction_2.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="理念抽出の現場"
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function PortfolioSection({ label, title, projects }: PortfolioSectionProps) {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">{label}</h2>
          <h3 className="text-5xl sm:text-7xl font-bold tracking-tighter font-noto text-white">{title}</h3>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}
            >
              {/* MacBook Frame Mockup */}
              <div className="flex-1 relative w-full group">
                <div className="relative aspect-[16/10] bg-zinc-800 rounded-t-xl border-t-8 border-x-8 border-zinc-700 overflow-hidden shadow-2xl shadow-black">
                  {Number(project.id) === 1 ? (
                    <ExtractionCrossfade />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  )}
                  {/* Screen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>
                {/* MacBook Bottom Part */}
                <div className="h-4 w-full bg-zinc-700 rounded-b-xl relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-600 rounded-b-md" />
                </div>
              </div>

              {/* Project Info */}
              <div className="flex-1 flex flex-col gap-6 text-left">
                <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">{project.category}</div>
                <h4 className="text-4xl sm:text-5xl font-bold font-noto text-white">{project.title}</h4>
                <p className="text-xl text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4">
                  <button className="h-12 px-8 rounded-full border border-zinc-800 hover:bg-white hover:text-black transition-all duration-500 text-sm font-bold uppercase tracking-widest text-white hover:text-black">
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
