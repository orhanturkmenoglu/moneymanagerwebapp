import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://money-manager-fullstack.onrender.com/api/v1.0",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const excludeEndpoints = [
  "/login",
  "/register",
  "/status",
  "/activate",
  "/health",
];

axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) => {
      config.url?.includes(endpoint);
    });

    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    console.log("config :",config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    console.log("response :",response);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    } else if (error.response.status === 500) {
      console.log("Server error.Please try again later");
    } else if(error.code ==="ECONNABORTED"){
        console.log("Request timeout.Please try again.");
    }
    return Promise.reject(error);
  }
);
