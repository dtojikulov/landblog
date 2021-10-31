import { Router } from "express"
import { signup_get, login_get } from "../controllers/authControllers.js"

const router = Router();

router.get('/signup', signup_get)
router.get('/login', login_get)

export default router;