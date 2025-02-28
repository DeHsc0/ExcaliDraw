"use client"

import { motion , AnimatePresence } from "framer-motion"
import { Brush, Zap, Users, Share2 } from "lucide-react"

export default function Features(){

  interface Feature {
    svg: React.ReactElement
    heading: string,
    description: string,
    lists: string[]
  }

  const features: Feature[] = [
    {
      svg: <Brush />,
      heading: "Smart Drawing Tools",
      description: "Professional-grade brushes, pens, and tools that respond naturally to pressure and tilt.", 
      lists: ["Pressure sensitivity", "Custom brushes", "Vector support"]
    },
    {
      svg: <Users />,
      heading: "Team Collaboration",
      description: "Work together seamlessly with your team in real-time, no matter where they are.", 
      lists: ["Live cursors", "Chat & comments", "Version history"]
    },
    {
      svg: <Share2 />,
      heading: "Easy Sharing",
      description: "Share your work instantly and collaborate with anyone, anywhere.",
      lists: ["One Click Sharing", "Export options", "Permission control"]
    }
  ]

  return (
    <div className="relative z-10 flex justify-center bg-slate-800 skew-y-2 transform origin-top-right mt-12 pt-10 pb-10 w-full">
      <div className="relative flex justify-center flex-col gap-3 transform -skew-y-2 p-6">
        <h1 className="font-bold text-4xl text-center">Real-time Collaboration</h1>
        <p className="text-center text-zinc-400 text-lg">
          Experience seamless collaboration with features designed for creative teams
        </p>
        <br />
        <div className="flex justify-center gap-9">
          {features.map((feature, index) => (
            <motion.div 

            initial={{
              opacity : 0,
              translateY : 80
            }}

            transition={{
              duration : 2
            }}

            whileInView={{
              opacity : 1,
              translateY : 0
            }}
            key={index} className="flex flex-col space-y-4 bg-slate-900/45 rounded-xl border-zinc-600 border p-8">
              <div className="flex justify-center items-center p-4 w-fit bg-gradient-to-br from-sky-500 to-sky-700 rounded-2xl">
                {feature.svg}
              </div>
              <h1 className="font-bold text-xl">{feature.heading}</h1>
              <p className="text-zinc-400 max-w-72 text-lg">{feature.description}</p>
              <ul className="space-y-2">
                {feature.lists.map((list, idx) => (
                  <li className="gap-2 flex" key={idx}>
                    <Zap className="text-sky-400 size-4" />
                    <span className="text-md text-zinc-300">{list}</span>  
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
