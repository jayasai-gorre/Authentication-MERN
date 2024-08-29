// Exporting the formatDate function so it can be used in other modules
export const formatDate = (dateString) => {
	// Create a new Date object from the provided dateString
	const date = new Date(dateString);

	// Check if the date object is valid
	// getTime() returns NaN if the date is invalid
	if (isNaN(date.getTime())) {
		// Return "Invalid Date" if the date is not valid
		return "Invalid Date";
	}

	// Format the date into a readable string
	// toLocaleString() formats the date according to the locale and options provided
	return date.toLocaleString("en-US", {
		// Format the year as a 4-digit number
		year: "numeric",
		// Format the month as a short name (e.g., "Jan", "Feb")
		month: "short",
		// Format the day as a 2-digit number
		day: "numeric",
		// Format the hour as a 2-digit number (12-hour clock)
		hour: "2-digit",
		// Format the minute as a 2-digit number
		minute: "2-digit",
		// Use 12-hour clock format (AM/PM)
		hour12: true,
	});
};
