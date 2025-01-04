import React from 'react';
import { medicines } from '../../assets/admin_assets/assets';

const ListMedicines = () => {
  return (
    <div className='w-full grid grid-cols-4 gap-4 m-2'>
      {medicines.map((item, index) => (
        <div key={index} className='border border-[#C9D8FF] rounded-xl max-w-65 overflow-hidden cursor-pointer group'>
          <img 
            className='bg-blue-100 w-full h-40 object-cover hover:bg-blue-600 transition-all duration-500' 
            src={item.image} 
            alt={item.name}
          />
          <p className='font-semibold'>{item.name}</p>
          <p className='text-gray-600'>{item.category}</p>
          <p className='text-green-600'>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ListMedicines;