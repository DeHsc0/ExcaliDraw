"use client"

import { motion , AnimatePresence } from "framer-motion"
import {ChevronRight , Circle, Diamond, Github, Minus, MousePointer2, MoveUp, Square} from "lucide-react"
import {useRouter} from "next/navigation"
import  ToolBar  from "../components/ToolBar"
import Canvas from "./Canvas"

export default function Hero(){
    const router = useRouter()
  return (
    <div className="px-24 py-6 flex justify-between">
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
            <div 
            onClick={() => {
                router.push("/signup")
            }}
            className=" w-[500px] group overflow-hidden border-2 flex justify-center items-center bg-zinc-900 rounded-2xl relative">
                <div className="absolute top-4 z-0">
                    <div className="rounded-lg p-2 border-2 grid-cols-1 border-gray-600 bg-zinc-800">
                    <button className="p-2 rounded-lg text-blue-500"> 
                        <Diamond />
                    </button>
                    <button className="p-2 rounded-lg text-blue-500"> 
                        <Square />
                    </button>
                    <button className="p-2 rounded-lg text-blue-500"> 
                        <Circle />
                    </button>
                    <button className="p-2 rounded-lg text-blue-500">
                        <MoveUp />
                    </button>
                    <button className="p-2 rounded-lg text-blue-500">
                        <Minus/>
                    </button>
                    <button className="p-2 rounded-lg text-blue-500">
                        <MousePointer2 />
                    </button>
                    </div>
                </div>
                
                <div className="absolute inset-0 bg-zinc-900 bg-opacity-20 backdrop-blur-sm"></div>
                <div className="z-10 text-center">
                    <h2 className="text-2xl text-gray-400 group-hover:text-white duration-300 mb-2">Click here to get started</h2>
                </div>
    </div>

    </div>
  )
}
