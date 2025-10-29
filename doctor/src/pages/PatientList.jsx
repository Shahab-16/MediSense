import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const backendurl = process.env.REACT_APP_BACKEND_URL;

const PatientList = () => {
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

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); // Returns the current date and time
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">PATIENTS</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Patient</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Condition</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date & Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map(patient => (
              <tr key={patient.id} className="border-t hover:bg-gray-50 my-2 transition duration-200 shadow-lg rounded-lg">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img
                    src={patient.profilePic}
                    alt={`${patient.firstName}'s profile`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{patient.firstName} {patient.lastName}</p>
                    <p className="text-sm text-gray-500">Patient ID: {patient._id}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-lg text-gray-600">{patient.condition}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{getCurrentDateTime()}</td>
                <td className="px-6 py-4 text-lg text-blue-500">
                  <Link to={`/appointments/${patient._id}`} className="hover:underline">View Appointment</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
