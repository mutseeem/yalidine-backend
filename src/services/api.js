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
    try {
        const API_URL = "http://localhost:8085/CAQ/RELEX/CH1-1-2/";
        const response = await axios.get(API_URL, {
            auth: {
                // Add your authentication credentials here if needed
                username: 'your_username',
                password: 'your_password'
            }
        });

        const apiData = response.data;

        // 1. Process communication plan (DocumentType)
        const communicationPlan = apiData.plans_communication_externe[0];
        const documentAnswer = {
            type: "DocumentType",
            title: communicationPlan.titre,
            description: "Plan de communication externe de la politique",
            date: communicationPlan.anne,
            size: "2.1 MB", // You may need to calculate this from actual data
            format: "PDF",
            url: communicationPlan.downloadLink
        };

        // 2. Process actions for chart data
        const yearData = {
            '2022': { atelier: 0, 'evenement cult': 0, 'conference internatuional': 0 },
            '2023': { atelier: 0, 'evenement cult': 0, 'conference internatuional': 0 },
            '2024': { atelier: 0, 'evenement cult': 0, 'conference internatuional': 0 }
        };

        apiData.actions_sensibilisation.forEach(action => {
            if (yearData[action.anne] && yearData[action.anne][action.context] !== undefined) {
                yearData[action.anne][action.context]++;
            }
        });

        // 3. Prepare chart data
        const years = ['2022', '2023', '2024'];
        const chartData = {
            labels: years,
            datasets: [
                {
                    label: 'Conférences internationales',
                    data: years.map(year => yearData[year]['conference internatuional']),
                    backgroundColor: '#3a0ca3',
                },
                {
                    label: 'Ateliers de sensibilisation',
                    data: years.map(year => yearData[year]['atelier']),
                    backgroundColor: '#7209b7',
                },
                {
                    label: 'Événements culturels',
                    data: years.map(year => yearData[year]['evenement cult']),
                    backgroundColor: '#f72585',
                }
            ]
        };

        // 4. Build the final question object
        return {
            questionId: "C1.1.2",
            questionCode: "C1.1.2",
            questionTitle: "Est-ce que la politique d’ouverture sur l’international est communiquée ?",
            status: "answered",
            questionAnswer: [
                documentAnswer,
                {
                    type: "ChartType",
                    title: "Actions de sensibilisation",
                    subTitle: "Activités menées durant les 3 dernières années (2022-2024)",
                    chartData: chartData,
                    chartOptions: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Activités de sensibilisation par année',
                                font: {
                                    size: 16
                                }
                            },
                            legend: {
                                position: 'bottom'
                            }
                        },
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true,
                                beginAtZero: true
                            }
                        }
                    }
                }
            ]
        };

    } catch (error) {
        console.error("Error fetching the CH1-1-2:", error);
        throw error;
    }
};

export const InsertFirstQuestionCH1_1_1 = async (file, titre, context, anne) => {
    
    if (!file || !titre || !context || !anne) {
        throw new Error("All upload parameters (file, titre, context, anne) are required.");
    }

    // create a new object of FormData to hold the file and other data
    const formData = new FormData();
    formData.append('file', file);       //file
    formData.append('titre', titre);     //title
    formData.append('context', context); //context
    formData.append('anne', anne);       //anne

    // api url
    const API_URL = 'http://localhost:8085/CAQ/RELEX/CH1-1-1/upload';

    try {
        //post request to upload the file
        const response = await axios.post(API_URL, formData, {
            //headers: {
            //    'Authorization':
            //}
        });

        console.log('File uploaded successfully for CH1-1-1:', response.data);
        return response.data;

    } catch (error) {

        console.error('Error uploading file to CH1-1-1:', error);

        //error 
        if (axios.isAxiosError(error)) {
            console.error('Axios error response:', error.response?.data);
            console.error('Axios error status:', error.response?.status);
            console.error('Axios error headers:', error.response?.headers);
            // related to data itself
            throw new Error(error.response?.data?.message || `Upload failed with status: ${error.response?.status}`);
        } else {
            // other erros
            throw new Error('An unexpected error occurred during the upload process.');
        }
    }
};

export const updateFirtQuestionCH1_1_1 = async (documentId, newFile = null, titre, context, anne) => {
    if (!documentId) {
        throw new Error("Document ID is required for updating a document.");
    }

    const formData = new FormData();
    if (newFile) {
        formData.append('file', newFile);
    }
    if (titre !== undefined && titre !== null) {
        formData.append('titre', titre);
    }
    if (context !== undefined && context !== null) {
        formData.append('context', context);
    }
    if (anne !== undefined && anne !== null) {
        formData.append('anne', anne);
    }

    // API URL declared directly inside the function, using template literals for ID
    const API_URL = `http://localhost:8085/CAQ/RELEX/CH1-1-1/${documentId}/update`;

    try {
        const response = await axios.patch(API_URL, formData); // Using axios directly
        console.log(`Document ${documentId} updated successfully:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating document ${documentId}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || `Update failed with status: ${error.response?.status}`);
        } else {
            throw new Error('An unexpected error occurred during document update.');
        }
    }
};

export const deleteFirstQuestionCH1_1_1 = async (documentId) => {
    if (!documentId) {
        throw new Error("Document ID is required for deleting a document.");
    }

    // FIX: Correctly form the API_URL for the DELETE endpoint
    const API_URL = `http://localhost:8085/CAQ/RELEX/CH1-1-1/${documentId}/delete`;

    try {
        const response = await axios.delete(API_URL); // Use axios.delete for DELETE requests
        console.log(`Document ${documentId} deleted successfully:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error deleting document ${documentId}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || `Deletion failed with status: ${error.response?.status}`);
        } else {
            throw new Error('An unexpected error occurred during document deletion.');
        }
    }
};