
import { Shape } from "../types/types"

export function drawAllShapes(ctx : CanvasRenderingContext2D, shapes? : Shape[]  , currentShape? : Shape ){

    if(shapes){
        shapes.forEach((shape) => {
            switch(shape.type){
                case "rect":
                    if(!shape.width || !shape.height || !shape.style)return 
                    ctx.beginPath()
                    ctx.strokeStyle = shape.style.strokeColor 
                    ctx.lineWidth = 4
                    ctx.roundRect(shape.x, shape.y, shape.width, shape.height, 30)
                    ctx.stroke()
                    break
                case "ellipse":
                    if(!shape.width || !shape.height || !shape.style)return 
                    ctx.beginPath()
                    ctx.strokeStyle = shape.style.strokeColor
                    ctx.ellipse(shape.x + shape.width/2, shape.y + shape.height/2, Math.abs(shape.width/2), Math.abs(shape.height/2) , 0, 0, 2 * Math.PI)
                    ctx.stroke()
                    break
                case "diamond":
                    if(!shape.topX || !shape.topY || !shape.bottomX || !shape.bottomY || !shape.rightX || !shape.rightY || !shape.leftX || !shape.leftY || !shape.style)return
    
                    ctx.beginPath()
                    ctx.moveTo(shape.topX, shape.topY) 
                    ctx.lineTo(shape.rightX, shape.rightY)
                    ctx.lineTo(shape.bottomX, shape.bottomY) 
                    ctx.lineTo(shape.leftX, shape.leftY) 
                    ctx.closePath() 
                    ctx.strokeStyle = shape.style.strokeColor 
                    ctx.lineWidth = 4
                    ctx.stroke() 
                    break
                case "arrow":
                    if(!shape.endX || !shape.endY || !shape.style)return
                    const headLength = 20 
                    const angle = Math.atan2(shape.endY - shape.y, shape.endX - shape.x)
    
                  
                    ctx.beginPath()
                    ctx.moveTo(shape.x, shape.y)
                    ctx.lineTo(shape.endX, shape.endY)
                    ctx.lineWidth = 4
                    ctx.strokeStyle = shape.style.strokeColor
                    ctx.stroke()
    
                    
                    ctx.beginPath()
                    ctx.moveTo(shape.endX, shape.endY)
                    ctx.lineTo(
                    shape.endX - headLength * Math.cos(angle - Math.PI / 6),
                    shape.endY - headLength * Math.sin(angle - Math.PI / 6)
                    )
                    ctx.lineWidth = 4
                    ctx.strokeStyle = shape.style.strokeColor
                    ctx.stroke()
    
                    
                    ctx.beginPath()
                    ctx.moveTo(shape.endX, shape.endY)
                    ctx.lineTo(
                        shape.endX - headLength * Math.cos(angle + Math.PI / 6),
                        shape.endY - headLength * Math.sin(angle + Math.PI / 6)
                    )
                    ctx.lineWidth = 4
                    ctx.strokeStyle = shape.style.strokeColor
                    ctx.stroke()
                    break
                case "line":
                    if(!shape.style || !shape.endX || !shape.endY)return
                    ctx.beginPath()
                    ctx.moveTo(shape.x, shape.y)
                    ctx.lineTo(shape.endX, shape.endY)
                    ctx.lineWidth = 4
                    ctx.strokeStyle = shape.style.strokeColor
                    ctx.stroke()
                    
                    break
            }
        })    
    }

    if(currentShape){
        switch(currentShape.type){
            case "rect":
                if(!currentShape.width || !currentShape.height || !currentShape.style)return 
                ctx.beginPath()
                ctx.strokeStyle = currentShape.style.strokeColor 
                ctx.lineWidth = 4
                ctx.roundRect(currentShape.x, currentShape.y, currentShape.width, currentShape.height, 30)
                ctx.stroke()
                break 
                
            case "ellipse":    
                if(!currentShape.width || !currentShape.height || !currentShape.style)return 
                ctx.beginPath()
                ctx.lineWidth = 4
                ctx.strokeStyle = currentShape.style?.strokeColor 
                ctx.ellipse(currentShape.x + currentShape.width/2, currentShape.y + currentShape.height/2, Math.abs(currentShape.width/2), Math.abs(currentShape.height/2), 0, 0, 2 * Math.PI)
                ctx.stroke()
                break
            case "diamond":
                if(!currentShape.topX || !currentShape.topY || !currentShape.bottomX || !currentShape.bottomY || !currentShape.rightX || !currentShape.rightY || !currentShape.leftX || !currentShape.leftY || !currentShape.style)return
                
                ctx.beginPath()
                ctx.moveTo(currentShape.topX, currentShape.topY) 
                ctx.lineTo(currentShape.rightX, currentShape.rightY)
                ctx.lineTo(currentShape.bottomX, currentShape.bottomY) 
                ctx.lineTo(currentShape.leftX, currentShape.leftY) 
                ctx.closePath() 
                ctx.strokeStyle = currentShape.style.strokeColor 
                ctx.lineWidth = 4
                ctx.stroke() 
                break
            case "arrow":
                if(!currentShape.endX || !currentShape.endY || !currentShape.style)return
                const headLength = 20 
                const angle = Math.atan2(currentShape.endY - currentShape.y, currentShape.endX - currentShape.x)

               
                ctx.beginPath()
                ctx.moveTo(currentShape.x, currentShape.y)
                ctx.lineTo(currentShape.endX, currentShape.endY)
                ctx.lineWidth = 4
                ctx.strokeStyle = currentShape.style.strokeColor
                ctx.stroke()

               
                ctx.beginPath()
                ctx.moveTo(currentShape.endX, currentShape.endY)
                ctx.lineTo(
                currentShape.endX - headLength * Math.cos(angle - Math.PI / 6),
                currentShape.endY - headLength * Math.sin(angle - Math.PI / 6)
                )
                ctx.lineWidth = 4
                ctx.strokeStyle = currentShape.style.strokeColor
                ctx.stroke()

                
                ctx.beginPath()
                ctx.moveTo(currentShape.endX, currentShape.endY)
                ctx.lineTo(
                    currentShape.endX - headLength * Math.cos(angle + Math.PI / 6),
                    currentShape.endY - headLength * Math.sin(angle + Math.PI / 6)
                )
                ctx.lineWidth = 4
                ctx.strokeStyle = currentShape.style.strokeColor
                ctx.stroke()
                break
            case "line":
                if(!currentShape.style || !currentShape.endX || !currentShape.endY)return
                ctx.beginPath()
                ctx.moveTo(currentShape.x, currentShape.y)
                ctx.lineTo(currentShape.endX, currentShape.endY)
                ctx.lineWidth = 4
                ctx.strokeStyle = currentShape.style.strokeColor
                ctx.stroke()
                break
        }
    }

}
