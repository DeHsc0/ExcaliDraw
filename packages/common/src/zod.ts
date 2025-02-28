import z from "zod"

const roomScheam = z.object({
    slug : z.string().max(20).min(3),
    description : z.string()
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

const messageSchema = z.object({
    type  : z.string().max(15),
    roomId : z.string().min(30),
    state : z.string().optional()
})

export {
    messageSchema,
    loginSchema, 
    signupSchema, 
    roomScheam
}