
import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getRooms } from "../controllers/getAllRoomsController";

const router : Router = Router()

router.get("/" , auth , getRooms)

export default router

