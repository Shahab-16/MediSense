import axios from "axios";

const BASE_URL = "https://medisense-backend.vercel.app";

// Function to get the token from localStorage, cookies, or headers
const getToken = () => {
  // Check localStorage first
  const tokenFromLocalStorage = localStorage.getItem("token");
  if (tokenFromLocalStorage) return tokenFromLocalStorage;

  // Check cookies
  const tokenFromCookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  if (tokenFromCookies) return tokenFromCookies;

  // Check headers
  const tokenFromHeaders = axios.defaults.headers.common["Authorization"]?.replace("Bearer ", "");
  if (tokenFromHeaders) return tokenFromHeaders;

  return null;
};

// Add Medicine
export const addMedicine = async (pharmacyName, formData) => {
  const token = getToken();
  const response = await axios.post(
    `${BASE_URL}/pharmacy/${pharmacyName}/add-medicine`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Remove Medicine
export const removeMedicine = async (pharmacyName, medicineId) => {
  const token = getToken();
  const response = await axios.delete(
    `${BASE_URL}/pharmacy/${pharmacyName}/delete-medicine/${medicineId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// List All Medicines
export const listAllMedicine = async (pharmacyName) => {
  const token = getToken();
  const response = await axios.get(
    `${BASE_URL}/pharmacy/${pharmacyName}/list-all-medicines`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};