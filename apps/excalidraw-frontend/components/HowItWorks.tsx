"use client"

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HowItWorks() {
  const router = useRouter()
  return (
    <div className="relative z-20 mt-16 mb-14 flex flex-col items-center mx-24">
      <div className="flex flex-col w-full items-center gap-4 border border-zinc-600 py-10 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl">
        <h1 className="font-semibold text-3xl">Start Creating Together</h1>
        <p className="text-zinc-400 text-lg max-w-xl text-center">
          Join Thousands of artists and teams who are already creating amazing artwork together
        </p>
        <button onClick={() => {router.push("/login")}} className="group bg-sky-500 px-8 py-4 text-sm rounded-3xl flex items-center hover:bg-sky-600 transition-colors">
          Get Started Now
          <ArrowRight className="transition-transform group-hover:translate-x-2" />
        </button>
      </div>
    </div>
  );
}
