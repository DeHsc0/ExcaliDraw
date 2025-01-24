
import { Response , Request } from "express";
import z from "zod";
import bcrypt from "bcrypt"
import { Prisma} from "@repo/db"
import prisma from "@repo/db/client"
import jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/jwtSecret"
import { loginSchema } from "@repo/common/zod"

export const login = async (req : Request, res : Response) => {
    try {
        const validUserData = loginSchema.parse(req.body)
        
        const user = await prisma.user.findFirstOrThrow({
            where : {
                username : validUserData.username,
            },
            select : {
                id : true,
                password : true
            }
        })
        const hashedPass = await bcrypt.compare(validUserData.password , user?.password)
        if(hashedPass){
            const token = jwt.sign({id : user.id} , JWT_SECRET )
            res.cookie("cookie" , token )
            res.status(200).json({
                message : "Login Successfull"
            }) 
        } else {
            res.status(401).json({
                message :"Incorrect Password"
            })
        }
    }
    catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code == "P2025"){
                res.status(404).json({
                    message : "User Dosen't exist"
                })
            }
        }else if (e instanceof z.ZodError){
            res.send(e.errors[0])
        } else {
            res.status(500).json({
                message : "Internal Server error"
            })
        }
    }
}
