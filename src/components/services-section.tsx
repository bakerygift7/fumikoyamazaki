"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, ShieldCheck, PenTool, Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";
import { ServiceData } from "@/lib/markdown";
import kanakoWork1 from "@/assets/images/kanako_work_1.png";
import kanakoWork2 from "@/assets/images/kanako_work_2.png";

const iconMap = {
  "philosophy-extraction": Zap,
  "mythic-storytelling": PenTool,
  "srs-website": ShieldCheck,
  "future-timeline": Sparkles,
};

interface ServicesSectionProps {
  label: string;
  title: string;
  services: ServiceData[];
}

export default function ServicesSection({ label, title, services }: ServicesSectionProps) {
  // 構造をFlexboxに変更するため、データを分割
  const mainService = services && services.length > 0 ? services[0] : null;
  const subServices = services && services.length > 1 ? services.slice(1, 3) : [];
  const wideService = services && services.length > 3 ? services[3] : null;

  const ServiceCard = ({ service, isMain = false, isWide = false }: { service: ServiceData, isMain?: boolean, isWide?: boolean }) => {
    const Icon = iconMap[service.id as keyof typeof iconMap] || Sparkles;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [kanakoWork1, kanakoWork2];

    useEffect(() => {
      if (!isMain) return;
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }, [isMain]);
    
    return (
      <div 
        className={`group relative flex flex-col gap-6 p-8 rounded-[2.5rem] border border-zinc-800 transition-all duration-700 overflow-hidden hover:border-zinc-500 w-full h-full ${
          isMain ? "bg-black" : 
          isWide ? "bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" :
          "bg-zinc-900/50"
        }`}
      >
        {/* Main Card Slideshow Background */}
        {isMain && (
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={images[currentImageIndex]}
                    alt=""
                    fill
                    className="object-cover opacity-60"
                    priority
                    unoptimized
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          </div>
        )}

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
        
        <div className={`relative z-20 flex ${isWide ? 'flex-col md:flex-row items-start md:items-center justify-between' : 'flex-col h-full'} gap-6`}>
          <div className={`flex flex-col gap-6 ${isWide ? 'max-w-2xl' : ''}`}>
            {/* Icon Container */}
            <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 w-fit group-hover:scale-110 group-hover:bg-white transition-all duration-700 shadow-xl">
              <Icon 
                size={isMain ? 40 : 24} 
                className="text-white group-hover:text-black transition-colors duration-700" 
              />
            </div>
            <div className="flex flex-col gap-2 text-left">
              {service.label && (
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1">{service.label}</div>
              )}
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{service.subtitle}</div>
              <h4 className={`${isMain ? 'text-4xl sm:text-5xl' : 'text-2xl'} font-bold font-noto text-white`}>{service.title}</h4>
            </div>
            <p className="text-zinc-400 leading-relaxed text-sm text-left mb-8">
              {service.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 group-hover:text-white transition-colors mt-auto pt-4">
            VIEW DETAILS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">{label}</h2>
          <h3 className="text-5xl sm:text-7xl font-bold tracking-tighter font-noto text-white">{title}</h3>
        </div>

        <div className="flex flex-col gap-8">
          {/* 上段：左右分割 (Main + Subs) */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* 左カラム：Main (2/3) */}
            <div className="w-full lg:w-2/3 min-h-[600px]">
              {mainService && <ServiceCard service={mainService} isMain />}
            </div>
            
            {/* 右カラム：Subs (1/3) */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              {subServices.map((service) => (
                <div key={service.id} className="flex-1 min-h-[400px]">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          {/* 下段：Wide */}
          {wideService && (
            <div className="w-full min-h-[300px]">
              <ServiceCard service={wideService} isWide />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
