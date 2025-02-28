
import { Router } from "express"
import { auth } from "../middlewares/auth"
import { getRoomShapes } from "../controllers/getRoomShapes"

const router : Router = Router()

router.post("/" , auth , getRoomShapes)

export default router