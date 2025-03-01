import { Circle, Diamond, Minus, MousePointer2, MoveUp, Square } from "lucide-react"
import { ToolbarProps } from "../types/types"

export default function Toolbar({ drawingMode, setDrawingMode }: ToolbarProps){
    return (
        <div className="flex justify-center mt-2">
            <div className="rounded-lg absolute z-10 p-2 border-2 grid-cols-1 space-x-2 border-gray-600 bg-zinc-800">
                <button
                className={`p-2 rounded-lg text-blue-500 ${drawingMode !== "diamond" ? "" : " bg-sky-500/20"}`}  
                onClick={() => {
                    setDrawingMode(drawingMode === "diamond" ? "select" : "diamond")
                }}>
                    <Diamond />
                </button>

                <button
                className={`p-2 rounded-lg text-blue-500 ${drawingMode !== "rect" ? "" : " bg-sky-500/20"}`} 
                onClick={() => {
                    setDrawingMode(drawingMode === "rect" ? "select" : "rect")
                }}>
                    <Square />
                </button>

                <button
                className={`p-2 rounded-lg text-blue-500 ${drawingMode !== "ellipse" ? "" : " bg-sky-500/20"}`} 
                onClick={() => {
                    setDrawingMode(drawingMode === "ellipse" ? "select" : "ellipse")
                }}>
                    <Circle />
                </button>

                <button
                className={`p-2 rounded-lg text-blue-500 ${drawingMode !== "arrow" ? "" : " bg-sky-500/20"}`} 
                onClick={() => {
                    setDrawingMode(drawingMode === "arrow" ? "select" : "arrow")
                }}>
                    <MoveUp />
                </button>

                <button
                className={`p-2 rounded-lg text-blue-500 ${drawingMode !== "line" ? "" : " bg-sky-500/20"}`} 
                onClick={() => {
                    setDrawingMode(drawingMode === "line" ? "select" : "line")
                }}>
                    <Minus/>
                </button>

                <button
                className={`p-2 rounded-lg text-blue-500 ${drawingMode !== "select" ? "" : " bg-sky-500/20"}`} 
                onClick={() => {
                    setDrawingMode("select")
                }}>
                    <MousePointer2 />
                </button>
            </div>
        </div>
    )    
} 