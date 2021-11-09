import mongoose from "mongoose";
import User from "../models/User.js";
import Blog from "../models/Blog.js";

export const user_get = async (req, res) => {
    res.locals.targetUser = null;
    
    let blogs = await Blog.findUsersBlogs(res.locals.user);

    res.render('user', { blogs })
}

export const user_id_get = async (req, res) => {
    const id = req.params.id;
    res.locals.targetUser = null;
    
    try {
        const user = await User.findById(mongoose.Types.ObjectId(id));
        
        if(!user) return res.status(404).render('404');

        let blogs = await Blog.findUsersBlogs(user);
        
        res.locals.targetUser = user;

        return res.status(201).render('user', { blogs });        
    } catch (err) {
        return res.status(404).render('404');
    }
}