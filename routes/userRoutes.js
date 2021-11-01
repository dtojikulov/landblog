import { Router } from "express";
import { user_get, user_id_get } from "../controllers/userControllers.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticateUser);

router.get('/user', user_get);
router.get('/user/:id', user_id_get);


export default router;