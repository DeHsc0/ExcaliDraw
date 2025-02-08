import { useState } from "react"
import {DiamondData , DiamondPoints} from "../types/types"

export const useDiamond = () => {
    
 const [ currentDiamond, setCurrentDiamond ] = useState<DiamondData | null>(null)
 const [ currentDiamondPoints , setCurrentDiamondPoints ] = useState<DiamondPoints | null>(null)
 const [diamondPoints , setDiamondPoints] = useState<DiamondPoints[]>([])

 const startDiamond = (startX : number  , startY : number)=> {
    setCurrentDiamond({ startX, startY, currentX: startX, currentY: startY, midX: startX, midY: startY})
 }

 const updateDiamond = (currentX : number , currentY : number) => {
    if(!currentDiamond)return
    setCurrentDiamond({...currentDiamond , currentX , currentY , midX: (currentDiamond.startX + currentX)/2 , midY : (currentDiamond.startY + currentY)/2 })
    const points = {
        topX : currentDiamond.midX , topY : currentDiamond.startY,
        bottomX : currentDiamond.midX, bottomY : currentDiamond.currentY,
        leftX : currentDiamond.startX, leftY : currentDiamond.midY,
        rightX : currentDiamond.currentX, rightY : currentDiamond.midY
        }
    setCurrentDiamondPoints(points)
 } 

 const finalizeDiamond = () => {
    if(!currentDiamondPoints)return
    setDiamondPoints([...diamondPoints , currentDiamondPoints])
    setCurrentDiamondPoints(null)
    setCurrentDiamond(null)
 }

 return { startDiamond , updateDiamond , finalizeDiamond , diamondPoints , currentDiamondPoints}

}
