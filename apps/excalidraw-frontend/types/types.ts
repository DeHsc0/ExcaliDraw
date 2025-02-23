
export type DrawingMode = "line" | "rect" | "ellipse" | "diamond" | "select" | "arrow"

export interface Shape {
    type : DrawingMode
    x : number
    y : number
    width ?: number
    height ?: number
    endX ?: number
    endY ?: number
    midX ?: number
    midY ?: number
    topX ?: number 
    topY ?: number
    bottomX ?: number 
    bottomY ?: number
    rightX ?: number 
    rightY ?: number
    leftX ?: number 
    leftY ?: number
    style ?: {
        strokeColor : "blue" | "white" | "red" | "yellow"
    }
}

export interface ToolbarProps {
    drawingMode: DrawingMode
    setDrawingMode: (mode: DrawingMode) => void
}