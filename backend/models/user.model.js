import mongoose from "mongoose"; // Importing mongoose for creating a MongoDB schema and model

// Define a schema for the User model
const userSchema = new mongoose.Schema(
	{
		// Email field: Stores the user's email address
		email: {
			type: String, // Data type is String
			required: true, // Email is a required field
			unique: true, // Ensures that each email is unique across the collection
		},
		// Password field: Stores the user's hashed password
		password: {
			type: String, // Data type is String
			required: true, // Password is a required field
		},
		// Name field: Stores the user's name
		name: {
			type: String, // Data type is String
			required: true, // Name is a required field
		},
		// Last Login field: Stores the timestamp of the user's last login
		lastLogin: {
			type: Date, // Data type is Date
			default: Date.now, // Default value is the current date and time
		},
		// Is Verified field: Indicates whether the user's email has been verified
		isVerified: {
			type: Boolean, // Data type is Boolean (true/false)
			default: false, // Default value is false (not verified)
		},
		// Reset Password Token field: Stores the token used for resetting the user's password
		resetPasswordToken: String, // Optional field, no additional constraints
		// Reset Password Expires At field: Stores the expiry time for the reset password token
		resetPasswordExpiresAt: Date, // Optional field, will store the expiration time
		// Verification Token field: Stores the token used for email verification
		verificationToken: String, // Optional field, no additional constraints
		// Verification Token Expires At field: Stores the expiry time for the email verification token
		verificationTokenExpiresAt: Date, // Optional field, will store the expiration time
	},
	{
		// Enable timestamps: Automatically adds `createdAt` and `updatedAt` fields to the schema
		timestamps: true, // Mongoose will automatically manage these fields
	}
);

// Create a Mongoose model named 'User' based on the userSchema
export const User = mongoose.model("User", userSchema); // Export the User model for use in other parts of the application
