import axios from "axios";
// const BASE_URL = "http://localhost:5000";
// 
export const axiosInstance = axios.create({
  baseURL:process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const backendUrl=process.env.VITE_BACKEND_URL;
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


export const getAllMedicinesInCart=async(id)=>{
  const response=await axios.get(`${backendUrl}/user/medicine/get-all-medicines-in-cart`,{params:{id}});
  console.log("fetched all medicines in cart in services", response.data.data);
  return response.data.data;
}


/*This code is not used (StoreContext code is used)*/
export const addMedicineToCart=async(medicineId,id)=>{
  console.log("Printing the userId in the axios of addMedicineToCart",id)
  const response=await axios.post(`${backendUrl}/user/medicine/add-to-cart`,{medicineId},{id});
  console.log("fetched all medicines in cart in services", response.data.data);
  return response.data.data;
}


/*This code is not used (StoreContext code is used)*/
export const removeMedicineFromCart=async(medicineId,id)=>{
  const response=await axios.post(`${backendUrl}/user/medicine/remove-from-cart`,{medicineId});
  console.log("fetched all medicines in cart in services", response.data.data);
  return response.data.data;
}




export const placeMedicineOrder = async (orderData) => {
  try {
    console.log("Inside placeMedicineOrder in axios services"); 
    const response = await axios.post(`${backendUrl}/user/medicine/place-order`, orderData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error placing medicine order:', error);
    throw error;
  }
};


export const bookAppointmentAPI=async(doctor,userId)=>{
  try{
    const token = localStorage.getItem("token");
    console.log("inside the bookAppointment API in services and the data is ",doctor,userId);
    const res=await axios.post(`${backendUrl}/user/doctors/book-appointment`,{doctor,userId},
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      }
    );  
    return res.data;
  } catch(error){
      console.log("error in bookApppoinment API inservice",error);
  }
}