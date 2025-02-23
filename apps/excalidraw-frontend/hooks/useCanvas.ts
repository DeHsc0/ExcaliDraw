import { useRef } from "react"

export const useCanvas = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const setupCanvas = () => {
        const canvas = canvasRef.current
        if(!canvas)return
        
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const ctx = canvas.getContext("2d")
        return ctx
    }

    return {setupCanvas , canvasRef}
}