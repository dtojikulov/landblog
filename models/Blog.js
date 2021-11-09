import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please enter a title"]
	},
    snippet: {
        type: String,
        required: [true, "Please enter a snippet"]
    },
	body: {
		type: String,
		required: [true, "Please provide a body"]
	},
	likes: {
		type: [mongoose.Types.ObjectId]
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		required: [true, "Creator ID is missing"],
	},
	seen: {
		type: [mongoose.Types.ObjectId]
	}

}, { timestamps: true });

blogSchema.statics.findUsersBlogs = async function(user) {
	let blogs = this.find({
		'_id': { $in: user.blogs }
	})

	if(blogs) {
		return blogs;
	} 

}

const Blog = mongoose.model('blog', blogSchema)

export default Blog;