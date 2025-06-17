import React, { useState, useEffect } from "react";
import { FaBell, FaVideo} from "react-icons/fa";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
const backendurl = 'http://localhost:5000';
const DoctorDashboard = () => {

  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState([]);
  const [currentPatients, setCurrentPatients] = useState([]);
  const { doctorName } = useParams();
  console.log("doctor name", doctorName);
  useEffect(() => {
    const fetchDoctorByName = async () => {
      try {
        const decodedName = doctorName.replace(/-/g, ' ');
        const res = await axios.get(`${backendurl}/hospital/findDoctor/${decodedName}`);
        if (!res.data || !res.data.success) {
          console.log("Doctor not found");
          return;
        }

        console.log("Fetched doctor data:", res.data.data); // ✅ log here
        setDocInfo(res.data.data);

      } catch (error) {
        console.log("Error in fetching the doctor info:", error.message);
      }
    };

    fetchDoctorByName();
  }, [doctorName]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (docInfo && docInfo.currentPatients?.length > 0) {
          console.log("docINfo", docInfo);
          const patientRes = await axios.post(`${backendurl}/hospital/getPatientByIds`, {
            ids: docInfo.currentPatients,
          });

          if (patientRes.data.success) {
            console.log("current patient", patientRes.data.data);
            setCurrentPatients(patientRes.data.data);
          }
        }
      } catch (error) {
        console.log("Error in fetching the patient info:", error.message);
      }
    };

    fetchPatients();
  }, [docInfo]);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  // const todaysAppointments = Object.entries(docInfo.slot_booked).filter(
  //   ([date, _]) => date === formattedToday
  // );
  const [patientsCount, setPatientsCount] = useState(0);
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [upcomingConsultations, setUpcomingConsultations] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const doctorId = 'DOCTOR_ID_FROM_AUTH'
  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Notification Button at the Top-Right */}
      {/* Doctor's Profile Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={docInfo.profileImage}
              alt="Doctor Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-3xl font-bold text-white">{doctorName}</h2>
            <p className="text-white text-opacity-80">{docInfo.specialization}</p>
          </div>
        </div>
      </div>

      {/* Welcome and Summary Section */}
      <h2 className="text-2xl font-bold text-blue-600">Welcome back!</h2>
      <p className="mt-2 text-gray-700">Here’s your activity overview for today.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Total Patients</h3>
          <p className="text-4xl font-bold text-blue-600">{currentPatients.length}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Appointments Today</h3>
          <p className="text-4xl font-bold text-green-600">{currentPatients.length}</p>
        </div>
      </div>

      {/* Calendar View */}
      {/* <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
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
      </div> */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Patients</h1>
        {currentPatients.length > 0 ? (
          currentPatients.map((patient) => (
            <div key={patient._id} className="bg-gray-100 p-4 rounded mb-3 shadow">
              <p className="font-semibold">{patient.firstName} {patient.lastName}</p>
              <p className="text-sm text-gray-500">{patient.email}</p>
              <button
                onClick={() => navigate(`/doctor/chat-with-patient/${patient._id}/${docInfo._id}`)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Chat with Patient
              </button>

              <button
  onClick={() => navigate(`/doctor/video-call-with-patient/${patient._id}/${docInfo._id}`)}
  className="flex items-center px-4 py-2 mt-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
>
  <FaVideo className="mr-2" />
  Start Video Call
</button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No current patients</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
