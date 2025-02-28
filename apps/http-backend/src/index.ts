import cookieParser from "cookie-parser"
import cors from 'cors'
//routes
import signUpRoute from "./routes/signUp"
import loginRoute from "./routes/logIn"
import createRoomRoute from "./routes/createRoom"
import getRoom from "./routes/getAllRooms"
import getRoomShapes from "./routes/getRoomShapes"

const express = require("express")

const app = express()

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

app.listen("3001")
