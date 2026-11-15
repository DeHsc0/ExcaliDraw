import cookieParser from "cookie-parser"
import cors from 'cors'
import signUpRoute from "./routes/signUp"
import loginRoute from "./routes/logIn"
import createRoomRoute from "./routes/createRoom"
import getRoom from "./routes/getAllRooms"
import getRoomShapes from "./routes/getRoomShapes"
import { Express } from "express"

const express = require("express")

const app : Express = express()

app.use(cors({
    origin : "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/signup" , signUpRoute)
app.use("/login" , loginRoute)
app.use("/create-room" , createRoomRoute)
app.use("/get-all-rooms" , getRoom)
app.use("/get-room" , getRoomShapes)

app.listen(process.env.BACKEND_PORT , () => console.log(`Server started on port ${process.env.BACKEND_PORT}`))
