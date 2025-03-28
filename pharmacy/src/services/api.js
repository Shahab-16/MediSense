import axios from "axios";

const BASE_URL = "https://medisense-backend.vercel.app";

// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get the token from localStorage
const getToken = () => {
  // Check localStorage first
  const token = localStorage.getItem("token");
  return token;
};

// Add Medicine
export const addMedicine = async (pharmacyName, formData) => {
  try {
    const response = await api.post(
      `/pharmacy/${pharmacyName}/add-medicine`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Remove Medicine
export const removeMedicine = async (pharmacyName, medicineId) => {
  try {
    const response = await api.delete(
      `/pharmacy/${pharmacyName}/delete-medicine/${medicineId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// List All Medicines
export const listAllMedicine = async (pharmacyName) => {
  try {
    const response = await api.get(
      `/pharmacy/${pharmacyName}/list-all-medicines`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};