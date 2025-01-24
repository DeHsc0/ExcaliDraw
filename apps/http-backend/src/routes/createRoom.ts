import { Router } from "express";
import { createRoom } from "../controllers/createRoomController";
import { auth } from "../middlewares/auth";

const router : Router = Router()

router.post("/" , auth , createRoom)

export default router