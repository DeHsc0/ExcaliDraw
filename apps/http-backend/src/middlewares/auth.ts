
import { NextFunction, Request , Response } from "express" 
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/common/secrets"

export const auth = async ( req : Request , res : Response , next : NextFunction) =>{
    try{
        const decoded = jwt.verify( req.cookies.cookie , JWT_SECRET) as jwt.JwtPayload 
        if(decoded){
            req.id = decoded.id
            next()            
        }else{
            res.status(401).send("Invalid Token")
        }
    }
    catch(e){
            res.status(403).send(req.cookies)
        }
    }
