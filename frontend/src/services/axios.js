import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // Uncomment only if using cookies based auth
});

// export default axiosInstance;