"use client"

import { useState, useEffect } from 'react'
import { useRect } from './hooks/useRect'

import { useCanvas } from './hooks/useCanvas'
import { useDiamond } from "./hooks/useDiamond"
import { Toolbar } from './ToolBar'
import { DrawingMode } from './types/types'
import { useEllipse } from './hooks/useEllipse'
import { useCircle } from './hooks/useCircle'

export default function Canvas() {
  const [drawingMode, setDrawingMode] = useState<DrawingMode>(null)
  const { canvasRef, setupCanvas, drawAllShapes } = useCanvas()
  const { rects, currentRect, startRect, updateRect, finalizeRect } = useRect()
  const {circles, currentCircle, startCircle, updateCircle, finalizeCircle } = useCircle()
  const { allEllipses , currentEllipse , startEllipse , updateEllipse , finalizeEllipse } = useEllipse() 
  
  const [isDrawing, setIsDrawing] = useState(false)
  const { startDiamond , updateDiamond , finalizeDiamond , diamondPoints , currentDiamondPoints } = useDiamond()

  useEffect(() => {
    const ctx = setupCanvas()
    if (!ctx) return

    drawAllShapes(
      ctx,
      rects,
      circles,
      diamondPoints,
      allEllipses,
      currentEllipse, 
      currentRect,
      currentCircle,
      currentDiamondPoints)
  }, [rects,
    circles,
    diamondPoints,
    allEllipses,
    currentEllipse,
    currentRect,
    currentCircle,
    currentDiamondPoints])

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent    
    setIsDrawing(true)
    if(drawingMode === "ellipse") startEllipse(offsetX , offsetY)  
    if(drawingMode === "diamond") startDiamond(offsetX , offsetY)
    if (drawingMode === 'rect') startRect(offsetX, offsetY)
    if(drawingMode === "circle") startCircle(offsetX , offsetY)
    
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = event.nativeEvent
    
    if(drawingMode === "ellipse") updateEllipse(offsetX , offsetY)
    if(drawingMode === "diamond") updateDiamond(offsetX , offsetY)
    if (drawingMode === 'rect') updateRect(offsetX, offsetY)
    if(drawingMode === "circle") updateCircle(offsetX , offsetY)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    
    if(drawingMode === "ellipse") finalizeEllipse()
    if(drawingMode === "diamond") finalizeDiamond()
    if (drawingMode === 'rect') finalizeRect()
    if(drawingMode === "circle") finalizeCircle()
    
  }

  return (
    <div className="h-screen w-screen bg-zinc-900 overflow-hidden">
      <Toolbar drawingMode={drawingMode} setDrawingMode={setDrawingMode} />
      <canvas
        className="relative"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  )
}