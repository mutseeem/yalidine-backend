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


