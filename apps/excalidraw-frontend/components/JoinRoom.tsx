"use client"

import { Search, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"



export default function JoinRoom() {
    
    const router = useRouter()
    const [roomId , setRoomId] = useState<string | undefined>(undefined)
    
    
    return (
        <div>
            <div className="bg-slate-800 p-6 rounded-2xl mb-8 mx-6 mt-2">
                <h2 
                
                className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search w-5 h-5 text-sky-500"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                Join a Room
                </h2>
                <div className="flex gap-4">
                    <input
                    onChange={(event) => setRoomId(event.currentTarget.value) } 
                    type="text" placeholder="Enter room code" className="flex-1 bg-slate-900 border border-slate-700 rounded-3xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"/>
                    <button
                    onClick={() => {
                        
                        
                    }} 
                    className="bg-sky-500 text-white px-6 py-2 rounded-3xl flex items-center gap-2 hover:bg-sky-600 transition-colors group">
                        Join Room
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-4 h-4 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}