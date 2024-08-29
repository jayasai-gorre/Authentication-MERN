import { create } from "zustand"; // Import the `create` function from zustand for state management
import axios from "axios"; // Import axios for making HTTP requests

// Define the base API URL depending on the environment (development or production)
const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:7777/api/auth" // Development API URL
  : "/api/auth"; // Production API URL

// Set axios default behavior to include cookies with requests
axios.defaults.withCredentials = true;

// Create a zustand store for managing authentication state and actions
export const useAuthStore = create((set) => ({
  // Initial state of the authentication store
  user: null, // Stores the authenticated user's information
  isAuthenticated: false, // Indicates if the user is authenticated
  error: null, // Stores any error messages
  isLoading: false, // Indicates if a request is in progress
  isCheckingAuth: true, // Indicates if the authentication status is being checked
  message: null, // Stores general messages (e.g., success messages)

  // Function to handle user sign-up
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null }); // Set loading state and clear any previous errors
    try {
      // Make a POST request to the sign-up endpoint with the user's credentials
      const response = await axios.post(`${API_URL}/signup`, { email, password, name });
      // On success, update the store with the user's information and authentication status
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      // On error, update the store with the error message and reset the loading state
      set({ error: error.response.data.message || "Error signing up", isLoading: false });
      throw error; // Propagate the error to the calling function
    }
  },

  // Function to handle user login
  login: async (email, password) => {
    set({ isLoading: true, error: null }); // Set loading state and clear any previous errors
    try {
      // Make a POST request to the login endpoint with the user's credentials
      const response = await axios.post(`${API_URL}/login`, { email, password });
      // On success, update the store with the user's information and authentication status
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      // On error, update the store with the error message and reset the loading state
      set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
      throw error; // Propagate the error to the calling function
    }
  },

  // Function to handle user logout
  logout: async () => {
    set({ isLoading: true, error: null }); // Set loading state and clear any previous errors
    try {
      // Make a POST request to the logout endpoint
      await axios.post(`${API_URL}/logout`);
      // On success, clear user information and authentication status
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      // On error, update the store with the error message and reset the loading state
      set({ error: "Error logging out", isLoading: false });
      throw error; // Propagate the error to the calling function
    }
  },

  // Function to handle email verification
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null }); // Set loading state and clear any previous errors
    try {
      // Make a POST request to the email verification endpoint with the verification code
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      // On success, update the store with the user's information and authentication status
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data; // Return response data for further use if needed
    } catch (error) {
      // On error, update the store with the error message and reset the loading state
      set({ error: error.response.data.message || "Error verifying email", isLoading: false });
      throw error; // Propagate the error to the calling function
    }
  },

  // Function to check authentication status
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null }); // Set checking status and clear any previous errors
    try {
      // Make a GET request to check authentication status
      const response = await axios.get(`${API_URL}/check-auth`);
      // On success, update the store with the user's information and authentication status
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      // On error, update the store with the authentication status and reset the checking status
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  // Function to handle forgot password request
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null }); // Set loading state and clear any previous errors
    try {
      // Make a POST request to the forgot password endpoint with the user's email
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      // On success, update the store with the message and reset the loading state
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      // On error, update the store with the error message and reset the loading state
      set({
        isLoading: false,
        error: error.response.data.message || "Error sending reset password email",
      });
      throw error; // Propagate the error to the calling function
    }
  },

  // Function to handle password reset
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null }); // Set loading state and clear any previous errors
    try {
      // Make a POST request to the reset password endpoint with the reset token and new password
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      // On success, update the store with the message and reset the loading state
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      let errorMessage = "Error resetting password"; // Default error message
      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        // Handle case where no response was received or network errors occurred
        errorMessage = error.message;
      }
      // Update the store with the error message and reset the loading state
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error; // Propagate the error to the calling function
    }
  },
}));
