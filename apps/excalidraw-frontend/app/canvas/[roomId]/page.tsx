"use client"

import Canvas from "@/components/Canvas"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

export default function CanvasPage(){

    interface RoomShapes {
        state : string
    }

    const [cookie , setCookie] = useState<string | undefined>(undefined)
    const {roomId} = useParams()  
    const [ roomShapes , setRoomShapes ] = useState<RoomShapes | undefined>(undefined)    

    function extractJwtFromCookie(cookieString: string): string | undefined {
            
            if (cookieString.startsWith("cookie=")) {
                return cookieString.substring(7) 
            }
            
            const parts = cookieString.split('=')
            
            if (parts.length >= 2) {
                return parts[1]
            }
            
            return undefined
        }
        
        useEffect(() => {
            if(!document.cookie)return
            const extractedCookie = extractJwtFromCookie(document.cookie)
            if(!extractedCookie)return 
            setCookie(() => extractedCookie)
            const checkAuth = async () => {
                const data = await fetchRoomShapes()
                setRoomShapes(() => data.roomShapes)
            }
            checkAuth()
        } , [])        

        const fetchRoomShapes = async () => {
            try {
                
                const response = await axios.post("http://localhost:3001/get-room", {
                    roomId
                } , {
                    withCredentials: true
                })
                return response.data
            } catch (error) {
                console.error("Error fetching rooms:", error)
                throw error
            } 
        }
        
    if(!cookie || !roomId || Array.isArray(roomId) || !roomShapes){
        return
    }

    console.log(roomShapes)

    return (
    <Canvas token={cookie} roomId={roomId} state={roomShapes.state} />
    )

}