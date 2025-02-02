
import axios from "axios"
import { BACKEND_URL } from "@repo/common/jwtSecret"

async function getChats(roomId : string){
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
    return response.data
}

export async function ChatRoom({id} : {
    id : string
}){
    const messages = await getChats(id)
}