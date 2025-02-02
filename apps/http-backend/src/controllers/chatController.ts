import { Prisma } from "@repo/db"
import prisma from "@repo/db/client"
import { ErrorRequestHandler, Request , Response } from "express"

export const chatController = async (req : Request , res : Response) => {
    const roomId  = req.params.roomId as string 
    try {
        const validRoom = await prisma.room.findMany({
            where : {
                id : roomId,
                participants : {
                    some : {
                        id : req.id
                    }           
                }
            },
            select : {
                chats : true
            },
            orderBy : {
                id : "desc"
            } , 
            take : 50
        })
        if(!validRoom[0]?.chats){
            throw new Error("Invalid Room Id or User not a participant")
        }else{
            res.json({
                msg : validRoom[0]?.chats
            })
        }
    }
    catch(e){
        if(e instanceof Error){
            res.status(401).json({
                msg : e.message
            })
        }else {
            res.status(401).json({
                msg : e
            })
        }
    } 

}