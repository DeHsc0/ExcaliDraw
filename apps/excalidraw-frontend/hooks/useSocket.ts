import { useEffect, useCallback, useState } from 'react'
import { Shape } from '../types/types'
import {WS_URL} from "@repo/common/secrets"

export default function useSocket(cookie : string) {

    interface ParsedMsg {
        type : string,
        roomId : string,
        state : string,
        message ?: string
    }

    interface ShapesData {
        shapes : Shape[]
    }

    const [receivedShapes , setRecievedShapes ] = useState<Shape[]>([])
    const [receivedMsg , setRecievedMsg] = useState<string | undefined>(undefined)
    
    const [socket, setSocket] = useState<WebSocket | null>(null)
    
    useEffect(() => {

        const ws = new WebSocket(`${WS_URL}?token=${cookie}`)
        
        ws.onopen = () => {
            console.log('WebSocket connected')
            setSocket(ws)
        }
        
        ws.onmessage = (msg) => {
            try{
                if(!msg)return 
                const parsedMsg : ParsedMsg = JSON.parse(msg.data)
                if(!parsedMsg.message){
                    const shapesData : ShapesData = JSON.parse(parsedMsg.state)
                if(shapesData.shapes.length < 0 || shapesData.shapes.length === 0)return
                
                setRecievedShapes((prev) => [...prev , ...shapesData.shapes])                    
                } else {
                    setRecievedMsg(() => parsedMsg.message)
                }
            }
            catch(e){
                return
            }

        }

        ws.onclose = () => {
            console.log('WebSocket disconnected')
            setSocket(null)
        }

        ws.onerror = (error) => {
            console.log('WebSocket error:', error)
        }

        return () => {
            ws.close()
        }
    }, [])

    const sendMessage = useCallback((message: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message)
        } else {
            console.log('WebSocket is not open')
        }
        
    }, [socket])

    return { sendMessage , receivedShapes , receivedMsg , socket }
}