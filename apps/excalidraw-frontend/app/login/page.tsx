"use client"

import { motion , useAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, LogIn } from "lucide-react"
import axios from "axios"
import { useState , useEffect} from "react"

export default function Login() {
  const router = useRouter()
  const controls = useAnimation()

  const [ username , setUsername ] = useState("")
  const [ password , setPassword ] = useState("")

  const [alert , setAlert] = useState<string | null>(null)

  const handleOnClick = async (event : React.MouseEvent) => {
    event.preventDefault()
      try{
        const response = await axios.post("http://localhost:3001/login" , {
          username,
          password
        } , {
          withCredentials : true
        })
        
        if(response.status === 200){
          router.push("/dashboard")
        }

      } catch(e : any){
        setAlert(e.response.data.message)
      }
  }

  useEffect(() => {
        if (!alert) return
      
        controls.start({
          translateY: "0px"
        }).then(() => {
  
          return new Promise((resolve) => setTimeout(resolve, 1000))
        }).then(() => {
  
          return controls.start({
            translateY: "-100px",
            scale: 1,
          })
        }).then(() => {
  
          setAlert(null)
        })
      
      }, [alert, controls])

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
              <ArrowLeft onClick={() => { router.push("/") }} className="text-sky-500" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
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
              placeholder="Enter your username"
              />
            </motion.div>

            <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
              onChange={(event) => {setPassword(event.currentTarget.value)}}
              type="password"
              className="w-full px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
              placeholder="Enter your password"
              />
            </motion.div>

            <motion.button
            onClick={ handleOnClick }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-sky-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-sky-600 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </motion.button>
          </form>
          
          <motion.p
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-gray-400"
          >
            Don't have an account?{" "}
            <a href="/signup" className="text-sky-500 hover:text-sky-400">
              Sign up
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}