import axios from 'axios';

const BASE_URL = `${process.env.BACKEND_URL}`;

// Function to get the token from localStorage, cookies, or headers
const getToken = () => {
  // Check localStorage first
  const tokenFromLocalStorage = localStorage.getItem('token');
  console.log('Token from localStorage:', tokenFromLocalStorage);
  if (tokenFromLocalStorage) return tokenFromLocalStorage;

  // Check cookies
  const tokenFromCookies = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
  console.log('Token from cookies:', tokenFromCookies);
  if (tokenFromCookies) return tokenFromCookies;

  // Check headers
  const tokenFromHeaders = axios.defaults.headers.common['Authorization']?.replace('Bearer ', '');
  console.log('Token from headers:', tokenFromHeaders);
  if (tokenFromHeaders) return tokenFromHeaders;

  console.log('No token found');
  return null; // No token found
};

// Add Doctor
export const addDoctor = async (hospitalName, formData) => {
  const token = getToken();
  const response = await axios.post(`${BASE_URL}/hospital/${hospitalName}/add-doctor`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, // Include credentials (cookies) if needed
  });
  return response.data;
};

// Remove Doctor
export const removeDoctor = async (hospitalName, doctorId) => {
  const token = getToken();
  const response = await axios.delete(`${BASE_URL}/hospital/${hospitalName}/delete-doctor/${doctorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Include credentials (cookies) if needed
  });
  return response.data;
};

// List All Doctors
export const listAllDoctors = async (hospitalName) => {
  const token = getToken();
  console.log("hospitalName printing in service api folder", hospitalName);
  const response = await axios.get(`${BASE_URL}/hospital/${hospitalName}/list-all-doctors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Include credentials (cookies) if needed
  });
  return response.data;
};