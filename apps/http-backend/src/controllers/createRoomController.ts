import { Prisma} from "@repo/db"
import prisma from "@repo/db/client"
import { Response , Request } from "express"
import { roomScheam } from "@repo/common/zod"
import z from "zod"

export const createRoom = async (req : Request , res : Response) => {
    try{
    
        const validData = roomScheam.parse(req.body)
        const room = await prisma.room.create({
            data :{
                slug : validData.slug,
                description : validData.description,
                adminId : req.id as string,
                participants : {
                    connect : {
                        id : req.id
                    }
                }
            },
            select : {
                id : true,
                slug : true,
                participants : true,
                description : true,
                adminId : true
            }
        })
        res.status(201).json({
            roomData : room,
            message : "Room has been created Successfully"
        })
    }
    catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002"){
            res.status(400).json({
                message : "Room already exists"
            })
        }else if(e instanceof z.ZodError){
            res.status(400).send(e.issues[0])
        } 
        else {
            res.status(500).json({
                message : " Internal Server Error"
            })
        }
    }  
}