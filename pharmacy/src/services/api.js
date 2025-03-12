import axios from 'axios';

const API_URL='http://localhost:5000/';


export const addMedicine=async(pharmacyId,medicineData)=>{
    const response=await axios.post(`${API_URL}/${pharmacyId}/add-medicine`,medicineData);
    return response.data;
}

export const removeMedicine=async(pharmacyId,medicineId,number)=>{
    const response=await axios.delete(`${API_URL}/${pharmacyId}/delete-medicine/${medicinieId}`);
    return response.data;
}

export const listAllMedicine=async(id)=>{
    const response=await axios.get(`${API_URL}/list-all-medicines`);
    return response.data;
}