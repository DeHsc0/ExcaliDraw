import prisma from "@repo/db/client"
import { Request, Response } from "express"

export const getRoomShapes = async  (req : Request , res : Response) => {
    try{
        const { roomId } = req.body

        const roomShapes = await prisma.room.findFirstOrThrow({
            where : {
                id : roomId
            },
            select : {
                state : true
            }
        })

        if(!roomShapes.state){
            res.json({
                roomShapes : {
                    state : ""
                }
            })
        } else {
            res.json({
                roomShapes
            })
        }
    }

    catch(e){
        res.json({
            error : "Room Not Found"
        })
    }

}