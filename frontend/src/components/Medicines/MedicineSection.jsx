import React, { useContext } from 'react'
import  {medicines}  from '../../assets/asset'
import { StoreContext } from '../../context/StoreContext';
import MedicinesList from './MedicinesList';

const MedicineSection = ({category}) => {
  return (
    <div className='p-[30px] flex flex-col gap-6 max-w-[1300px]' id='FoodDisplay'>
      <h2 className='text-3xl font-semibold'>Top Quality Medicines</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mb-[20px]'>
        {medicines.map((item)=>{
          if(category==="All" || item.category===category){
            return <MedicinesList key={item._id} id={item._id} {...item}/>
          }
        })}
      </div>
    </div>
  )
}

export default MedicineSection
