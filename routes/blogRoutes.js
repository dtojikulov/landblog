import { Router } from "express";
import { blog_get, blog_id_get } from "../controllers/blogControllers.js";

const router = Router();

router.get('/blog', blog_get);
router.get('/blog/:id', blog_id_get);

export default router;