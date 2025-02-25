import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const HospitalAchievements = () => {
  const [achievements, setAchievements] = useState([
    "Center of Excellence in Cardiac Care",
    "Best Hospital Award 2023",
    "Green Hospital Certification",
  ]);
  const [newAchievement, setNewAchievement] = useState("");

  const handleAddAchievement = () => {
    if (newAchievement.trim() === "") return;
    setAchievements([...achievements, newAchievement]);
    setNewAchievement("");
    toast.success("Achievement added!");
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
    toast.success("Achievement removed!");
  };

  const handleSave = () => {
    // Simulate API call to save data
    toast.success("Achievements saved successfully!");
    console.log("Saved Achievements:", achievements);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Edit Hospital Achievements</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            placeholder="Add new achievement"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddAchievement}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{achievement}</span>
              <button
                onClick={() => handleRemoveAchievement(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default HospitalAchievements;