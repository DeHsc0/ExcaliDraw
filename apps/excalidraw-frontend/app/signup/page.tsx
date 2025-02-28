"use client"

import { motion, useAnimation } from "framer-motion"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Signup() {
    const router = useRouter()
    const [username , setUsername] = useState("")
    const [ email , setEmail ] = useState("")
    const [password , setPassword] = useState("")
    const [alert , setAlert] = useState<string | null>(null)
    const controls = useAnimation()
    
    const handleOnClick = async (event : React.MouseEvent) => {
      event.preventDefault()
      try{
        const response = await axios.post("http://localhost:3001/signup" , {
          username,
          email,
          password
        })
        
        if(response.status === 201){
          router.push("/login")
        }

      } catch(e : any){
        setAlert(e.response.data.message)
      }
    }

    useEffect(() => {
      if (!alert) return;
    
      controls.start({
        translateY: "0px"
      }).then(() => {

        return new Promise((resolve) => setTimeout(resolve, 1000));
      }).then(() => {

        return controls.start({
          translateY: "-100px",
          scale: 1,
        });
      }).then(() => {

        setAlert(null);
      });
    
    }, [alert, controls]);

  return (        
    <div>
      <div className="fixed w-full flex justify-center">
        <motion.div 
          initial={{
            translateY: "-100px",
          }}
          animate={controls}
          transition={{
            duration: 0.2
          }}
          className="bg-slate-700 px-5 py-4 w-fit rounded-lg mt-2">
          <h1>
            {alert}
          </h1>
        </motion.div>
      </div>
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800 p-8 rounded-2xl w-full max-w-md"
        >
          <div className="flex items-center gap-2 mb-8">
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/">
                <ArrowLeft className="text-sky-500" />
              </Link>
            </motion.div>
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
          </div>

          <form className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                onChange={(event) => {setUsername(event.currentTarget.value)}}
                type="text"
                className="w-full px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
                placeholder="Choose a username"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                onChange={(event) => {setEmail(event.currentTarget.value)}}
                type="email"
                className="w-full px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                onChange={(event) => {setPassword(event.currentTarget.value)}}
                type="password"
                className="w-full px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
                placeholder="Create a password"
              />
            </motion.div>

            <motion.button
              onClick={handleOnClick}          
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-sky-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-sky-600 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Create Account
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center text-gray-400"
          >
            Already have an account?{" "}
            <a href="/login" className="text-sky-500 hover:text-sky-400">
              Sign in
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>  
  )
}