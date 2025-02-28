"use client"

import HeaderSection from "@/components/HeaderSectoin"
import JoinRoom from "@/components/JoinRoom"
import RoomsLayout from "@/components/RoomsLayout"


import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"

interface RoomData {
    id: string
    slug: string
    description: string
    adminId: string
}

interface UserData {
    id : string,
    participantOf: RoomData[]
    username: string
}

export default function Dashboard() {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    
    const fetchUserRooms = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:3001/get-all-rooms", {
                withCredentials: true
            })
            return response.data
        } catch (error) {
            console.error("Error fetching rooms:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await fetchUserRooms()
                setUserData(data.userData)
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    router.push('/login')
                } else {
                    setError("Failed to load your rooms. Please try again later.")
                }
            }
        }
        
        checkAuth()
    }, [router])

    
    if (isLoading) {
        return (
            <div className="bg-slate-900 h-screen w-screen flex items-center justify-center">
                <div className="text-white">
                    Loading your rooms...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-slate-900 h-screen w-screen flex items-center justify-center">
                <div className="text-white bg-slate-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Error</h2>
                <p>{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 bg-sky-500 px-4 py-2 rounded-lg hover:bg-sky-600"
                >
                    Try Again
                </button>
                </div>
            </div>
        )
    }

    if (!userData) {
        router.push("/signup")
        return (
            <div className="bg-slate-900 h-screen w-screen flex items-center justify-center">
                <div className="text-white">User Not Found</div>
            </div>
        )
    }


    return (
        <div className="bg-slate-900 min-h-screen w-full">
            <HeaderSection username={userData.username} />
            <JoinRoom />
            <RoomsLayout RoomData={userData.participantOf} userId={userData.id}/>
        </div>
    )
}