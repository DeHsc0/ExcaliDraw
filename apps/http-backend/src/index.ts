import cookieParser from "cookie-parser"

//routes
import chatRoute from "./routes/chat"
import signUpRoute from "./routes/signUp"
import loginRoute from "./routes/logIn"
import createRoomRoute from "./routes/createRoom"

const express = require("express")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/signup" , signUpRoute)
app.use("/login" , loginRoute)
app.use("/create-room" , createRoomRoute)
app.use("/chat" , chatRoute)

app.listen("3001")
