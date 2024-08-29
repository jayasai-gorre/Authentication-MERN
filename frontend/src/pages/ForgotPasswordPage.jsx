import { motion } from "framer-motion"; // Importing the motion component from framer-motion for animations
import { useState } from "react"; // Importing useState hook from React for managing state
import { useAuthStore } from "../store/authStore"; // Importing a custom hook for accessing authentication related state and actions
import Input from "../components/Input"; // Importing a custom Input component
import { ArrowLeft, Loader, Mail } from "lucide-react"; // Importing icons from lucide-react
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState(""); // State for storing the email input
	const [isSubmitted, setIsSubmitted] = useState(false); // State for tracking if the form has been submitted

	const { isLoading, forgotPassword } = useAuthStore(); // Destructuring isLoading and forgotPassword from the authStore hook

	const handleSubmit = async (e) => {
		e.preventDefault(); // Preventing the default form submission behavior
		await forgotPassword(email); // Calling the forgotPassword function with the email input
		setIsSubmitted(true); // Setting isSubmitted to true to display the success message
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }} // Initial animation state: opacity 0, y-axis 20 pixels down
			animate={{ opacity: 1, y: 0 }} // Final animation state: opacity 1, y-axis 0 pixels
			transition={{ duration: 0.5 }} // Animation duration: 0.5 seconds
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
			// Styling for the container div:
			// - max-width: medium
			// - full width
			// - gray background with 50% opacity
			// - backdrop filter and blur effect
			// - rounded corners
			// - shadow effect
			// - hidden overflow
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Forgot Password
				</h2>
				{/* Heading with gradient text */}
				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<p className='text-gray-300 mb-6 text-center'>
							Enter your email address and we'll send you a link to reset your password.
						</p>
						{/* Instruction text */}
						<Input
							icon={Mail} // Input component with Mail icon
							type='email' // Input type is email
							placeholder='Email Address' // Placeholder text for the input
							value={email} // Binding email state to input value
							onChange={(e) => setEmail(e.target.value)} // Updating email state on input change
							required // Making the input required
						/>
						<motion.button
							whileHover={{ scale: 1.02 }} // Scaling button slightly on hover
							whileTap={{ scale: 0.98 }} // Scaling button slightly on tap
							className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
							// Styling for the button:
							// - full width
							// - padding
							// - gradient background
							// - white text
							// - bold font
							// - rounded corners
							// - shadow effect
							// - gradient hover effect
							// - focus ring
							// - transition duration 200ms
							type='submit' // Button type is submit
						>
							{isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
							{/* Conditional rendering: show Loader if isLoading is true, otherwise show "Send Reset Link" */}
						</motion.button>
					</form>
				) : (
					<div className='text-center'>
						<motion.div
							initial={{ scale: 0 }} // Initial animation state for success icon: scale 0
							animate={{ scale: 1 }} // Final animation state: scale 1
							transition={{ type: "spring", stiffness: 500, damping: 30 }} // Spring animation with specified stiffness and damping
							className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
							// Styling for success icon container:
							// - width and height 64px
							// - green background
							// - rounded full (circle)
							// - flex container for centering
							// - margin-bottom 16px
						>
							<Mail className='h-8 w-8 text-white' />
							{/* Success icon */}
						</motion.div>
						<p className='text-gray-300 mb-6'>
							If an account exists for {email}, you will receive a password reset link shortly.
						</p>
					</div>
				)}
			</div>

			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<Link to={"/login"} className='text-sm text-green-400 hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
					{/* Link to the login page with ArrowLeft icon */}
				</Link>
			</div>
		</motion.div>
	);
};

export default ForgotPasswordPage; // Exporting the ForgotPasswordPage component for use in other parts of the application
