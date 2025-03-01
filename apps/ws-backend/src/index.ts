
import jwt, { JwtPayload } from "jsonwebtoken"
import WebSocket , { WebSocketServer } from "ws"
import { JWT_SECRET } from "@repo/common/secrets"
import { messageSchema } from "@repo/common/zod"
import  prisma from "@repo/db/client"

const wss = new WebSocketServer({ port : 8080 })

function checkUserId (token : string) : string | null {
    try{
        const decoded = jwt.verify(token , JWT_SECRET) as JwtPayload
    if(typeof decoded === "string" && !decoded || !decoded.id){
        return null
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
            return
        }
        if(validData.data.type === "join-room"){
            try {
                const user = users.find(x => x.ws === ws)
                if(!user){
                    ws.close()
                    return
                }
                
                const roomExists = await prisma.room.findUnique({
                    where: { id: validData.data.roomId }
                })
                
                if (!roomExists) {
                    ws.send(JSON.stringify({
                        type: "error",
                        message: "Room does not exist"
                    }))
                    return
                }
                
               
                const userExists = await prisma.user.findUnique({
                    where: { id: userId }
                })
                
                if (!userExists) {
                    ws.send(JSON.stringify({
                        type: "error",
                        message: "User does not exist in database"
                    }))
                    return
                }
                
                const existsInRoom = user.rooms.includes(validData.data.roomId)
                if(existsInRoom){
                    ws.send(JSON.stringify({
                        message : "User Already Exists in the room"
                    }))
                } else {
                    user?.rooms.push(validData.data.roomId)
                    const room = await prisma.room.update({
                        where : {
                            id : validData.data.roomId 
                        }, 
                        data : {
                            participants : {
                                connect : {
                                    id : userId
                                }
                            }
                        }, 
                        select : {
                            participants : true
                        }
                    }) 
                    ws.send(JSON.stringify({
                        message : "User joined the room Successfully"
                    }))
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
                ws.send(JSON.stringify({
                    message : "Success"
                }))
            } else{
                ws.send(JSON.stringify({
                    message : "Something went wrong"
                }))
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
                    users.forEach((otherUser) =>{
                       
                        if(otherUser.rooms.includes(validData.data.roomId) && otherUser.userId !== user.userId){
                            otherUser.ws.send(JSON.stringify({
                                type : "chat",
                                state : validData.data.state,
                                roomId : validData.data.roomId
                            }))                 
                        }
                    })
                } else {
                    ws.send(JSON.stringify({
                        message : "User Doesn't exist in that room"
                    }))
                }
            }
            catch(e){
                ws.send(JSON.stringify({
                    type : "error",
                    message : e
                }))
            }  
        }      
        else if(validData.data.type === "save"){
            try{
                const user = users.find(x => x.ws === ws)
                if(!user){
                    ws.close()
                    return
                }
            const existsInRoom = user.rooms.includes(validData.data.roomId)
            
            if(existsInRoom){
                const response = await prisma.room.update({
                    where : {
                        id : validData.data.roomId
                    },
                    data : {
                        state : validData.data.state
                    },
                    select : {
                        id : true,
                        state : true
                    }
                })

                users.map((user) => {
                    user.ws.send(JSON.stringify({
                        response,
                        validData
                    }))
                })

            } else {
                ws.send(JSON.stringify({
                    message : "User Doesn't exist in that room"
                }))
                }
            }
            catch(e){
                console.error(e)
            }                     
            
        }
    })

})