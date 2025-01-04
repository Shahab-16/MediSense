import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MdEventNote } from "react-icons/md";

const AppointmentSection = () => {
  // Dummy data for appointments
  const [appointments, setAppointments] = useState([
    { id: 1, name: "John Doe", date: "2025-01-10", time: "10:00 AM", age: 18, doctor: "Dr. Smith", fees: "₹500" },
    { id: 2, name: "Steve Smith", date: "2025-01-12", time: "2:00 PM", age: 35, doctor: "Dr. Alice", fees: "₹800" },
    { id: 3, name: "Bob Johnson", date: "2025-01-15", time: "11:00 AM", age: 18, doctor: "Dr. Brown", fees: "₹600" },
    { id: 4, name: "Alice", date: "2025-01-15", time: "11:00 AM", age: 22, doctor: "Dr. Taylor", fees: "₹700" },
    { id: 5, name: "Joe Root", date: "2025-01-15", time: "11:00 AM", age: 34, doctor: "Dr. Davis", fees: "₹750" },
  ]);

  const handleEdit = (id) => {
    console.log(`Edit appointment with ID: ${id}`);
    // Logic for editing appointment
  };

  const handleDelete = (id) => {
    console.log(`Delete appointment with ID: ${id}`);
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded-lg shadow-md text-sm max-h-[80vh] overflow-auto">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b bg-gray-100 font-semibold">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments */}
        <div className="flex flex-col">
          {appointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b items-center hover:bg-gray-50 transition duration-300"
            >
              {/* Index */}
              <p>{index + 1}</p>

              {/* Patient Name */}
              <p className="flex items-center gap-2">
                <MdEventNote className="text-blue-500" size={18} />
                {appointment.name}
              </p>

              {/* Age */}
              <p>{appointment.age}</p>

              {/* Date & Time */}
              <p>
                {appointment.date} <br />
                <span className="text-gray-500 text-sm">{appointment.time}</span>
              </p>

              {/* Doctor */}
              <p>{appointment.doctor}</p>

              {/* Fees */}
              <p className="text-green-600 font-medium">{appointment.fees}</p>

              {/* Actions */}
              <div className="flex items-center gap-2 justify-center">
                <button
                  onClick={() => handleEdit(appointment.id)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit Appointment"
                >
                  <AiOutlineEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Appointment"
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;
