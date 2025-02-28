

import {Settings , X} from "lucide-react"

interface HeaderProps {
    username : string
}

export default function HeaderSection({username} : HeaderProps){

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
            <div>
                <button className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg">
                <Settings className="text-sky-500" />
                </button>
            </div>
        </div>
    )
}