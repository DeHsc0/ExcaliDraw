"use client"

import { motion , AnimatePresence } from "framer-motion"
import {ChevronRight , Github} from "lucide-react"
import {useRouter} from "next/navigation"

export default function Hero(){
    const router = useRouter()
  return (
    <div className="px-24 py-6 flex justify-between">
        <AnimatePresence>
            <motion.div
                initial={{
                    translateY : "60px",
                    opacity : 0
                }}
                transition={{
                    duration : 1
                }}
                animate={{
                    opacity : 1,
                    translateY : "0px",
                }}
                className="flex-col justify-between space-y-10">
                    <div>
                    <h1 className="font-bold text-7xl leading-tight">
                        Create Art 
                    </h1>
                    <span className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-sky-500 leading-tight">
                        Together
                    </span>
                    </div>
                    <div>
                    <p className="text-zinc-400 max-w-[600px] text-lg">
                        Experience the future of collaborative digital art. Draw, sketch and create together in real-time with artists worldwide.
                    </p>
                    </div>
                    <div className="flex space-x-4">
                    <button onClick={() => {
                        router.push("/login")
                    }} className="group bg-sky-500 p-4 rounded-3xl hover:bg-sky-600 duration-200 flex">
                        Start Drawing
                        <ChevronRight className="group-hover:translate-x-2" />
                    </button>
                    <button className="flex gap-2 bg-slate-800 text-gray-300 px-8 py-4 rounded-full hover:bg-slate-700">
                        <Github className="size-5" />
                        View Source
                    </button>
                    </div>
            </motion.div>

        </AnimatePresence>
      <div className="w-[500px] h-[400px] border-2 bg-slate-800 rounded-2xl flex">
        <AnimatePresence>
            <motion.canvas
                className="h-fit w-fit relative z-10">
          {/* Put the canvas component here */}
            </motion.canvas>
        </AnimatePresence>
      </div>
    </div>
  )
}
