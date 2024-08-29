// Import the JSON Web Token (JWT) library
import jwt from "jsonwebtoken";

// Middleware function to verify a JWT token from the incoming request
export const verifyToken = (req, res, next) => {
	// Extract the token from the cookies in the request
	const token = req.cookies.token;

	// If no token is provided, return a 401 Unauthorized response
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });

	try {
		// Verify the token using the secret key stored in environment variables
		// If the token is valid, decode it to retrieve the payload
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// If the token is invalid or decoding fails, return a 401 Unauthorized response
		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

		// If the token is valid, attach the user ID from the decoded payload to the request object
		// This makes the user ID accessible in subsequent middleware or route handlers
		req.userId = decoded.userId;

		// Call next() to pass control to the next middleware function or route handler
		next();
	} catch (error) {
		// If an error occurs during token verification, log the error for debugging purposes
		console.log("Error in verifyToken ", error);

		// Return a 500 Internal Server Error response, indicating a server-side issue
		return res.status(500).json({ success: false, message: "Server error" });
	}
};
