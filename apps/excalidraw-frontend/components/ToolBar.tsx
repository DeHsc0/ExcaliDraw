import { ToolbarProps } from "../types/types";

export default function Toolbar({ drawingMode, setDrawingMode }: ToolbarProps){
    return (
        <div className="flex justify-center mt-2">
            <div className="rounded-lg absolute z-10 p-2 border-2 grid-cols-1 space-x-2 border-white">
                <button
                className={drawingMode !== "diamond" ? "" : "bg-lime-400"}  
                onClick={() => {
                    setDrawingMode(drawingMode === "diamond" ? "select" : "diamond")
                }}>
                    Diamond 
                </button>

                <button
                className={drawingMode !== "rect" ? "" : "bg-lime-400"} 
                onClick={() => {
                    setDrawingMode(drawingMode === "rect" ? "select" : "rect")
                }}>
                    Rect 
                </button>

                <button
                className={drawingMode !== "ellipse" ? "" : "bg-lime-400"} 
                onClick={() => {
                    setDrawingMode(drawingMode === "ellipse" ? "select" : "ellipse")
                }}>
                    Ellipse
                </button>

                <button
                className={drawingMode !== "arrow" ? "" : "bg-lime-400"} 
                onClick={() => {
                    setDrawingMode(drawingMode === "arrow" ? "select" : "arrow")
                }}>
                    Arrow
                </button>

                <button
                className={drawingMode !== "line" ? "" : "bg-lime-400"} 
                onClick={() => {
                    setDrawingMode(drawingMode === "line" ? "select" : "line")
                }}>
                    Line
                </button>

                <button
                className={drawingMode !== "select" ? "" : "bg-lime-400"} 
                onClick={() => {
                    setDrawingMode("select")
                }}>
                    Select
                </button>
            </div>
        </div>
    )    
} 