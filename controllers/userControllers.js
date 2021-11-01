import mongoose from "mongoose";
import User from "../models/User.js";

export const user_get = (req, res) => {
    res.locals.targetUser = null;
    res.render('user')
}

export const user_id_get = async (req, res) => {
    const id = req.params.id;
    res.locals.targetUser = null;
    
    try {
        const user = await User.findById(mongoose.Types.ObjectId(id));
        
        if(!user) return res.status(404).render('404');
        
        res.locals.targetUser = user;

        return res.status(201).render('user');        
    } catch (err) {
        return res.status(404).render('404');
    }
}