import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";


const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());

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

app.get('/', (req, res) => {
	res.render('index')
})

app.use(authRoutes)
