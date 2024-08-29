// Importing email templates from the emailTemplates.js file
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

// Importing mailtrapClient and sender details from the mailtrap.config.js file
import { mailtrapClient, sender } from "./mailtrap.config.js";

// Function to send a verification email
// Parameters: email (recipient's email), verificationToken (token for verification)
export const sendVerificationEmail = async (email, verificationToken) => {
	// Preparing the recipient list as an array of objects
	const recipient = [{ email }];

	try {
		// Sending the email using Mailtrap's client
		const response = await mailtrapClient.send({
			from: sender, // Email sender information
			to: recipient, // Recipient list
			subject: "Verify your email", // Subject of the email
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken), // Replacing the placeholder with the actual verification token in the email template
			category: "Email Verification", // Category to organize emails
		});

		// Log success message and response details
		console.log("Email sent successfully", response);
	} catch (error) {
		// Log error message if email sending fails
		console.error(`Error sending verification`, error);

		// Throw an error to propagate the issue
		throw new Error(`Error sending verification email: ${error}`);
	}
};

// Function to send a welcome email
// Parameters: email (recipient's email), name (recipient's name)
export const sendWelcomeEmail = async (email, name) => {
	// Preparing the recipient list as an array of objects
	const recipient = [{ email }];

	try {
		// Sending the email using a pre-defined template with template variables
		const response = await mailtrapClient.send({
			from: sender, // Email sender information
			to: recipient, // Recipient list
			template_uuid: "40d00bbf-109d-477f-be0b-92e05622d9da", // Unique identifier for the welcome email template in Mailtrap
			template_variables: {
				company_info_name: "The Atoms", // Replacing placeholder in the template with the company name
				name: name, // Replacing placeholder in the template with the recipient's name
			},
		});

		// Log success message and response details
		console.log("Welcome email sent successfully", response);
	} catch (error) {
		// Log error message if email sending fails
		console.error(`Error sending welcome email`, error);

		// Throw an error to propagate the issue
		throw new Error(`Error sending welcome email: ${error}`);
	}
};

// Function to send a password reset request email
// Parameters: email (recipient's email), resetURL (URL for the password reset)
export const sendPasswordResetEmail = async (email, resetURL) => {
	// Preparing the recipient list as an array of objects
	const recipient = [{ email }];

	try {
		// Sending the email using Mailtrap's client
		const response = await mailtrapClient.send({
			from: sender, // Email sender information
			to: recipient, // Recipient list
			subject: "Reset your password", // Subject of the email
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), // Replacing the placeholder in the template with the actual reset URL
			category: "Password Reset", // Category to organize emails
		});
	} catch (error) {
		// Log error message if email sending fails
		console.error(`Error sending password reset email`, error);

		// Throw an error to propagate the issue
		throw new Error(`Error sending password reset email: ${error}`);
	}
};

// Function to send a password reset success email
// Parameters: email (recipient's email)
export const sendResetSuccessEmail = async (email) => {
	// Preparing the recipient list as an array of objects
	const recipient = [{ email }];

	try {
		// Sending the email using Mailtrap's client
		const response = await mailtrapClient.send({
			from: sender, // Email sender information
			to: recipient, // Recipient list
			subject: "Password Reset Successful", // Subject of the email
			html: PASSWORD_RESET_SUCCESS_TEMPLATE, // Using the pre-defined template for reset success without any replacements
			category: "Password Reset", // Category to organize emails
		});

		// Log success message and response details
		console.log("Password reset email sent successfully", response);
	} catch (error) {
		// Log error message if email sending fails
		console.error(`Error sending password reset success email`, error);

		// Throw an error to propagate the issue
		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
