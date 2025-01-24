
import jwt, { JwtPayload } from "jsonwebtoken"
import WebSocket , { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/common/jwtSecret";

const wss = new WebSocketServer({ port : 8080 })

function checkUserId (token : string) : string | null {
    const decoded = jwt.verify(token , JWT_SECRET) as JwtPayload
    if(typeof decoded === "string" && !decoded || !decoded.id){
        return null;
    } else {
        return decoded.id
    }
}

interface User {
    ws : WebSocket,
    room : string[],
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

    if(userId == null){
        ws.close()
        return null
    }    
    users.push({
        userId,
        ws,
        room : []
    })
    ws.on("message" , (data) => {
        const parsedData = JSON.parse(data.toString())
        if(parsedData.type === "join_room"){
            const user = users.find(x => x.ws === ws)
            user?.room.push()
        }
    })

})