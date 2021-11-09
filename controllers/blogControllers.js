import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

const handleErrors = (err) => {
	let errors = {title: '', snippet: '', body: ''};

	// validation errors
	if (err.message.includes('blog validation failed')) {
		Object.values(err.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message
		})
	}

	return errors;
}

export const blog_get = async (req, res) => {
    try {
        let blogs = await Blog.find().sort({ createdAt: -1 })

        res.render('blog/allblogs', { blogs });
    } catch (err) {
        console.log(err);
        res.render('404');
    }
}

export const blog_id_get = async (req, res) => {
    const id = req.params.id;
    const user = res.locals.user;
    res.locals.blog = null;
    res.locals.blogCreator = null;

    try {
        const blog = await Blog.findById(mongoose.Types.ObjectId(id))

        if(!blog) return res.status(404).render('404');

        if(blog.createdBy === user.id) res.locals.blogCreator = user;
        else res.locals.blogCreator = await User.findById(mongoose.Types.ObjectId(blog.createdBy));
        
        res.locals.blog = blog;

        return res.status(200).render('blog/blog')
    } catch (err) {
        return res.status(404).render('404');
    }
}

export const blog_create_get = (req, res) => {
    res.render('blog/create')
}

export const blog_post = async (req, res) => {
    let user = res.locals.user;
    const {title, snippet, body} = req.body;
    
    try {
        const blog = await Blog.create({title, snippet, body, createdBy: user._id})

        User.addBlog(user._id, blog._id)
        
        res.status(201).json({blog: blog._id});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(404).json({errors});
    }
}