import { motion } from "framer-motion"; // Import the motion component from framer-motion for animations

// Functional component definition
const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
			{/* Simple Loading Spinner */}
			<motion.div
				// Styling the spinner
				className='w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full'
				// Animation properties
				animate={{ rotate: 360 }} // Rotates the spinner continuously
				transition={{
					duration: 1, // Duration of one complete rotation
					repeat: Infinity, // Repeats the animation infinitely
					ease: "linear", // Linear easing for consistent rotation speed
				}}
			/>
		</div>
	);
};

export default LoadingSpinner; // Export the component for use in other parts of the application
