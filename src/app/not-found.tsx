import Link from "next/link";
import Navbar from "@/components/navbar";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      <Navbar />
      
      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 animate-fade-in">
          {/* Icon */}
          <div className="w-24 h-24 rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-sm mb-4">
            <Compass className="w-12 h-12 text-zinc-300 animate-pulse" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4">
            <h1 className="text-8xl font-bold tracking-tighter text-black">404</h1>
            <h2 className="text-2xl font-bold text-zinc-800">道を見失ったようだ。</h2>
            <p className="text-zinc-500 leading-relaxed max-w-md mx-auto">
              あなたが探している「真実」は、ここには存在しないか、あるいは別の時空へ移動したようだ。
            </p>
          </div>

          {/* Action */}
          <Link 
            href="/" 
            className="inline-flex h-14 items-center justify-center rounded-full bg-black px-10 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-zinc-200 group mt-4"
          >
            帝国の中心へ戻る
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>

      <footer className="py-12 px-6 text-center">
        <div className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-300">
          Lost in the Mythos
        </div>
      </footer>
    </div>
  );
}
