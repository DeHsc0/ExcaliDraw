import { Router } from "express";
import { SignUpController } from "../controllers/signUpController";

const router : Router = Router()

router.post("/" , SignUpController)

export default router