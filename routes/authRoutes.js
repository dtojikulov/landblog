import { Router } from "express"
import { signup_get, login_get, signup_post, login_post } from "../controllers/authControllers.js"

const router = Router();

router.get('/signup', signup_get)
router.post('/signup', signup_post)
router.get('/login', login_get)
router.post('/login', login_post)

export default router;