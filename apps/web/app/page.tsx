//2:17
// add login signUp 
// do it with react-hook-forms 

"use client"

import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";

export default function Home() {
  const [slug, setSlug] = useState("")
  const router = useRouter()

  return (
    <div style={{
      display : "flex",
      justifyContent : "center",
      alignItems : "center"
    }
    }>
      <div>
        <input type="text" value={slug} onChange={(e) => {
          setSlug(e.target.value)
        }} placeholder="slug"/>
        <button style={{padding : 10}} onClick={() => {
          router.push(`/room/${slug}`)
        }}>Join Room</button>
      </div>
    </div>
  );
}
