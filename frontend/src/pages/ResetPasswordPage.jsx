import { useState } from "react"; // Import useState from React to manage component state
import { motion } from "framer-motion"; // Import motion from framer-motion for animations
import { useAuthStore } from "../store/authStore"; // Import useAuthStore custom hook to interact with authentication store
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams for navigation and accessing URL parameters
import Input from "../components/Input"; // Import the Input component for form fields
import { Lock } from "lucide-react"; // Import Lock icon from lucide-react for password fields
import toast from "react-hot-toast"; // Import toast for notifications

const ResetPasswordPage = () => {
	const [password, setPassword] = useState(""); // State for the new password input
	const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming the new password

	const { resetPassword, error, isLoading, message } = useAuthStore(); // Destructure authentication store methods and states

	const { token } = useParams(); // Get the reset token from the URL parameters
	const navigate = useNavigate(); // Initialize useNavigate for redirecting

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		if (password !== confirmPassword) { // Check if passwords match
			alert("Passwords do not match"); // Alert user if passwords do not match
			return; // Exit the function
		}
		try {
			await resetPassword(token, password); // Call resetPassword function from the authentication store

			toast.success("Password reset successfully, redirecting to login page..."); // Show success toast notification
			setTimeout(() => {
				navigate("/login"); // Redirect to login page after 2 seconds
			}, 2000);
		} catch (error) { // Catch any errors during the password reset process
			console.error(error); // Log the error to the console
			toast.error(error.message || "Error resetting password"); // Show error toast notification
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }} // Initial animation state (opacity and vertical position)
			animate={{ opacity: 1, y: 0 }} // Animation state when in view
			transition={{ duration: 0.5 }} // Duration of the animation
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'> {/* Container with padding */}
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Reset Password
				</h2> {/* Header with gradient text */}
				{error && <p className='text-red-500 text-sm mb-4'>{error}</p>} {/* Display error message if exists */}
				{message && <p className='text-green-500 text-sm mb-4'>{message}</p>} {/* Display success message if exists */}

				<form onSubmit={handleSubmit}> {/* Form element with submit handler */}
					<Input
						icon={Lock} // Set Lock icon for this input
						type='password' // Input type is password
						placeholder='New Password' // Placeholder text
						value={password} // Controlled input value
						onChange={(e) => setPassword(e.target.value)} // Update password state on input change
						required // Input is required
					/>

					<Input
						icon={Lock} // Set Lock icon for this input
						type='password' // Input type is password
						placeholder='Confirm New Password' // Placeholder text
						value={confirmPassword} // Controlled input value
						onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state on input change
						required // Input is required
					/>

					<motion.button
						whileHover={{ scale: 1.02 }} // Button scale on hover
						whileTap={{ scale: 0.98 }} // Button scale on tap
						className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit' // Button type is submit
						disabled={isLoading} // Disable button while loading
					>
						{isLoading ? "Resetting..." : "Set New Password"} {/* Button text changes based on loading state */}
					</motion.button>
				</form>
			</div>
		</motion.div>
	);
};
export default ResetPasswordPage; // Export the component for use in other parts of the application
