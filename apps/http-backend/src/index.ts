
import signUpRoute from "./routes/signUp"
import loginRoute from "./routes/logIn"
import createRoomRoute from "./routes/createRoom"
import cookieParser from "cookie-parser"


const express = require("express")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/signup" , signUpRoute)
app.use("/login" , loginRoute)
app.use("/create-room" , createRoomRoute)

app.listen("3000")
