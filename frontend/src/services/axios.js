import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://medisense-backend.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDoctors=async()=>{
    const response=await axiosInstance.get("/hospital/get-all-doctors");
    console.log("fetched doctors in services",response.data.data);
    return response.data.data;

}

export const getAllHopitals=async()=>{
    const response=await axiosInstance.get("hospital/get-all-hospitals");
    console.log("fetched hospitals in services",response.data.data);
    return response.data.data;
}
export const getMedicalStores=async()=>{
    const response=await axiosInstance.get("pharmacy/get-all-stores");
    console.log("fetched stores in services",response.data.data);
    return response.data.data;
}

export const getAllMedicines=async()=>{
  const response=await axiosInstance.get("pharmacy/get-all-medicines");
  console.log("fetched all medicines in services", response.data.data);
  return response.data.data;
}
export const listAllMedicinesInMedicalStore=async()=>{
  const response=await axiosInstance.get("")
}
// export default axiosInstance;