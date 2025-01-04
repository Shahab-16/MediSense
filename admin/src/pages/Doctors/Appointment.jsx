import React, { useState } from 'react';

const AppointmentSection = () => {
    // Dummy data for appointments
    // const [appointments, setAppointments] = useState([
        // { id: 1, name: 'John Doe', date: '2025-01-10', time: '10:00 AM' ,Age: '18'},
        // { id: 2, name: 'Steve Smith', date: '2025-01-12', time: '2:00 PM' ,Age: '35'},
        // { id: 3, name: 'Bob Johnson', date: '2025-01-15', time: '11:00 AM' ,Age: '18'},
        // { id: 3, name: 'Alice', date: '2025-01-15', time: '11:00 AM' ,Age: '22'},
        // { id: 3, name: 'Joe Root', date: '2025-01-15', time: '11:00 AM' ,Age: '34'}
    // ]);

    return (
        <div className='w-full max-w-6xl m-5 '>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>
                {/* {appointments.map(appointment => ( */}
                    <div className='bg-white border rounded text-sm max-h-[80vh] overflow'>
                      <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                      <p>#</p>
                      <p>Patient</p>
                      <p>Age</p>
                      <p>Date & Time</p>
                      <p>Doctor</p>
                      <p>Fees</p>
                      <p>Action</p>
                      </div>
                    </div>
                {/* ))} */}
        </div>
    );
}

export default AppointmentSection;

