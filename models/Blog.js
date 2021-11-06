import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
    snippet: {
        type: String,
        reuired: true
    },
	body: {
		type: String,
		required: true
	},
	likes: {
		type: [mongoose.Types.ObjectId]
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	seen: {
		type: [mongoose.Types.ObjectId]
	}

})

const Blog = mongoose.model('blog', blogSchema)

export default Blog;