import { Copy, Crown, PenBox, Plus, Users, X } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

interface RoomData {
    id: string
    slug: string
    description: string
    adminId: string
    participants?: Array<any> 
}

interface RoomsProps {
    userId : string
    RoomData: RoomData[] 
}


export default function RoomsLayout(props : RoomsProps) {

    const {RoomData , userId} = props

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [alert, setAlert] = useState<string | null>(null)
    const [close, setClose] = useState(true)
    const [roomData, setRoomData] = useState<RoomData[]>(RoomData)

    const controls = useAnimation()

    const handleClick = async () => {
        if (!name || !description) {
            setAlert("Please fill all fields")
            return
        }
        
        try {
            const response = await axios.post("http://localhost:3001/create-room", {
                slug: name,
                description
            }, {
                withCredentials: true
            })
            
            setAlert(response.data.message)
            
           
            if (response.data.roomData) {
                setRoomData(prevRoomData => [...prevRoomData, response.data.roomData])
            }
            
            setName("")
            setDescription("")
        }
        catch (e) {
            console.error(e)
            setAlert("Failed to create room")
        }
    }

    useEffect(() => {
        if (!alert) return
        
        controls.start({
            translateY: "0px"
        }).then(() => {
            return new Promise((resolve) => setTimeout(resolve, 3000)) 
        }).then(() => {
            return controls.start({
                translateY: "-100px"
            })
        }).then(() => {
            setAlert(null)
        })
    }, [alert, controls])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setAlert("Room ID copied to clipboard")
            })
            .catch(err => {
                console.error('Failed to copy: ', err)
                setAlert("Failed to copy room ID")
            })
    }

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="flex p-6 justify-between w-full overflow-hidden">
                <div className="flex gap-4 overflow-hidden">
                    <Users className="text-sky-500" />
                    <h1 className="font-bold text-2xl">Your Rooms</h1>
                </div>
                <motion.button
                    onClick={() => setClose(false)}
                    whileTap={{ scale: 0.9 }}
                    className="flex gap-2 bg-slate-800 rounded-full px-5 p-2 hover:bg-slate-700 overflow-hidden"
                >
                    <Plus className="text-xs" />
                    New Room
                </motion.button>
            </div>
            
          
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center overflow-hidden">
                <motion.div 
                    initial={{
                        translateY: "-100px",
                    }}
                    animate={controls}
                    transition={{
                        duration: 0.2
                    }}
                    className="bg-slate-700 px-5 py-4 w-fit rounded-lg mt-2"
                >
                    <h1>{alert}</h1>
                </motion.div>
            </div>
            
            <div className={`fixed inset-0 z-40 backdrop-blur-lg ${close ? "hidden" : ""}`}>
                <div className="fixed inset-0 z-50 flex flex-col justify-center items-center overflow-hidden">
                    <div className="overflow-hidden flex justify-between min-w-96 p-6 border-b border-b-zinc-400 bg-slate-800/90 rounded-t-lg">
                        <h1 className="font-bold text-2xl self-start">
                            Create a Room
                        </h1>
                        <button
                            onClick={() => setClose(true)} 
                            className="rounded-lg bg-red-600 hover:bg-red-500 overflow-hidden"
                        >     
                            <X className="size-7 m-1" />
                        </button>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-b-lg flex flex-col min-w-96 gap-3 justify-start overflow-hidden">
                        <div className="flex flex-col gap-2 overflow-hidden">
                            <label className="text-lg font-bold">Name</label>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                type="text" 
                                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all" 
                            />
                        </div>
                        <div className="flex flex-col gap-2 overflow-hidden">
                            <label className="text-lg font-bold">Description</label>
                            <textarea 
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="overflow-hidden flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all h-32" 
                            />
                        </div>
                        <button
                            onClick={handleClick} 
                            className="flex gap-2 bg-sky-500 w-fit p-4 rounded-lg hover:bg-sky-600 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            
            
            <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full overflow-hidden">
                {roomData && roomData.length > 0 ? (
                    roomData.map((room) => (
                        <div key={room.id} className="bg-slate-800 p-6 rounded-2xl w-full overflow-hidden">
                            <div className="flex justify-between items-center">
                                <a
                                href={`/canvas/${room.id}`} 
                                className="text-xl hover:text-sky-500 hover:underline hover:cursor-pointer">
                                    {room.slug}
                                </a>
                                <div className="flex">
                                    <Crown className={`text-red-500 size-8 p-2 rounded-lg overflow-hidden hover:bg-red-500/20 transition-colors duration-300 ${room.adminId === userId ? "" : "hidden"} `}/>
                                    <PenBox
                                        
                                        className="text-sky-600 size-8 p-2 rounded-lg overflow-hidden hover:bg-sky-500/20 transition-colors duration-300" 
                                    />
                                </div>
                            </div>                   
                            <p className="line-clamp-2 text-zinc-400 mt-2 mb-4">
                                {room.description}
                            </p>
                            <div className="flex justify-between items-center gap-4 overflow-hidden">
                                <h1 
                                    className="flex-1 font-mono bg-slate-900 border border-slate-700 rounded-3xl px-4 py-2 text-white text-lg overflow-hidden text-ellipsis"
                                >
                                    {room.id}
                                </h1>
                                <button 
                                    onClick={() => copyToClipboard(room.id)}
                                    aria-label="Copy room ID"
                                >
                                    <Copy className="text-sky-600 size-8 p-2 rounded-lg hover:bg-sky-500/20 transition-colors duration-300" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-zinc-400">
                        No rooms found. Create a new room to get started.
                    </div>
                )}
            </div>
        </div>
    )
}