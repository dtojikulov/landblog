import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name"]
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, "Please enter an email"], 
		validate: [validator.isEmail, "Please enter a valid email"]
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [8, "Minimum password length is 8 characters"]
	},
	blogs: {
		type: [String],
	}
})

// middleware to hash the password before saving to the database
userSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt)

	next();
});

const User = mongoose.model('user', userSchema);

export default User;