import axios from 'axios';


export const fetchFieldsData = async () => {
    try {
        // Define the API URL (could be moved to an environment variable)
        const API_URL = "http://localhost:3000/fields"; 

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
        //console.log("API Response:", response.data);

        // Return the fetched data
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching field data:", error);
        throw error;  // Rethrow the error for handling in the calling component
    }
};

export const fetchFirstQuestionCH1_1_1 = async () => {
    try {
        const username1 = '';
        const password1 = '';
  
        const API_URL = "http://localhost:8085/CAQ/RELEX/CH1-1-1/";

        const response = await axios.get(API_URL, {
            auth: {
                username: username1,
                password: password1,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching the CH1-1-1 :", error);
        throw error;
    }
};

export const fetchSecondQuestionCH1_1_2 = async () => {
    try{

        const API_URL = "http://localhost:8085/CAQ/RELEX/CH1-1-2/";
        const response = await axios.get(API_URL, {
            auth:{
                
            }
        })
    }catch(error){
        console.error("Error fetching the CH1-1-2 :", error);
        throw error ; 
    }


};


