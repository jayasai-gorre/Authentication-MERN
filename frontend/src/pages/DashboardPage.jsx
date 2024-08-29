import { motion } from "framer-motion"; // Import motion from framer-motion for animations
import { useAuthStore } from "../store/authStore"; // Import custom hook to access authentication state and functions
import { formatDate } from "../utils/date"; // Import utility function to format dates

// DashboardPage Component
const DashboardPage = () => {
	// Destructure user and logout function from the authentication store
	const { user, logout } = useAuthStore();

	// Handler function to perform logout
	const handleLogout = () => {
		logout(); // Call logout function from auth store to log out the user
	};

	return (
		// Main container for the dashboard page with motion animations
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }} // Initial state of animation (invisible and slightly scaled down)
			animate={{ opacity: 1, scale: 1 }} // Final state of animation (fully visible and normal scale)
			exit={{ opacity: 0, scale: 0.9 }} // Exit state of animation (fade out and scale down)
			transition={{ duration: 0.5 }} // Animation duration
			className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
		>
			{/* Title of the dashboard */}
			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
				Dashboard
			</h2>

			<div className='space-y-6'>
				{/* Profile Information Section */}
				<motion.div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }} // Initial state of animation (invisible and slightly moved down)
					animate={{ opacity: 1, y: 0 }} // Final state of animation (fully visible and moved to original position)
					transition={{ delay: 0.2 }} // Animation delay for this section
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
					{/* Display user name and email */}
					<p className='text-gray-300'>Name: {user.name}</p>
					<p className='text-gray-300'>Email: {user.email}</p>
				</motion.div>

				{/* Account Activity Section */}
				<motion.div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }} // Initial state of animation (invisible and slightly moved down)
					animate={{ opacity: 1, y: 0 }} // Final state of animation (fully visible and moved to original position)
					transition={{ delay: 0.4 }} // Animation delay for this section
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
					{/* Display account creation and last login dates */}
					<p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className='text-gray-300'>
						<span className='font-bold'>Last Login: </span>
						{formatDate(user.lastLogin)} {/* Format the last login date */}
					</p>
				</motion.div>
			</div>

			{/* Logout Button */}
			<motion.div
				initial={{ opacity: 0, y: 20 }} // Initial state of animation (invisible and slightly moved down)
				animate={{ opacity: 1, y: 0 }} // Final state of animation (fully visible and moved to original position)
				transition={{ delay: 0.6 }} // Animation delay for this section
				className='mt-4'
			>
				<motion.button
					whileHover={{ scale: 1.05 }} // Slightly scale up button on hover
					whileTap={{ scale: 0.95 }} // Slightly scale down button on click
					onClick={handleLogout} // Call handleLogout function on button click
					className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					Logout
				</motion.button>
			</motion.div>
		</motion.div>
	);
};

export default DashboardPage;
