import { Router } from "express"
import { login } from "../controllers/loginController"

const router : Router = Router() 

router.post("/" ,  login)

export default router