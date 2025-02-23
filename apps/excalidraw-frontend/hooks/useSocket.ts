import { useEffect, useCallback, useState } from 'react'
import { Shape } from '../types/types'
import {WS_URL} from "@repo/common/secrets"

export default function useSocket() {

    const [receivedShapes , setRecievedShapes ] = useState<Shape[]>([])
    
    const [socket, setSocket] = useState<WebSocket | null>(null)
    
    useEffect(() => {

        const ws = new WebSocket(WS_URL)
        
        ws.onopen = () => {
            console.log('WebSocket connected')
            setSocket(ws)
        }
        
        ws.onmessage = (msg) => {
            if(!msg)return 
            const parsedMsg = JSON.parse(msg.data)
            if(!parsedMsg.message)return 
            if(receivedShapes === parsedMsg.message)return
            setRecievedShapes((prev) => [...prev , ...parsedMsg.message])

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

    return { sendMessage , receivedShapes}
}