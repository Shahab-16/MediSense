import React from 'react';

const DoctorDashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold">Welcome back, Dr. John Doe!</h2>
      <p className="mt-4 text-gray-700">Here’s an overview of your activity today.</p>
      
      {/* Example of patient statistics or charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold text-xl">Total Patients</h3>
          <p className="text-3xl font-bold">200</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold text-xl">Appointments Today</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold text-xl">Upcoming Consultations</h3>
          <p className="text-3xl font-bold">3</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
