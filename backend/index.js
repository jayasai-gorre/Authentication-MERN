// Import the required modules and packages
import express from "express"; // Express framework for building the server
import dotenv from "dotenv";   // dotenv for loading environment variables from a .env file
import cors from "cors";       // CORS middleware for handling cross-origin requests
import cookieParser from "cookie-parser"; // Middleware for parsing cookies
import path from "path";       // Path module for handling file paths

// Import the database connection function
import { connectDB } from "./db/connectDB.js";

// Import the authentication routes
import authRoutes from "./routes/auth.route.js";

// Load environment variables from the .env file into process.env
dotenv.config();

// Create an instance of an Express application
const app = express();

// Define the port for the server to listen on
const PORT = process.env.PORT || 7070; // Default to port 7070 if not specified in environment variables

// Get the directory name of the current module
const __dirname = path.resolve();

// Set up CORS to allow requests from the specified origin and include credentials
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware to parse incoming JSON requests
app.use(express.json()); // This allows the server to read JSON data in the request body

// Middleware to parse cookies from incoming requests
app.use(cookieParser()); // This allows the server to access cookies sent with requests

// Register the authentication routes under the "/api/auth" path
app.use("/api/auth", authRoutes); // All routes defined in authRoutes will be prefixed with "/api/auth"

// Serve static files and handle routing in production
if (process.env.NODE_ENV === "production") {
	// Serve static files from the frontend/dist directory
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// For any request that doesn't match the static file routes, send the index.html file
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start the server and connect to the database
app.listen(PORT, () => {
	connectDB(); // Connect to the database
	console.log("Server is running on port: ", PORT); // Log that the server is running
});
