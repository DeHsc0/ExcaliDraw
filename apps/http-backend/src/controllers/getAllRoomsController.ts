import prisma from "@repo/db/client"
import { Request, Response } from "express"


export const getRooms = async  (req : Request , res : Response) => {
    try{
        
        const userId = req.id
        const userData = await prisma.user.findFirstOrThrow({
            where : {
                id : userId
            },
            select : {
                id : true,
                username : true,
                participantOf : true
                
            }
        })

        res.json({
            userData
        })
    }

    catch(e){
        res.json({
            error : "User Not Found"
        })
    }

}