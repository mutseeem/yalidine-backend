import axios from 'axios';

export const fetchFieldsData = async () => {
    try {
        // Define the API URL (could be moved to an environment variable)
        const API_URL = "http://localhost:5000/fields"; 

        // API Key (add your key here or store it in .env for security)
        // Example:
        // const API_KEY = 'your-api-key-here'; 

        // Or, if using .env file:
        // const API_KEY = process.env.REACT_APP_API_KEY; 

        // Make the GET request with the API key in the headers for authentication
        const response = await axios.get(API_URL, {
            headers: {
                // Send the API key in the Authorization header (as a Bearer token)
                // Authorization: `Bearer ${API_KEY}` // Uncomment this line when you have your API key
            }
        });

        // Debugging: Log the API response
        console.log("API Response:", response.data);

        // Return the fetched data
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching field data:", error);
        throw error;  // Rethrow the error for handling in the calling component
    }
};
