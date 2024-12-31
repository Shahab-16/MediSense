import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

const DoctorDashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New lab report uploaded for Alice Johnson." },
    { id: 2, message: "Bob Smith rescheduled his appointment to 11:30 AM." },
    { id: 3, message: "Reminder: Staff meeting at 2:00 PM." },
    { id: 4, message: "Medication update for Sarah Connor." },
    { id: 5, message: "Urgent: Check patient Mike Anderson’s test results." },
    { id: 6, message: "New message from Dr. Emily Carter." },
    { id: 7, message: "Maintenance scheduled for the MRI machine tomorrow." },
    { id: 8, message: "Patient feedback survey results are available." },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // State variables to store fetched data
  const [patientsCount, setPatientsCount] = useState(0);
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [upcomingConsultations, setUpcomingConsultations] = useState(0);
  const [schedule, setSchedule] = useState([]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Notification Button at the Top-Right */}
      <div className="absolute top-6 right-6">
        <div className="relative">
          <button
            className="relative text-gray-600 top-5 right-5 focus:outline-none hover:text-blue-600"
            onClick={toggleNotifications}
          >
            <FaBell size={28} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-600 text-white text-xs font-bold leading-tight text-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-10">
              <div className="p-4 border-b bg-blue-50 text-gray-800 font-semibold">
                Notifications
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="px-4 py-3 border-b text-gray-700 hover:bg-blue-50 transition duration-150"
                    >
                      {notification.message}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-gray-500">No new notifications</li>
                )}
              </ul>
              <div
                className="p-3 text-center text-blue-500 hover:underline cursor-pointer bg-gray-50"
                onClick={() => setNotifications([])}
              >
                Clear All
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Doctor's Profile Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Doctor Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-3xl font-bold text-white">Dr. John Doe</h2>
            <p className="text-white text-opacity-80">Cardiologist</p>
          </div>
        </div>
      </div>

      {/* Welcome and Summary Section */}
      <h2 className="text-2xl font-bold text-blue-600">Welcome back!</h2>
      <p className="mt-2 text-gray-700">Here’s your activity overview for today.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Total Patients</h3>
          <p className="text-4xl font-bold text-blue-600">{patientsCount}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Appointments Today</h3>
          <p className="text-4xl font-bold text-green-600">{appointmentsToday}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Upcoming Consultations</h3>
          <p className="text-4xl font-bold text-purple-600">{upcomingConsultations}</p>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
        <h3 className="text-2xl font-bold text-gray-800">Today’s Schedule</h3>
        <div className="mt-4">
          <ul className="divide-y divide-gray-200">
            {schedule.length > 0 ? (
              schedule.map((appointment, index) => (
                <li key={index} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{appointment.name}</p>
                    <p className="text-gray-600">Condition: {appointment.condition}</p>
                  </div>
                  <span className="text-gray-700">{appointment.time}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-500">No appointments for today</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
