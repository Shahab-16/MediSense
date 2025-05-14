import React, { useState } from "react";
import { toast } from "react-toastify";

const PharmacyAchievement = () => {
  const [achievements, setAchievements] = useState([
    "Certified Pharmacy of the Year 2023",
    "24/7 Emergency Service Provider",
    "ISO 9001:2015 Certified",
    "Best Customer Service Award"
  ]);
  const [newAchievement, setNewAchievement] = useState("");

  const handleAddAchievement = () => {
    if (newAchievement.trim() === "") {
      toast.warning("Please enter an achievement");
      return;
    }
    setAchievements([...achievements, newAchievement]);
    setNewAchievement("");
    toast.success("Achievement added successfully!");
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
    toast.success("Achievement removed!");
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save the data
      // Example:
      // await axios.put('/api/pharmacy/achievements', { achievements });
      toast.success("Achievements saved successfully!");
      console.log("Saved Pharmacy Achievements:", achievements);
    } catch (error) {
      toast.error("Failed to save achievements");
      console.error("Error saving achievements:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Pharmacy Achievements</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            placeholder="Add new pharmacy achievement"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddAchievement()}
          />
          <button
            onClick={handleAddAchievement}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {achievements.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No achievements added yet</p>
          ) : (
            achievements.map((achievement, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{achievement}</span>
                <button
                  onClick={() => handleRemoveAchievement(index)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={achievements.length === 0}
          className={`mt-6 px-6 py-2 text-white rounded-lg transition duration-300 ${
            achievements.length === 0 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PharmacyAchievement;