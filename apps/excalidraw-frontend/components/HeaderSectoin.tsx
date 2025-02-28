"use client"

import {LogOut, Settings , X} from "lucide-react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

interface HeaderProps {
    username : string
}

export default function HeaderSection({username} : HeaderProps){

    const router = useRouter()

    return (
        <div className="flex justify-between p-6">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <h1 className="text-4xl text-white font-bold">
                        Welcome back,
                    </h1>
                    <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-100 to-sky-500">{username}!</span>
                </div>
                <p className="text-zinc-400 text-lg">Your creative workspace awaits</p>
            </div>
            <div className="space-x-4">
                <button
                onClick={() => {
                    Cookies.remove("cookie")
                    router.push("/")
                }}
                 className="group bg-slate-800 hover:bg-red-500/20 p-2 rounded-lg">
                <LogOut className="text-red-600 rounded-lg transition-colors duration-300" />
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg">
                <Settings className="text-sky-500" />
                </button>
            </div>
        </div>
    )
}