import React, { useState, useEffect, useContext } from "react";
import {
  FaVideo,
  FaComment,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const { BACKEND_URL, token } = useContext(StoreContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let userId = null;
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          userId = payload.id;
        }

        const response = await axios.get(
          `${BACKEND_URL}/user/doctors/get-all-appointments`,
          {
            params: { userId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setAppointments(response.data.data);
        } else {
          setError("Failed to fetch appointments");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token, BACKEND_URL]);

  const upcomingAppointments = appointments.filter(
    (app) =>
      new Date(`${app.date}T${app.time.replace(" ", ":")}`) > new Date() ||
      app.status === "pending" ||
      app.status === "confirmed"
  );

  const pastAppointments = appointments.filter(
    (app) =>
      new Date(`${app.date}T${app.time.replace(" ", ":")}`) < new Date() &&
      app.status !== "pending" &&
      app.status !== "confirmed"
  );

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return <FaCheckCircle className="text-green-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaHourglassHalf className="text-yellow-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Appointments</h1>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "upcoming"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Appointments
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "past"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past Appointments
        </button>
      </div>

      {activeTab === "upcoming" && (
        <div className="space-y-6">
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No upcoming appointments scheduled
              </p>
            </div>
          ) : (
            upcomingAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6 flex flex-col md:flex-row">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <img
                      src={appointment.profileImage}
                      alt={appointment.doctorName}
                      className="h-32 w-32 rounded-full object-cover border-4 border-blue-100"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {appointment.doctorName}
                        </h2>
                        <p className="text-gray-600">
                          {appointment.specialization}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(appointment.status)}
                        <span className="ml-2 capitalize">
                          {appointment.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-700">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaClock className="mr-2 text-blue-500" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaMoneyBillWave className="mr-2 text-blue-500" />
                        <span>₹{appointment.fees}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({appointment.paymentStatus})
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-4">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/doctors/video-call-with-doctor/${appointment.userId}/${appointment.doctorId}`)
                        }
                        className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                      >
                        <FaVideo className="mr-2" />
                        Start Video Call
                      </button>
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/doctors/chat-with-doctor/${appointment.userId}/${appointment.doctorId}`
                          )
                        }
                        className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                      >
                        <FaComment className="mr-2" />
                        Chat with Doctor
                      </button>
                      {appointment.status === "pending" && (
                        <button className="ml-auto px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                          Cancel Appointment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "past" && (
        <div className="space-y-6">
          {pastAppointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No past appointments found
              </p>
            </div>
          ) : (
            pastAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6 flex flex-col md:flex-row">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <img
                      src={appointment.profileImage}
                      alt={appointment.doctorName}
                      className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {appointment.doctorName}
                        </h2>
                        <p className="text-gray-600">
                          {appointment.specialization}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(appointment.status)}
                        <span className="ml-2 capitalize">
                          {appointment.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-700">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaClock className="mr-2 text-blue-500" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaMoneyBillWave className="mr-2 text-blue-500" />
                        <span>₹{appointment.fees}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({appointment.paymentStatus})
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                        View Prescription
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
