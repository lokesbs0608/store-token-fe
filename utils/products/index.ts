import axios, { AxiosResponse, AxiosError } from "axios";
import AxiosInstance from "../../network/index";
import { getBaseUrl } from "../../network/helpers";

const getStoreProduct = async (id: unknown) => {
    try {
        const response: AxiosResponse = await AxiosInstance.get(
            `${getBaseUrl("common")}product/storeId/${id}
            `
        );
        return response.data; // Assuming API returns data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Handle AxiosError specifically
            handleAxiosError(error); // Handle error
        } else {
            console.error("Non Axios error occurred:", error);
            // Handle non-Axios errors if needed
        }
    }
};

// Function to handle Axios errors
const handleAxiosError = (error: AxiosError) => {
   
    if (error.response) {
        // The request was made and the server responded with a status code

    } else if (error.request) {
        // The request was made but no response was received
        console.error("Request:", error.request);
    } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error:", error.message);
    }
};

export { getStoreProduct };
