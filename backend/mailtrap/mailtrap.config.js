// Import the MailtrapClient class from the Mailtrap package
import { MailtrapClient } from "mailtrap";

// Import the dotenv package to load environment variables from a .env file into process.env
import dotenv from "dotenv";

// Load environment variables from the .env file, making them available in process.env
dotenv.config();

// Initialize a new instance of the MailtrapClient using configuration values from environment variables
// The endpoint and token are retrieved from the environment variables MAILTRAP_ENDPOINT and MAILTRAP_TOKEN, respectively
export const mailtrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT, // The API endpoint for Mailtrap (usually something like 'https://send.api.mailtrap.io')
	token: process.env.MAILTRAP_TOKEN,       // The API token used for authenticating requests to the Mailtrap service
});

// Define the sender's email address and name that will be used in the "From" field of emails sent via Mailtrap
export const sender = {
	email: "mailtrap@demomailtrap.com", // The sender's email address (e.g., "no-reply@yourdomain.com")
	name: "TheAtoms",                   // The sender's name (e.g., your application's or organization's name)
};
