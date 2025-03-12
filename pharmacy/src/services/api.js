import axios from 'axios';

const API_URL='http://localhost:5000/pharmacy-id';


export const addMedicine=async(doctorData)=>{
    const response=await axios.post(`${API_URL}/add-medicine`);
    return response.data;
}

export const removeMedicine=async(id)=>{
    const response=await axios.delete(`${API_URL}/delete-medicine`);
    return response.data;
}

export const listAllMedicine=async(id)=>{
    const response=await axios.get(`${API_URL}/list-all-medicines`);
    return response.data;
}