import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import {authenticateUser, getUserFromJWT} from "./middleware/authMiddleware.js"


const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');

// Database connection && Starting the server 
(async () => {
	try{
		let result = await mongoose.connect(process.env.DB_URI)

		if(result) 
			app.listen(process.env.PORT, () => console.log(`Connection to the database was made successfully\nListening for the request at: ${process.env.PORT}`))
	}
	catch (err) {
		console.error(err)
	}
})();

app.get('*', getUserFromJWT);

app.get('/', (req, res) => {
	res.render('index')
});

app.use(authRoutes);
app.use(userRoutes);
app.use(blogRoutes);
