import { RectData , CircleData, DiamondPoints, EllipseData } from "../types/types"

export const drawRect = (
    ctx: CanvasRenderingContext2D,
    rect: RectData,
  ) => {
    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.lineWidth = 4
    ctx.roundRect(rect.x, rect.y, rect.width, rect.height, 30)
    ctx.stroke()
    
  }

  export const drawEllipse = (
    ctx: CanvasRenderingContext2D,
    ellipse: EllipseData
  ) => {
    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.lineWidth = 4
    
    ctx.ellipse(
      ellipse.centerX,
      ellipse.centerY,
      Math.abs( ellipse.radiusX),
      Math.abs(ellipse.radiusY),
      0, 
      0, 
      2 * Math.PI 
    )
    ctx.stroke()
  }
  
export const drawCircle = (
    ctx: CanvasRenderingContext2D,
    circle: CircleData,
  ) => {
    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.lineWidth = 4
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
    ctx.stroke()

  }

export const drawDiamond = (
  ctx : CanvasRenderingContext2D,
  diamond : DiamondPoints
) => {
  ctx.beginPath()
  ctx.moveTo(diamond.topX, diamond.topY) 
  ctx.lineTo(diamond.rightX, diamond.rightY)
  ctx.lineTo(diamond.bottomX, diamond.bottomY) 
  ctx.lineTo(diamond.leftX, diamond.leftY) 
  ctx.closePath() 
  ctx.strokeStyle = "white"
  ctx.lineWidth = 4
  ctx.stroke() 
}