import { useState } from 'react'
import { CircleData } from '../types/types'

export const useCircle = () => {
  const [circles, setCircles] = useState<CircleData[]>([])
  const [currentCircle, setCurrentCircle] = useState<CircleData | null>(null)

  const startCircle = (x: number, y: number) => {
    setCurrentCircle({ x, y, radius: 0 })
  }

  const updateCircle = (x: number, y: number) => {
    if (!currentCircle) return
    const radius = Math.sqrt(
      Math.pow(x - currentCircle.x, 2) + Math.pow(y - currentCircle.y, 2)
    )
    setCurrentCircle({ ...currentCircle, radius })
  }

  const finalizeCircle = () => {
    if (currentCircle) {
      setCircles(prev => [...prev, currentCircle])
      setCurrentCircle(null)
    }
  }

  return { circles, currentCircle, startCircle, updateCircle, finalizeCircle }
}