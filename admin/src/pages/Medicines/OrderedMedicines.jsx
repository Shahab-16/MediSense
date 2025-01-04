import React, { useState } from 'react';

const AppointmentSection = () => {
    return (
        <div className='w-full max-w-6xl m-5 '>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>
                    <div className='bg-white border rounded text-sm max-h-[80vh]'>
                      <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                      <p>#</p>
                      <p>Medicine Name</p>
                      <p>Price</p>
                      <p>Category</p>
                      <p>Composition</p>
                      </div>
                    </div>
        </div>
    );
}

export default AppointmentSection;

