import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const addDoctor = async (hospitalId, doctorData) => {
    const response = await axios.post(`${BASE_URL}/${hospitalId}/add-doctor`, doctorData);
    return response.data;
};

export const removeDoctor = async (hospitalId, doctorId) => {
    const response = await axios.delete(`${BASE_URL}/${hospitalId}/delete-doctor/${doctorId}`);
    return response.data;
};

export const listAllDoctors = async (hospitalId) => {
    const response = await axios.get(`${BASE_URL}/${hospitalId}/list-all-doctors`);
    return response.data;
};
