import { useState } from "react"
import { Shape } from "../types/types"

export default function useSelect() {
    const [selectedShape, setSelectedShape] = useState<Shape | undefined>(undefined)
    const [initialMouseClick, setInitialMouseClick] = useState<{ x: number, y: number } | undefined>(undefined)
    const [isDragging, setIsDragging] = useState(false)

    const selectShape = (offsetX: number, offsetY: number, shapes: Shape[]) => {
        let shapeSelected = false

        for (let i = shapes.length - 1; i >= 0; i--) {
            const shape = shapes[i]
            if(!shape)return
            if (shape.type === "rect") {
                if (!shape.width || !shape.height || !shape.style) continue
                const minX = Math.min(shape.x, shape.x + shape.width);
                const maxX = Math.max(shape.x, shape.x + shape.width);
                const minY = Math.min(shape.y, shape.y + shape.height);
                const maxY = Math.max(shape.y, shape.y + shape.height);
                if (
                    offsetX >= minX &&
                    offsetX <= maxX &&
                    offsetY >= minY &&
                    offsetY <= maxY
                ) {
                    setInitialMouseClick({ x: offsetX, y: offsetY })
                    setSelectedShape(shape)
                    shape.style.strokeColor = "blue"
                    shapeSelected = true
                    setIsDragging(true)
                    break
                }
            } else if (shape.type === "ellipse") {
                if (!shape.width || !shape.height || !shape.style) continue
                const centerX = shape.x + shape.width / 2
                const centerY = shape.y + shape.height / 2
                const radiusX = Math.abs(shape.width / 2)
                const radiusY = Math.abs(shape.height / 2)
                const dx = offsetX - centerX
                const dy = offsetY - centerY

                if ((dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1) {
                    setInitialMouseClick({ x: offsetX, y: offsetY })
                    setSelectedShape(shape)
                    shape.style.strokeColor = "blue"
                    shapeSelected = true
                    setIsDragging(true)
                    break
                }
            } else if (shape.type === "diamond") {
                if (
                    !shape.topX || !shape.topY || 
                    !shape.bottomX || !shape.bottomY || 
                    !shape.rightX || !shape.rightY || 
                    !shape.leftX || !shape.leftY || 
                    !shape.style
                ) continue

                const area1 = Math.abs(
                    offsetX * (shape.topY - shape.rightY) +
                    shape.topX * (shape.rightY - offsetY) +
                    shape.rightX * (offsetY - shape.topY)
                ) / 2

                const area2 = Math.abs(
                    offsetX * (shape.rightY - shape.bottomY) +
                    shape.rightX * (shape.bottomY - offsetY) +
                    shape.bottomX * (offsetY - shape.rightY))
                 / 2

                const area3 = Math.abs(
                    offsetX * (shape.bottomY - shape.leftY) +
                    shape.bottomX * (shape.leftY - offsetY) +
                    shape.leftX * (offsetY - shape.bottomY))
                     / 2

                const area4 = Math.abs(
                    offsetX * (shape.leftY - shape.topY) +
                    shape.leftX * (shape.topY - offsetY) +
                    shape.topX * (offsetY - shape.leftY))
                 / 2

                const diamondArea = Math.abs(
                    shape.topX * (shape.rightY - shape.leftY) +
                    shape.rightX * (shape.bottomY - shape.topY) +
                    shape.bottomX * (shape.leftY - shape.rightY) +
                    shape.leftX * (shape.topY - shape.bottomY))
                 / 2

                if (Math.abs((area1 + area2 + area3 + area4) - diamondArea) < 0.01) {
                    setInitialMouseClick({ x: offsetX, y: offsetY })
                    setSelectedShape(shape)
                    shape.style.strokeColor = "blue"
                    shapeSelected = true
                    setIsDragging(true)
                    break
                }
            } else if (shape.type === "arrow" || shape.type === "line") {
                if (!shape.endX || !shape.endY || !shape.style) continue
                const x1 = shape.x
                const y1 = shape.y
                const x2 = shape.endX
                const y2 = shape.endY

                const numerator = Math.abs(
                    (y2 - y1) * offsetX - (x2 - x1) * offsetY + x2 * y1 - y2 * x1
                )
                const denominator = Math.sqrt(
                    (y2 - y1) ** 2 + (x2 - x1) ** 2
                )
                const distance = numerator / denominator

                if (distance <= 10) {
                    setInitialMouseClick({ x: offsetX, y: offsetY })
                    setSelectedShape(shape)
                    shape.style.strokeColor = "blue"
                    shapeSelected = true
                    setIsDragging(true)
                    break
                }
            }
        }

        if (!shapeSelected) {
            deSelectShape()
        }
    }

    const dragShape = (offsetX: number, offsetY: number) => {
        if (!selectedShape || !initialMouseClick || !isDragging) return

        const dx = offsetX - initialMouseClick.x
        const dy = offsetY - initialMouseClick.y

        switch (selectedShape.type) {
            case "rect":
            case "ellipse":
                selectedShape.x += dx
                selectedShape.y += dy
                break
            case "diamond":
                if(!selectedShape.topX || !selectedShape.topY || !selectedShape.bottomX || !selectedShape.bottomY || !selectedShape.rightX || !selectedShape.rightY || !selectedShape.leftX || !selectedShape.leftY || !selectedShape.style)return
                selectedShape.topX += dx
                selectedShape.topY += dy
                selectedShape.bottomX += dx
                selectedShape.bottomY += dy
                selectedShape.leftX += dx
                selectedShape.leftY += dy
                selectedShape.rightX += dx
                selectedShape.rightY += dy
                break
            case "line":
            case "arrow":
                if(!selectedShape.endX || !selectedShape.endY)return
                selectedShape.x += dx
                selectedShape.y += dy
                selectedShape.endX += dx
                selectedShape.endY += dy
                break
        }

        setInitialMouseClick({ x: offsetX, y: offsetY })
    }

    const deSelectShape = () => {
        if(!selectedShape)return
        if(!selectedShape.style)return 
        
        selectedShape.style.strokeColor = "white"
        
        setSelectedShape(undefined)
        setInitialMouseClick(undefined)
        setIsDragging(false)

    }

    return { selectShape, selectedShape, deSelectShape, dragShape, isDragging, setSelectedShape }
}