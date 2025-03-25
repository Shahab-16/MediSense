import axios from "axios";

const BASE_URL = `${process.env.BACKEND_URL}`;

// Function to get the token from localStorage, cookies, or headers
const getToken = () => {
  // Check localStorage first
  const tokenFromLocalStorage = localStorage.getItem("token");
  console.log("Token from localStorage:", tokenFromLocalStorage);
  if (tokenFromLocalStorage) return tokenFromLocalStorage;

  // Check cookies
  const tokenFromCookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  console.log("Token from cookies:", tokenFromCookies);
  if (tokenFromCookies) return tokenFromCookies;

  // Check headers
  const tokenFromHeaders = axios.defaults.headers.common[
    "Authorization"
  ]?.replace("Bearer ", "");
  console.log("Token from headers:", tokenFromHeaders);
  if (tokenFromHeaders) return tokenFromHeaders;

  console.log("No token found");
  return null; // No token found
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
      withCredentials: true, // Include credentials (cookies) if needed
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
      withCredentials: true, // Include credentials (cookies) if needed
    }
  );
  return response.data;
};

// List All Medicines
export const listAllMedicine = async (pharmacyName) => {
  const token = getToken();
  console.log("printing name of pharmacy in service api folder:", pharmacyName);
  const response = await axios.get(
    `${BASE_URL}/pharmacy/${pharmacyName}/list-all-medicines`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Include credentials (cookies) if needed
    }
  );
  console.log("Response data after backend call and printing in service api folder:", response.data);
  return response.data;
};