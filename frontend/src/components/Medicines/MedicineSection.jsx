import React, { useContext, useEffect, useState } from 'react'
import  {medicines}  from '../../assets/asset'
import { StoreContext } from '../../context/StoreContext';
import MedicinesList from './MedicinesList';
import { getAllMedicines } from '../../services/axios';
const MedicineSection = ({category}) => {
  const [allmedicines,setMedicines]=useState([]);
  useEffect(()=>{
    const fetchMedcines=async()=>{
      try{
        const res=await getAllMedicines();
        console.log("fetched medicines", res);
        setMedicines(res);
      } catch(error){
        console.log("error in fetching the medicines",error);
      }
    }
    fetchMedcines();  
  },[])
  return (
    <div className='p-[30px] flex flex-col gap-6 mx-auto max-w-[1300px]' id='FoodDisplay'>
      <h2 className='text-3xl font-semibold'>Top Quality Medicines</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mb-[20px]'>
        {allmedicines.map((item)=>{
          if(category==="All" || item.category===category){
            return <MedicinesList key={item._id} id={item._id} {...item}/>
          }
        })}
      </div>
    </div>
  )
}

export default MedicineSection
