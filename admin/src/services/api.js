import axios from 'axios';
const API_URL = `${process.env.BACKEND_URL}/admin`;

// Function to get the token from localStorage
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

// Hospitals
export const addHospital = async (hospitalData) => {
  const token = getToken();
  console.log("Token present in service api folder", token);
  const response = await axios.post(`${API_URL}/hospital/add-hospital`, hospitalData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Ensure proper content type for file uploads
    },
    withCredentials: true,
  });
  return response.data;
};

export const removeHospital = async (id) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/hospital/remove-hospital/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const listHospitals = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/hospital/list-hospitals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Pharmacies
export const addPharmacy = async (pharmacyData) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/pharmacy/add-pharmacy`, pharmacyData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Add this line
    },
  });
  return response.data;
};


export const removePharmacy = async (id) => {
  const token = getToken();
  console.log("Removing pharmacy with ID in service api folder:", id);
  const response = await axios.delete(`${API_URL}/pharmacy/remove-pharmacy/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Response data after backend call and printing in service api folder:", response.data);
  return response.data;
};

export const listPharmacies = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/pharmacy/list-all-pharmacies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};