import axios from 'axios';

//const API_URL = "https://medisense-backend.vercel.app/admin";
const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/admin`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || 
                document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login if token is invalid
      window.location.href = 'https://medisense-frontend.vercel.app/login';
    }
    return Promise.reject(error);
  }
);

// Hospital API calls
export const addHospital = async (hospitalData) => {
  const response = await api.post('/hospital/add-hospital', hospitalData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const removeHospital = async (id) => {
  const response = await api.delete(`/hospital/remove-hospital/${id}`);
  return response.data;
};

export const listHospitals = async () => {
  const response = await api.get('/hospital/list-hospitals');
  return response.data;
};

// Pharmacy API calls
export const addPharmacy = async (pharmacyData) => {
  const response = await api.post('/pharmacy/add-pharmacy', pharmacyData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const removePharmacy = async (id) => {
  const response = await api.delete(`/pharmacy/remove-pharmacy/${id}`);
  return response.data;
};

export const listPharmacies = async () => {
  const response = await api.get('/pharmacy/list-all-pharmacies');
  return response.data;
};