import axios from 'axios';

const API_URL='http://localhost:5000/hospitaIld';


export const addDoctor=async(doctorData)=>{
    const response=await axios.post(`${API_URL}/add-doctor`);
    return response.data;
}

export const removeDoctor=async(id)=>{
    const response=await axios.delete(`${API_URL}/delete-doctor`);
    return response.data;
}

export const listAllDoctor=async(id)=>{
    const response=await axios.get(`${API_URL}/list-all-doctors`);
    return response.data;
}