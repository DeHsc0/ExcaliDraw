
import { useEffect, useRef , useState } from "react"
import { useCanvas } from "../hooks/useCanvas"
import useAllShapes from "../hooks/useAllShapes"
import { DrawingMode, Shape} from "../types/types"
import Toolbar from "./ToolBar"
import { drawAllShapes} from "../utils/drawUtils"
import useSelect from "../hooks/useSelect"
import useSocket from "../hooks/useSocket"

export default function Canvas(){

    const [drawingMode, setDrawingMode] = useState<DrawingMode>("select")

    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
    const [isDrawing , setIsDrawing] = useState(false)

    const {startShape , updateShape , finaliseShape , shapes , currentShape , setShapes} = useAllShapes()    
    const {setupCanvas , canvasRef} = useCanvas()    
    const { selectShape , deSelectShape , dragShape , selectedShape , isDragging , setSelectedShape } = useSelect()       
    const { sendMessage , receivedShapes } = useSocket()

    const [deletedShape , setDeletedShape] = useState<Shape[]>([])

    useEffect(() => {
        const ctx = setupCanvas()
        if(!ctx)return
        ctxRef.current = ctx

    } , [])

    useEffect(() => {
        if(!ctxRef.current || !currentShape)return
        ctxRef.current.clearRect(0, 0, ctxRef.current.canvas.width, ctxRef.current.canvas.height)
        
        drawAllShapes(ctxRef.current , shapes , currentShape)      
        drawAllShapes(ctxRef.current , receivedShapes) 

        sendMessage(JSON.stringify({
            type : "broadcast-message",
            message : shapes
        }))
        
    } , [shapes , currentShape , receivedShapes])
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {   
            event.preventDefault()
    
            if (event.ctrlKey && event.key === "z" && deletedShape.length > 0) {
                const lastDeleted = deletedShape[deletedShape.length - 1] 
                if(!lastDeleted)return  
                setShapes([...shapes , lastDeleted])
                setDeletedShape(prev => prev.slice(0, -1))
            }
    
       
            if (event.key === "Delete" && selectedShape) {
                setDeletedShape(prev => [...prev, selectedShape])
                setShapes(prev => prev.filter(shape => shape !== selectedShape))
                setSelectedShape(undefined)
            }
        }
    
        window.addEventListener("keydown", handleKeyDown)

        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [selectedShape, deletedShape])
    

    const handleMouseDown = (event : React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true)
    
        if(drawingMode === "select"){
          selectShape(event.clientX , event.clientY , shapes)
        }

        startShape(event.clientX , event.clientY , drawingMode)    
    }

    const handleMouseMove = (event : React.MouseEvent<HTMLCanvasElement>) => {
        
        if(!ctxRef.current || !currentShape)return
        
        if(drawingMode === "select" && selectedShape){
            ctxRef.current.clearRect(0, 0, ctxRef.current.canvas.width, ctxRef.current.canvas.height)
            drawAllShapes(ctxRef.current , shapes , currentShape)      
            drawAllShapes(ctxRef.current , receivedShapes)  
            if (isDragging) {
                const offsetX = event.nativeEvent.offsetX
                const offsetY = event.nativeEvent.offsetY
                dragShape(offsetX, offsetY)
            }
        }
        if(!isDrawing)return
        updateShape(event.clientX , event.clientY)
    }

    const handleMouseUp = (event : React.MouseEvent<HTMLCanvasElement>) => {

        if(drawingMode === "select"){
           deSelectShape()
        }

        if(!ctxRef.current)return
        finaliseShape(ctxRef.current)    
        setIsDrawing(false)
    }

    return (
        <div className="bg-zinc-900 overflow-hidden"
        onKeyDownCapture={(event) => {
            event.preventDefault()
            console.log("asdasdasdsa")}}
        >
        <Toolbar drawingMode={drawingMode} setDrawingMode={setDrawingMode} />
        <canvas
          className="relative h-screen w-screen"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </div>
    ) 
}