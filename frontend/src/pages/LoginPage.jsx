import { useState } from "react"; // Importing useState hook from React to manage local state in the component
import { motion } from "framer-motion"; // Importing motion component from framer-motion for animations
import { Mail, Lock, Loader } from "lucide-react"; // Importing icons from lucide-react for use in the form
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import Input from "../components/Input"; // Importing a custom Input component
import { useAuthStore } from "../store/authStore"; // Importing a custom hook for authentication state and actions

const LoginPage = () => {
	const [email, setEmail] = useState(""); // State for storing email input
	const [password, setPassword] = useState(""); // State for storing password input

	const { login, isLoading, error } = useAuthStore(); // Destructuring login function, isLoading state, and error message from authStore hook

	const handleLogin = async (e) => {
		e.preventDefault(); // Preventing default form submission behavior
		await login(email, password); // Calling login function with email and password
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
					Welcome Back
				</h2>
				{/* Heading with gradient text for the login page */}

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail} // Input component with Mail icon
						type='email' // Input type is email
						placeholder='Email Address' // Placeholder text for the input
						value={email} // Binding email state to input value
						onChange={(e) => setEmail(e.target.value)} // Updating email state on input change
					/>

					<Input
						icon={Lock} // Input component with Lock icon
						type='password' // Input type is password
						placeholder='Password' // Placeholder text for the input
						value={password} // Binding password state to input value
						onChange={(e) => setPassword(e.target.value)} // Updating password state on input change
					/>

					<div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
							Forgot password?
						</Link>
					</div>
					{/* Link to the forgot password page */}
					
					{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
					{/* Conditionally rendering an error message if there is an error */}

					<motion.button
						whileHover={{ scale: 1.02 }} // Slightly scaling button on hover
						whileTap={{ scale: 0.98 }} // Slightly scaling button on tap
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
						disabled={isLoading} // Disabling button when loading
					>
						{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
						{/* Conditional rendering: show Loader if isLoading is true, otherwise show "Login" */}
					</motion.button>
				</form>
			</div>
			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-green-400 hover:underline'>
						Sign up
					</Link>
				</p>
				{/* Text and link to the sign-up page */}
			</div>
		</motion.div>
	);
};

export default LoginPage; // Exporting the LoginPage component for use in other parts of the application
