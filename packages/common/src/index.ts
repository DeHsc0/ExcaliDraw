import z from "zod"

const roomScheam = z.object({
    name : z.string().max(20).min(3)
})

const loginSchema = z.object({
    username : z.string().max(20).min(3),
    password : z.string()
}) 

const signupSchema = z.object({
    username : z.string().max(20).min(3),
    password : z.string(), 
    email : z.string().email()        
})

export {
    loginSchema, 
    signupSchema, 
    roomScheam
}