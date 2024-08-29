import { motion } from "framer-motion";

// FloatingShape component definition
const FloatingShape = ({ color, size, top, left, delay }) => {
	return (
		// Motion div from framer-motion library for animations
		<motion.div
			className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`} // CSS classes for styling
			style={{ top, left }} // Inline styles to position the shape
			animate={{
				// Animation properties
				y: ["0%", "100%", "0%"], // Vertical movement: moves from 0% to 100% and back to 0%
				x: ["0%", "100%", "0%"], // Horizontal movement: moves from 0% to 100% and back to 0%
				rotate: [0, 360], // Rotation: rotates from 0 to 360 degrees
			}}
			transition={{
				// Transition properties
				duration: 20, // Duration of the animation in seconds
				ease: "linear", // Linear easing function for consistent speed
				repeat: Infinity, // Animation repeats infinitely
				delay, // Optional delay before the animation starts
			}}
			aria-hidden='true' // Accessibility attribute to hide the element from screen readers
		/>
	);
};

export default FloatingShape;
