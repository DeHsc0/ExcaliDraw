import { EllipseData } from "../types/types"
import { useState } from "react"

export const useEllipse = () => {
    const [currentEllipse, setCurrentEllipse] = useState<EllipseData | null>(null)
    const [allEllipses, setAllEllipses] = useState<EllipseData[]>([])

    const startEllipse = (startX: number, startY: number) => {
        setCurrentEllipse({ centerX: startX, centerY: startY, radiusX: 0, radiusY: 0, rotation: 0 })
    }

    const updateEllipse = (currentX: number, currentY: number) => {
        if(!currentEllipse) return
        setCurrentEllipse({ 
            ...currentEllipse,
            radiusX: currentX - currentEllipse.centerX,
            radiusY: currentY - currentEllipse.centerY, 
        })
    }
    
    const finalizeEllipse = () => {
        if(!currentEllipse)return
        setAllEllipses((prev) => [...prev, currentEllipse])
        setCurrentEllipse(null)
        console.log("useEllipse:", allEllipses)
        console.log(currentEllipse)
    }

    return { finalizeEllipse, startEllipse, updateEllipse, allEllipses, currentEllipse }
}