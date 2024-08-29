import mongoose from "mongoose";

// This function establishes a connection to the MongoDB database
export const connectDB = async () => {
	try {
		// Output the MongoDB connection URI to the console for debugging purposes
		console.log("mongo_uri: ", process.env.MONGO_URI);
		
		// Attempt to connect to the MongoDB database using the connection string stored in the environment variable MONGO_URI
		// mongoose.connect returns a promise, so we use await to handle the asynchronous operation
		const conn = await mongoose.connect(process.env.MONGO_URI);

		// If the connection is successful, log a message indicating the host name of the connected MongoDB instance
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		// If an error occurs during the connection attempt, log the error message to the console
		console.log("Error connecting to MongoDB: ", error.message);

		// Exit the process with a failure status code (1 indicates failure, while 0 indicates success)
		process.exit(1);
	}
};
