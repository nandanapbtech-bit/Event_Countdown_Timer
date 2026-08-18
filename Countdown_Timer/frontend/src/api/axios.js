import axios from "axios";

const API = axios.create({
    baseURL: "https://event-countdown-timer-rs4f.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
    },
});


// Add access token to every request
API.interceptors.request.use(
    (config) => {

        const accessToken = localStorage.getItem("access");

        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);


// Automatically refresh expired access token
API.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            const refreshToken =
                localStorage.getItem("refresh");

            if (!refreshToken) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {

                const response = await axios.post(
                    "https://event-countdown-timer-rs4f.onrender.com/api/token/refresh/",
                    {
                        refresh: refreshToken,
                    }
                );

                const newAccessToken =
                    response.data.access;

                localStorage.setItem(
                    "access",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return API(originalRequest);

            } catch (refreshError) {

                localStorage.clear();
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;