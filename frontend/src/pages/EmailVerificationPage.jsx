import { useEffect, useRef, useState } from "react"; // Import hooks for managing state and effects
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { motion } from "framer-motion"; // Import motion for animations
import { useAuthStore } from "../store/authStore"; // Import the custom hook for authentication store
import toast from "react-hot-toast"; // Import toast for notifications

// Define the EmailVerificationPage component
const EmailVerificationPage = () => {
	// State to store the code split into individual characters
	const [code, setCode] = useState(["", "", "", "", "", ""]); 

	// Reference array to keep track of input fields
	const inputRefs = useRef([]); 

	// Hook for navigation
	const navigate = useNavigate(); 

	// Destructure authentication store state and actions
	const { error, isLoading, verifyEmail } = useAuthStore(); 

	// Function to handle changes in the input fields
	const handleChange = (index, value) => {
		const newCode = [...code]; // Create a copy of the current code array

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split(""); // Split pasted content into individual characters
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || ""; // Update the code array with pasted content
			}
			setCode(newCode); // Update the state with the new code

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus(); // Focus on the appropriate input field
		} else {
			newCode[index] = value; // Update the code array with the new value
			setCode(newCode); // Update the state with the new code

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus(); // Focus on the next input field
			}
		}
	};

	// Function to handle key down events in the input fields
	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus(); // Move focus to the previous input field if current one is empty
		}
	};

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		const verificationCode = code.join(""); // Join the code array into a single string
		try {
			await verifyEmail(verificationCode); // Call the verifyEmail function with the verification code
			navigate("/"); // Navigate to the home page on successful verification
			toast.success("Email verified successfully"); // Show success notification
		} catch (error) {
			console.log(error); // Log any errors that occur during verification
		}
	};

	// Effect to automatically submit the form when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit")); // Trigger form submission if all fields are filled
		}
	}, [code]);

	return (
		<div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
			{/* Wrapper div with styling for background, positioning, and layout */}
			<motion.div
				initial={{ opacity: 0, y: -50 }} // Initial animation state (fade in and move up)
				animate={{ opacity: 1, y: 0 }} // Final animation state (fully visible and in original position)
				transition={{ duration: 0.5 }} // Animation duration of 0.5 seconds
				className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
			>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Verify Your Email
				</h2>
				{/* Title with gradient text */}
				<p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>
				{/* Instructions text */}

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Form container with spacing between elements */}
					<div className='flex justify-between'>
						{/* Flex container to arrange input fields */}
						{code.map((digit, index) => (
							<input
								key={index} // Unique key for each input element
								ref={(el) => (inputRefs.current[index] = el)} // Store reference to the input element
								type='text' // Input type for single characters
								maxLength='6' // Maximum length of input value
								value={digit} // Current value of the input field
								onChange={(e) => handleChange(index, e.target.value)} // Handle input changes
								onKeyDown={(e) => handleKeyDown(index, e)} // Handle key down events
								className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
							/>
						))}
					</div>
					{/* Render an array of input fields for the verification code */}
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					{/* Show error message if there's an error */}
					<motion.button
						whileHover={{ scale: 1.05 }} // Slightly scale up the button on hover
						whileTap={{ scale: 0.95 }} // Slightly scale down the button on click
						type='submit' // Button type for form submission
						disabled={isLoading || code.some((digit) => !digit)} // Disable button if loading or any input field is empty
						className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</motion.button>
					{/* Submit button with loading state and hover/tap animations */}
				</form>
			</motion.div>
		</div>
	);
};

export default EmailVerificationPage; // Export the component for use in other parts of the application
