//1:56
 // error handling with status codes 


import jwt, { JwtPayload } from "jsonwebtoken"
import WebSocket , { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/common/jwtSecret";
import { messageSchema } from "@repo/common/zod"
import  prisma from "@repo/db/client"

const wss = new WebSocketServer({ port : 8080 })

function checkUserId (token : string) : string | null {
    try{
        const decoded = jwt.verify(token , JWT_SECRET) as JwtPayload
    if(typeof decoded === "string" && !decoded || !decoded.id){
        return null;
    } else {
        return decoded.id
    }
    }
    catch(e){
        return null
    }
}

interface User {
    ws : WebSocket,
    rooms : string[],
    userId : string
}
const users : User[] = []

wss.on("connection" , function connection(ws , request){
    const url = request.url
    if(!url){
        return
    }
    const queryParams = new URLSearchParams(url.split("?")[1]) 
    const token = queryParams.get("token") || ""
    const userId = checkUserId(token)

    if(userId == null || !userId){
        ws.send(JSON.stringify({
            type : "error",
            message : "empty userid detected"
        }))
        ws.close() 
        return null
    }   
    
    users.push({
        userId,
        ws,
        rooms : []
    })

    ws.onopen = () => {
        ws.send('WebSocket connection established successfully.')
    }


    ws.on("message" , async (data) => {
        const parsedData = JSON.parse(data.toString())
        
        const validData = messageSchema.safeParse(parsedData)
        if(!validData.success){
            ws.close()
            return
        }
        if(validData.data.type === "join-room"){
            try {
                const user = users.find(x => x.ws === ws)
                if(!user){
                    ws.close()
                    return
                }
                const existsInRoom = user.rooms.includes(validData.data.roomId)
                if(existsInRoom){
                    ws.send("User Already Exists in the room")
                } else {
                    user?.rooms.push(validData.data.roomId)
                    const room = await prisma.room.update({
                        where : {
                            id : validData.data.roomId 
                        } , 
                        data : {
                            participants : {
                                connect : {
                                    id : userId
                                }
                            }
                        } , 
                        select : {
                            participants : true
                        }
                    }) 
                    ws.send("User joined the room Successfully")
                }
            }
            catch(e){
                ws.send(JSON.stringify({
                    type : "error",
                    message : e
                }))
            }
        }
        else if(validData.data.type === "leave-room"){
            try{
                const user = users.find(x => x.ws === ws)
                if(!user){
                    ws.close()
                    return
                }
            const indexOfRoom  : number = user.rooms.indexOf(validData.data.roomId)
            if(indexOfRoom >= 0){
                user.rooms.splice(indexOfRoom , 1)
                const response = await prisma.room.update({
                    where : {
                        id : validData.data.roomId
                    } , 
                    data : {
                        participants : {
                            disconnect : {
                                id : userId
                            }
                        }
                    },
                    select : {
                        participants : true
                    }
                })
                ws.send("Success")
            } else{
                ws.send("Something went wrong")
            }
            }
            catch(e){
                ws.send(JSON.stringify({
                    type : "error",
                    message : e
                }))
            }
        }
        else if(validData.data.type === "chat"){
            try{
                const user = users.find(x => x.ws === ws)
                if(!user){
                    ws.close()
                    return
                }
                const existsInRoom = user.rooms.includes(validData.data.roomId)
                if(existsInRoom){
                    const chat = await prisma.chat.create({
                        data : {
                            userId : userId,
                            roomId : validData.data.roomId,
                            message : validData.data.message as string
                        }, 
                        select : {
                            roomId : true,
                            message : true
                        }
                    })
                    users.forEach((user) =>{
                        if(user.rooms.includes(validData.data.roomId)){
                            user.ws.send(JSON.stringify({
                                type : "chat",
                                message : chat.message,
                                roomId : chat.roomId
                            }))                 
                        }
                    })
                }else {
                    ws.send("User Dosen't exisits in that room ")
                }
            }
            catch(e){
                ws.send(JSON.stringify({
                    type : "error",
                    message : e
                }))
            }  
        } else {
            ws.send("invalid Type")
        }        
    })

})