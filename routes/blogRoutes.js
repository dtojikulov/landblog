import { Router } from "express";
import { blog_get, blog_id_get, blog_post, blog_create_get } from "../controllers/blogControllers.js";

const router = Router();

router.get('/blog', blog_get);
router.get('/blog/create', blog_create_get);
router.get('/blog/:id', blog_id_get);
router.post('/blog', blog_post);

export default router;