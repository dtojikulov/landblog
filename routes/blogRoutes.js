import { Router } from "express";
import { blog_get } from "../controllers/blogControllers.js";

const router = Router();

router.get('/blog', blog_get);

export default router;