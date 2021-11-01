import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authenticateUser = (req, res, next) => {

    const token = req.cookies.JWT;

    if(!token) return res.redirect('/login');

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if(err) return res.redirect('/login')
        else next();
    })
}


export const getUserFromJWT = (req, res, next) => {

    const token = req.cookies.JWT;
    res.locals.user = null

    if(!token) return next();

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if(err) return next();
        else {
            const user = await User.findById(decodedToken.id);
            res.locals.user = user;
            next();
        }
    })
}