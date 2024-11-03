import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { logout } from "./helpers";

// Create an instance of axios with custom configurations
const instance: AxiosInstance = axios.create({
    baseURL: "", // Base URL for your API
    timeout: 100000, // Request timeout in milliseconds
    headers: {
        "Content-Type": "application/json", // Set default content type
    },
});

const getTokenFromCookies = (): string | undefined => {
    return Cookies.get("accessToken"); // Replace 'token' with the actual cookie name
};

// Optionally, you can intercept requests or responses
instance.interceptors.request.use(
    async (
        config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
        const token = getTokenFromCookies();

        if (token) {
            // Ensure config.headers is initialized as an object if undefined
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        // Check if response status is 400 and message is "Token has expired"
        if (
            error.response?.status === 401 &&
            error.response.statusText === "Invalid token"
        ) {
            // Redirect to login page
            logout();
            window.location.href = "/admin/login";
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default instance;
