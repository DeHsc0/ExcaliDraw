import { use, useCallback, useEffect, useRef , useState } from "react"
import { useCanvas } from "../hooks/useCanvas"
import useAllShapes from "../hooks/useAllShapes"
import { DrawingMode, Shape} from "../types/types"
import Toolbar from "./ToolBar"
import { drawAllShapes} from "../utils/drawUtils"
import useSelect from "../hooks/useSelect"
import useSocket from "../hooks/useSocket"
import { motion, useAnimation } from "framer-motion";

interface Data {
    token : string
    roomId : string
    state : string 
}

interface LastShapes {
    shapes : Shape[]
}

export default function Canvas({token , roomId , state } : Data){

    const [lastShapes , setLastShapes ] = useState<LastShapes | undefined>(JSON.parse(state))

    const [drawingMode, setDrawingMode] = useState<DrawingMode>("select")

    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
    const [isDrawing , setIsDrawing] = useState(false)
    
    const controls = useAnimation()

    const {startShape , updateShape , finaliseShape , shapes , currentShape , setShapes} = useAllShapes()    
    const {setupCanvas , canvasRef} = useCanvas()    
    const { selectShape , deSelectShape , dragShape , selectedShape , isDragging , setSelectedShape } = useSelect()       
    const { sendMessage , receivedShapes , receivedMsg , socket} = useSocket(token)
    const [alert, setAlert] = useState<string | null>(null)

    const [deletedShape , setDeletedShape] = useState<Shape[]>([])

    const savedShapes = useRef(shapes)

    useEffect(() => {
        const ctx = setupCanvas()
        if(!ctx)return
        ctxRef.current = ctx   

        if(!lastShapes)return 
        setShapes(() => [...lastShapes.shapes])
        drawAllShapes(ctx , lastShapes.shapes)

    } , [])

    const prepareStateMessage = useCallback(() => {
        return JSON.stringify({
            type: "save",
            roomId: roomId,
            state: JSON.stringify({
                shapes: savedShapes.current
            })
        });
    }, [roomId]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                sendMessage(prepareStateMessage());
            }
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [socket, prepareStateMessage, sendMessage]);

    useEffect(() => {
        if (!alert) return
        
        controls.start({
            translateY: "0px"
        }).then(() => {
            return new Promise((resolve) => setTimeout(resolve, 3000)) 
        }).then(() => {
            return controls.start({
                translateY: "-100px"
            })
        }).then(() => {
            setAlert(null)
        })
    }, [alert, controls])

    useEffect(() => {
        if(socket && socket.readyState === WebSocket.OPEN){
            sendMessage(JSON.stringify({
                type : "join-room",
                roomId : roomId
            }))
        }
    } , [socket])

    
    useEffect(() => {
        if(!receivedMsg)return 
        setAlert(() => receivedMsg)
    } , [receivedMsg])

    useEffect(() => {
        if(!ctxRef.current || !currentShape)return
        ctxRef.current.clearRect(0, 0, ctxRef.current.canvas.width, ctxRef.current.canvas.height)
        
        drawAllShapes(ctxRef.current , shapes , currentShape)      
        drawAllShapes(ctxRef.current , receivedShapes) 

        savedShapes.current = shapes
        
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
        if(socket && socket.readyState === WebSocket.OPEN){
            sendMessage(JSON.stringify({
                type : "chat",
                roomId : roomId,
                state : JSON.stringify({
                    shapes
                })
            }))
        }
    }

    return (
        <div className="bg-zinc-900 overflow-hidden"
        onKeyDownCapture={(event) => {
            event.preventDefault()}}
        >
            <div className="z-50 fixed inset-0 w-fit flex justify-end">
                <motion.div
                initial={{
                    translateY: "-100px",
                }}
                animate={controls}
                transition={{
                    duration: 0.2
                }} 
                className="p-2 bg-sky-500 h-fit w-fit m-2 rounded-lg">
                    <h1>
                        {alert}
                    </h1>
                </motion.div>
            </div>
        <Toolbar drawingMode={drawingMode} setDrawingMode={setDrawingMode} />
        <canvas
          className="relative h-full w-full"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </div>
    ) 
}