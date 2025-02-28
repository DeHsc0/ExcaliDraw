
import { Request , Response } from "express"
import z from "zod"
import bcrypt from "bcrypt"
import {Prisma} from "@repo/db"
import prisma from "@repo/db/client"
import {signupSchema} from "@repo/common/zod"

export const SignUpController = async (req : Request , res : Response) => {
    try {
        
        const validUserData = signupSchema.parse(req.body)
        const hash = await bcrypt.hash(validUserData.password , 10)

        const user = await prisma.user.create({
            data : {
                username : validUserData.username,
                email : validUserData.email,
                password : hash
            }
        })    
        res.status(201).json({
            message : "User Created Successfully"
        })    
    }
    catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002"){
            res.status(400).json({
                message : "User already exists"
            })            
        } else if (e instanceof z.ZodError){
            res.status(400).json({
                message : "invalid input"
            }) 
        } else {
            res.status(500).json({
                message : "Internal Server Error"
            })
        }
    } 
}