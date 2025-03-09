import axios from 'axios';

const API_URL = 'http://localhost:5000/admin'; 

// Hospitals
export const addHospital = async (hospitalData) => {
  const response = await axios.post(`${API_URL}/hospital/add-hospital`, hospitalData);
  return response.data;
};

export const removeHospital = async (id) => {
  const response = await axios.delete(`${API_URL}/hospital/${id}`);
  return response.data;
};

export const listHospitals = async () => {
  const response = await axios.get(`${API_URL}/hospital/list-hospitals`);
  return response.data;
};

// Pharmacies
export const addPharmacy = async (pharmacyData) => {
  const response = await axios.post(`${API_URL}/pharmacy/add-pharmacy`, pharmacyData);
  return response.data;
};

export const removePharmacy = async (id) => {
  const response = await axios.delete(`${API_URL}/pharmacy/remove-pharmacy/${id}`);
  return response.data;
};

export const listPharmacies = async () => {
  const response = await axios.get(`${API_URL}/pharmacies/list-all-pharmacies`);
  return response.data;
};