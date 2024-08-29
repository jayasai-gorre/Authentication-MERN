import { motion } from "framer-motion"; // Import motion for animations
import Input from "../components/Input"; // Import custom Input component
import { Loader, Lock, Mail, User } from "lucide-react"; // Import icons from lucide-react
import { useState } from "react"; // Import useState hook for managing state
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation and useNavigate for programmatic navigation
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"; // Import custom PasswordStrengthMeter component
import { useAuthStore } from "../store/authStore"; // Import custom auth store hook

// Define the SignUpPage component
const SignUpPage = () => {
	// State hooks for managing input values
	const [name, setName] = useState(""); // State for the user's full name
	const [email, setEmail] = useState(""); // State for the user's email address
	const [password, setPassword] = useState(""); // State for the user's password
	const navigate = useNavigate(); // Hook for navigation

	// Destructure authentication store actions and state
	const { signup, error, isLoading } = useAuthStore(); 

	// Function to handle form submission
	const handleSignUp = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		try {
			await signup(email, password, name); // Attempt to sign up with the provided credentials
			navigate("/verify-email"); // Navigate to email verification page on success
		} catch (error) {
			console.log(error); // Log any errors that occur during signup
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }} // Initial animation state (faded in and slightly moved down)
			animate={{ opacity: 1, y: 0 }} // Final animation state (fully visible and in original position)
			transition={{ duration: 0.5 }} // Animation duration of 0.5 seconds
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Create Account
				</h2>
				{/* Title with gradient text */}
				
				<form onSubmit={handleSignUp}>
					{/* Form container with onSubmit handler */}
					<Input
						icon={User} // User icon for the input field
						type='text' // Input type for text (full name)
						placeholder='Full Name' // Placeholder text
						value={name} // Controlled value for the input
						onChange={(e) => setName(e.target.value)} // Update state on input change
					/>
					{/* Input for full name */}
					
					<Input
						icon={Mail} // Mail icon for the input field
						type='email' // Input type for email address
						placeholder='Email Address' // Placeholder text
						value={email} // Controlled value for the input
						onChange={(e) => setEmail(e.target.value)} // Update state on input change
					/>
					{/* Input for email address */}
					
					<Input
						icon={Lock} // Lock icon for the input field
						type='password' // Input type for password
						placeholder='Password' // Placeholder text
						value={password} // Controlled value for the input
						onChange={(e) => setPassword(e.target.value)} // Update state on input change
					/>
					{/* Input for password */}
					
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					{/* Display error message if there is any */}
					
					<PasswordStrengthMeter password={password} />
					{/* Component to show password strength meter */}
					
					<motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }} // Slightly scale up the button on hover
						whileTap={{ scale: 0.98 }} // Slightly scale down the button on click
						type='submit' // Button type for form submission
						disabled={isLoading} // Disable button while loading
					>
						{isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
						{/* Show loader icon while loading, otherwise show "Sign Up" text */}
					</motion.button>
				</form>
			</div>
			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				{/* Footer with login link */}
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-green-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</motion.div>
	);
};

export default SignUpPage; // Export the SignUpPage component for use in other parts of the application
