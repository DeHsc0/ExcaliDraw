"use client"

import { useRouter } from "next/navigation"

export default function NavBar(){

  const router = useRouter()

    return (
      <nav className="flex px-24 py-6 justify-between">
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
            strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette text-sky-500 size-8">
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
          </svg>                
          <h1 className="font-bold text-white text-2xl">DrawTogether</h1>
        </div>            
        <div className="grid-cols-1 space-x-8">
          <a className="text-zinc-400 hover:text-white" href="">Features</a>
          <a className="text-zinc-400 hover:text-white" href="">How it works</a>
          <a className="text-zinc-400 hover:text-white" href="">Pricing</a>
          <button onClick={() => {router.push("/signup")}} className="bg-sky-500 px-4 py-2 rounded-3xl hover:bg-sky-600 duration-200">Get Started</button>
        </div>
      </nav>
    )
  }
  