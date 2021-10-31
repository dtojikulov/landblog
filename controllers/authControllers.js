import jwt from "jsonwebtoken";
import User from "../models/User.js"

const handleErrors = (err) => {
	let errors = {name: '', email: '', password: ''};

	// login endpoint errors
	if (err.message === 'login failed') {
		errors.email = "Incorrect email and/or password";
		errors.password = "Incorrect email and/or password";
	};

	// duplicate email error
	if (err.code === 11000) {
		errors.email = "The user with this email already exists"
		return errors;
	}

	// validation errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message
		})
	}

	return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: maxAge
	});
}

export const signup_get = (req, res) => {
	res.render('signup')
}

export const login_get = (req, res) => {
	res.render('login')
}

export const signup_post = async (req, res) => {
	const { name, email, password } = req.body

	try {
		const user = await User.create({ name, email, password});
		const token = createToken(user._id);
		res.cookie('JWT', token, { httpOnly: true, maxAge: maxAge * 1000 })
		res.status(201).json({ user: user._id });
	}
	catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({errors})
	}
}

export const login_post = async (req, res) => {
	const {password, email} = req.body;

	try {
		const user = await User.login(email, password)
		const token = createToken(user._id);

		res.cookie('JWT', token, { httpOnly: true, maxAge: maxAge * 1000 })
		res.status(200).json({ user: user._id })
	} catch (err) {
		const errors = handleErrors(err);
		res.status(404).json({errors})
	}
}