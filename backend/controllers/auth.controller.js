import bcryptjs from "bcryptjs"; // Library for hashing passwords
import crypto from "crypto"; // Library for generating cryptographic secure tokens

// Utility function for generating JWT token and setting it as a cookie
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

// Import functions to send different types of emails using Mailtrap
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js";

// Import the User model for interacting with the user collection in the database
import { User } from "../models/user.model.js";

// Signup controller: Handles user registration
export const signup = async (req, res) => {
	const { email, password, name } = req.body; // Extract email, password, and name from the request body

	try {
		// Check if all required fields are provided
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		// Check if a user with the provided email already exists
		const userAlreadyExists = await User.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			// If user already exists, send a 400 response with an error message
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		// Hash the user's password with a salt factor of 10
		const hashedPassword = await bcryptjs.hash(password, 10);

		// Generate a 6-digit verification token for email verification
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		// Create a new user instance with the provided details
		const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token expires in 24 hours
		});

		// Save the user to the database
		await user.save();

		// Generate a JWT token and set it as a cookie in the response
		generateTokenAndSetCookie(res, user._id);

		// Send verification email with the token
		await sendVerificationEmail(user.email, verificationToken);

		// Send success response with the user details (excluding the password)
		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined, // Exclude the password from the response
			},
		});
	} catch (error) {
		// Handle any errors and send a 400 response with the error message
		res.status(400).json({ success: false, message: error.message });
	}
};

// Email verification controller: Verifies the user's email using the provided verification code
export const verifyEmail = async (req, res) => {
	const { code } = req.body; // Extract verification code from the request body

	try {
		// Find the user with the matching verification token and check if it hasn't expired
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() }, // Ensure the token is still valid
		});

		if (!user) {
			// If no matching user or token has expired, send a 400 response
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		// Mark the user's email as verified and clear the verification token and expiry time
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		// Send a welcome email to the user
		await sendWelcomeEmail(user.email, user.name);

		// Send success response with the user details (excluding the password)
		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined, // Exclude the password from the response
			},
		});
	} catch (error) {
		// Handle any errors and send a 500 response with the error message
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// Login controller: Handles user login
export const login = async (req, res) => {
	const { email, password } = req.body; // Extract email and password from the request body

	try {
		// Find the user by email
		const user = await User.findOne({ email });
		if (!user) {
			// If user not found, send a 400 response with an error message
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Compare the provided password with the hashed password stored in the database
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			// If password doesn't match, send a 400 response with an error message
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Generate a JWT token and set it as a cookie in the response
		generateTokenAndSetCookie(res, user._id);

		// Update the user's last login time
		user.lastLogin = new Date();
		await user.save();

		// Send success response with the user details (excluding the password)
		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined, // Exclude the password from the response
			},
		});
	} catch (error) {
		// Handle any errors and send a 400 response with the error message
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Logout controller: Handles user logout
export const logout = async (req, res) => {
	// Clear the JWT token cookie
	res.clearCookie("token");
	// Send a success response
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Forgot Password controller: Sends a password reset link to the user's email
export const forgotPassword = async (req, res) => {
	const { email } = req.body; // Extract email from the request body

	try {
		// Find the user by email
		const user = await User.findOne({ email });

		if (!user) {
			// If user not found, send a 400 response with an error message
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate a secure reset token and set an expiry time of 1 hour
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		// Save the reset token and expiry time to the user's document
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// Send the password reset email with the reset link
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		// Send a success response
		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		// Handle any errors and send a 400 response with the error message
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Reset Password controller: Resets the user's password using the reset token
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params; // Extract reset token from the URL params
		const { password } = req.body; // Extract new password from the request body

		// Find the user with the matching reset token and check if it hasn't expired
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() }, // Ensure the token is still valid
		});

		if (!user) {
			// If no matching user or token has expired, send a 400 response
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// Hash the new password with a salt factor of 10
		const hashedPassword = await bcryptjs.hash(password, 10);

		// Update the user's password and clear the reset token and expiry time
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		// Send an email confirming the successful password reset
		await sendResetSuccessEmail(user.email);

		// Send a success response
		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		// Handle any errors and send a 400 response with the error message
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Get User Profile controller: Retrieves the authenticated user's profile
export const checkAuth = async (req, res) => {
	try {
		// Find the user by their ID (retrieved from the authenticated JWT)
		const user = await User.findById(req.userId);

		if (!user) {
			// If user not found, send a 400 response with an error message
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Send a success response with the user details (excluding the password)
		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: undefined, // Exclude the password from the response
			},
		});
	} catch (error) {
		// Handle any errors and send a 400 response with the error message
		console.log("Error in getProfile ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
