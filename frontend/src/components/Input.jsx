// Import React and any necessary libraries
import React from 'react';

// Define the Input component
// The component takes an `icon` prop, which should be a React component, and any other props passed via the spread operator `...props`
const Input = ({ icon: Icon, ...props }) => {
	return (
		// Container div for positioning and styling
		<div className='relative mb-6'>
			{/* Absolute positioning container for the icon */}
			{/* This ensures the icon is positioned correctly inside the input field */}
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				{/* Render the icon passed as a prop */}
				{/* The `Icon` component will be rendered with the specified classes */}
				<Icon className='size-5 text-green-500' />
			</div>
			{/* The input element */}
			{/* Spread operator `{...props}` allows passing additional attributes to the input, like `type`, `name`, `value`, etc. */}
			<input
				{...props}
				className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
				// Width is set to full, padding is adjusted for the icon and input text
				// Background color is a semi-transparent gray
				// Rounded corners with a border color
				// Focus styles include border and ring color changes
			/>
		</div>
	);
};

// Export the component for use in other parts of the application
export default Input;
