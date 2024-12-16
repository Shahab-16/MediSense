import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Sample data for time slots
const timeSlots = {
  Monday: ["10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
  Tuesday: ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM"],
  Wednesday: ["11:00 AM", "1:30 PM", "4:00 PM"],
  Thursday: ["9:30 AM", "12:00 PM", "3:00 PM"],
  Friday: ["10:00 AM", "11:30 AM", "2:30 PM"],
  Saturday: ["10:00 AM", "12:00 PM", "1:30 PM", "4:00 PM"],
  Sunday: ["10:00 AM", "2:00 PM", "5:00 PM"],
};

const SlotBooking = () => {
 const {docId}=useParams();
  const navigate=useNavigate()
  const [selectedDay, setSelectedDay] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // Generate days and dates dynamically for the upcoming week
  useEffect(() => {
    const generateDates = () => {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = new Date();
      const next7Days = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        next7Days.push({
          day: days[date.getDay()],
          date: date.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
        });
      }
      return next7Days;
    };

    setDates(generateDates());
  }, []);

  // Handle day selection
  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setSelectedTimeSlot(""); // Reset time slot when day changes
  };

  return (
    <div className="flex justify-center w-full font-sans p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Slot Booking</h1>

        <h2 className="text-lg mb-2">Select a Day</h2>
        <div className="flex gap-2 flex-wrap mb-4">
          {dates.map((item, index) => (
            <button
              key={index}
              onClick={() => handleDaySelection(item.day)}
              className={`p-2 border rounded-md w-24 ${
                selectedDay === item.day
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <div>{item.day}</div>
              <div>{item.date}</div>
            </button>
          ))}
        </div>

        {selectedDay && (
          <>
            <h2 className="text-lg mb-2">Available Time Slots for {selectedDay}</h2>
            <div className="flex gap-2 flex-wrap">
              {timeSlots[selectedDay]?.length > 0 ? (
                timeSlots[selectedDay].map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTimeSlot(time)}
                    className={`p-2 border rounded-md w-28 ${
                      selectedTimeSlot === time
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No slots available.</p>
              )}
            </div>
          </>
        )}

        {selectedTimeSlot && (
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold">
              You have selected: {selectedDay}, {selectedTimeSlot}
            </h3>
            <button onClick={()=>navigate(`/dashboard/doctors/appointment/booking/${docId}`)} className="border rounded-xl bg-blue-500 w-[30%] p-2 font-medium text-white text-center cursor-pointer">Book Appointment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotBooking;
