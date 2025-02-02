"use client"

import { WS_URL , BACKEND_URL} from "@repo/common/jwtSecret"
import axios from "axios"

export async function getRoom(slug : string){
    const response =  await axios.get(`${BACKEND_URL}/room/${slug}`)
    return response.data.id
}

export default async  function ChatRoom({params} : {params : {slug : string}
}) {
    const slug = params.slug
    const roomId = await getRoom(slug)
    
}