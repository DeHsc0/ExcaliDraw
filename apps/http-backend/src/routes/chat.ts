import { Router } from "express"
import { chatController } from "../controllers/chatController"
import { auth } from "../middlewares/auth"

const router : Router = Router()

router.post("/:roomId" , auth , chatController )

export default router