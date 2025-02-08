import { useState } from 'react'
import { RectData } from '../types/types'

export const useRect = () => {
  const [rects, setRects] = useState<RectData[]>([])
  const [currentRect, setCurrentRect] = useState<RectData | null>(null)

  const startRect = (x: number, y: number) => {
    setCurrentRect({ x, y, width: 0, height: 0 })
  }

  const updateRect = (x: number, y: number) => {
    if (!currentRect) return
    setCurrentRect({
      ...currentRect,
      width: x - currentRect.x,
      height: y - currentRect.y,
    })
  }

  const finalizeRect = () => {
    if (!currentRect)return 
      setRects(prev => [...prev, currentRect])
      setCurrentRect(null)
    
  }

  return { rects, currentRect, startRect, updateRect, finalizeRect }
}