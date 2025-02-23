import { useState } from "react"
import { DrawingMode, Shape } from "../types/types"


export default function useAllShapes(){

    const [currentShape , setCurrentShape] = useState<Shape | null>(null) 
    const [shapes , setShapes] = useState<Shape[]>([])

    const startShape = (offsetX : number , offsetY : number , drawingMode : DrawingMode) => {
        
        setCurrentShape({type : drawingMode , x : offsetX ,  y : offsetY})
    
    }
    const updateShape = (currentX : number , currentY : number) => {
        if(!currentShape)return 
        
        switch(currentShape.type) {
            case "rect":
                setCurrentShape({...currentShape , width : currentX - currentShape.x , height: currentY - currentShape.y , style : {strokeColor : "white"}})
                break 
            
            case "ellipse":
                setCurrentShape({...currentShape , width : currentX - currentShape.x , height: currentY - currentShape.y , style : {strokeColor : "white"} })
                break 
            
            case "diamond":
                setCurrentShape({
                    ...currentShape, 
                    midX : (currentX + currentShape.x)/2, 
                    midY : (currentY + currentShape.y)/2,
                    topX : (currentX + currentShape.x)/2,
                    topY : currentShape.y,
                    bottomX : (currentX + currentShape.x)/2,
                    bottomY : currentY,
                    leftX : currentShape.x,
                    leftY : (currentY + currentShape.y)/2,
                    rightX : currentX,
                    rightY : (currentY + currentShape.y)/2,
                    style : {strokeColor : "white"} 
                })
                break            
            case "arrow":
                setCurrentShape({
                    ...currentShape,
                    endX : currentX,
                    endY : currentY,
                    style : {
                        strokeColor : "white"
                    }
                })
                break   
            case "line":
                setCurrentShape({
                    ...currentShape,
                    endX : currentX,
                    endY : currentY,
                    style : {
                        strokeColor : "white"
                    }
                })
                break
        }
    }
    const finaliseShape = ( ctx : CanvasRenderingContext2D) => {
        if (!currentShape || currentShape.type === "select") return
        if(currentShape.type === "diamond" && !currentShape.midX)return 
        if(currentShape.type === "rect" && !currentShape.width) return
        if(currentShape.type === "ellipse" && !currentShape.width) return
        if(currentShape.type === "arrow" && !currentShape.endX)return
              
        setShapes((prevShapes) => [...prevShapes, currentShape])
        setCurrentShape(null)
    }


    return {startShape , updateShape , finaliseShape , shapes , currentShape , setShapes}
}
