import React from 'react';

const AppointmentDetails = ({ match }) => {
  const appointmentId = match.params.id;

  return (
    <div>
      <h2 className="text-3xl font-semibold">Appointment Details</h2>
      <div className="mt-4">
        <p className="font-bold">Appointment ID: {appointmentId}</p>
        <p>Doctor: Dr. John Doe</p>
        <p>Patient: Alice Johnson</p>
        <p>Condition: Fever</p>
        <p>Time: 10:00 AM</p>
      </div>
    </div>
  );
};

export default AppointmentDetails;
