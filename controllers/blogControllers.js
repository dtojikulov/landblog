import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const blog_get = (req, res) => {
    res.render('blog/allblogs');
}

export const blog_id_get = async (req, res) => {
    const id = req.params.id;
    const user = res.locals.user;
    res.locals.blog = null;
    res.locals.blogCreator = null;

    try {
        const blog = await Blog.findById(mongoose.Types.ObjectId(id))

        if(!blog) return res.status(404).render('404');

        if(blog.createdBy !== user.id) res.locals.blogCreator = await User.findById(mongoose.Types.ObjectId(blog.createdBy));
        
        res.locals.blogCreator = user;
        res.locals.blog = blog;

        return res.status(200).render('blog/blog')
    } catch (err) {
        console.error(err);
        return res.status(404).render('404');
    }
}