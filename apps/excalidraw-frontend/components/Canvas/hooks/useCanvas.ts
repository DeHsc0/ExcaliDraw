import { useEffect, useRef } from 'react'
import { RectData,CircleData ,  DiamondPoints, EllipseData} from '../types/types'
import { drawRect, drawCircle , drawDiamond, drawEllipse } from '../utils/drawUtils'

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return null
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    return ctx
  }

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const drawAllShapes = (
    ctx: CanvasRenderingContext2D,
    rects: RectData[],
    circles: CircleData[],
    diamondPoints : DiamondPoints[],
    allEllipses : EllipseData[],
    currentEllipse : EllipseData | null,
    currentRect: RectData | null,
    currentCircle: CircleData | null,
    currentDiamond : DiamondPoints | null
  ) => {
    clearCanvas(ctx)
    diamondPoints.forEach( diamond => drawDiamond(ctx , diamond))
    rects.forEach(rect => drawRect(ctx, rect))    
    circles.forEach(circle => drawCircle(ctx, circle))
    allEllipses.forEach( ellipse => drawEllipse(ctx , ellipse))

    if (currentEllipse) drawEllipse(ctx , currentEllipse)
    if (currentDiamond) drawDiamond(ctx , currentDiamond)
    if (currentRect) drawRect(ctx, currentRect)
    if (currentCircle) drawCircle(ctx, currentCircle)
  }

  return { canvasRef, setupCanvas, drawAllShapes }
}