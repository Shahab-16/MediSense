import React, { useState } from "react";
import { toast } from "react-toastify";

const HospitalSettings = () => {
  const [settings, setSettings] = useState({
    emergencyContact: "911-222-3333",
    visitingHours: "9:00 AM - 8:00 PM",
    appointmentDuration: 30, // in minutes
    allowOnlineAppointments: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    toast.success("Settings saved successfully!");
    console.log("Saved Settings:", settings);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-4">
            Edit Hospital Settings
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={settings.emergencyContact}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Visiting Hours</label>
              <input
                type="text"
                name="visitingHours"
                value={settings.visitingHours}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Appointment Duration (minutes)</label>
              <input
                type="number"
                name="appointmentDuration"
                value={settings.appointmentDuration}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="allowOnlineAppointments"
                checked={settings.allowOnlineAppointments}
                onChange={handleChange}
                className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-gray-700">Allow Online Appointments</label>
            </div>

            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSettings;