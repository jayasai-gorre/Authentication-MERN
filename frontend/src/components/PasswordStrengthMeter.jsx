import { Check, X } from "lucide-react";

// PasswordCriteria Component
const PasswordCriteria = ({ password }) => {
	// Define password criteria and check if they are met
	const criteria = [
		{ label: "At least 6 characters", met: password.length >= 6 },
		{ label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", met: /[a-z]/.test(password) },
		{ label: "Contains a number", met: /\d/.test(password) },
		{ label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
	];

	return (
		// Container for the password criteria
		<div className='mt-2 space-y-1'>
			{/* Map through each criterion and display its status */}
			{criteria.map((item) => (
				// Each criterion is displayed as a flex item with a check or X icon
				<div key={item.label} className='flex items-center text-xs'>
					{/* Display Check icon if criterion is met, otherwise display X icon */}
					{item.met ? (
						<Check className='size-4 text-green-500 mr-2' />
					) : (
						<X className='size-4 text-gray-500 mr-2' />
					)}
					{/* Display the criterion label with appropriate color based on its status */}
					<span className={item.met ? "text-green-500" : "text-gray-400"}>
						{item.label}
					</span>
				</div>
			))}
		</div>
	);
};

// PasswordStrengthMeter Component
const PasswordStrengthMeter = ({ password }) => {
	// Function to calculate password strength
	const getStrength = (pass) => {
		let strength = 0;
		// Increment strength for each criterion met
		if (pass.length >= 6) strength++;
		if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
		if (pass.match(/\d/)) strength++;
		if (pass.match(/[^a-zA-Z\d]/)) strength++;
		return strength;
	};

	// Calculate current strength of the provided password
	const strength = getStrength(password);

	// Function to determine color based on strength
	const getColor = (strength) => {
		// Return a color class based on the password strength
		if (strength === 0) return "bg-red-500";
		if (strength === 1) return "bg-red-400";
		if (strength === 2) return "bg-yellow-500";
		if (strength === 3) return "bg-yellow-400";
		return "bg-green-500";
	};

	// Function to get strength text based on the strength value
	const getStrengthText = (strength) => {
		// Return a descriptive text based on password strength
		if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		return "Strong";
	};

	return (
		// Container for the password strength meter
		<div className='mt-2'>
			{/* Display password strength text */}
			<div className='flex justify-between items-center mb-1'>
				<span className='text-xs text-gray-400'>Password strength</span>
				<span className='text-xs text-gray-400'>{getStrengthText(strength)}</span>
			</div>

			{/* Render strength meter as a series of colored circles */}
			<div className='flex space-x-1'>
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                ${index < strength ? getColor(strength) : "bg-gray-600"}
              `}
					/>
				))}
			</div>
			{/* Display password criteria */}
			<PasswordCriteria password={password} />
		</div>
	);
};

export default PasswordStrengthMeter;
