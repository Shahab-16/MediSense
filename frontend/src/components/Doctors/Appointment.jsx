import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../../services/axios";

const Appointment = () => {
    const { docName } = useParams();
    const { addToAppointmentCart } = useContext(StoreContext);
    const navigate = useNavigate();
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [allDoctorsInfo, setAllDoctorsInfo] = useState([]);
    const { token } = useContext(StoreContext);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await getDoctors();
                setAllDoctorsInfo(res);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, [docName]);

    useEffect(() => {
        if (allDoctorsInfo.length > 0) {
            const doctor = allDoctorsInfo.find(doc => doc.name === docName);
            if (doctor) {
                setDocInfo(doctor);
            }
        }
    }, [docName, allDoctorsInfo]);

    const getAvailableSlots = () => {
        let today = new Date();
        let allSlots = [];

        for (let i = 0; i < 7; i++) {
            let currDate = new Date(today);
            currDate.setDate(today.getDate() + i);
            let endTime = new Date(currDate);
            endTime.setHours(21, 0, 0, 0);

            if (currDate.getDate() === today.getDate()) {
                const currentHour = today.getHours();
                currDate.setHours(currentHour + 1);
                currDate.setMinutes(0);
            } else {
                currDate.setHours(10);
                currDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currDate < endTime) {
                let formattedTime = currDate.toLocaleTimeString([], { 
                    hour: "2-digit", 
                    minute: "2-digit",
                    hour12: true
                });
                
                timeSlots.push({
                    date: new Date(currDate),
                    time: formattedTime,
                });
                currDate.setMinutes(currDate.getMinutes() + 30);
            }

            allSlots.push(timeSlots);
        }

        setDocSlots(allSlots);
    };

    useEffect(() => {
        if (docInfo) getAvailableSlots();
    }, [docInfo]);

    const handleBookAppointment = () => {
        if (!slotTime || !docSlots[slotIndex]?.length) {
            alert("Please select a valid time slot");
            return;
        }

        const selectedSlot = docSlots[slotIndex].find(slot => slot.time === slotTime);
        if (!selectedSlot) {
            alert("Selected time slot not found");
            return;
        }

        const appointment = {
            doctorId: docInfo._id,
            docName: docInfo.name,
            specialization: docInfo.specialization,
            fees: docInfo.fees,
            profileImage: docInfo.profileImage,
            success_rate: docInfo.success_rate,
            dateTime: selectedSlot.date.toISOString(),
            time: selectedSlot.time
        };

        addToAppointmentCart(appointment);
        navigate('/dashboard/doctors/my-appointment-cart');
    };

    return (
        docInfo ? (
            <div className="flex flex-col mx-[10%]">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col">
                        <img 
                            className="bg-blue-600 w-full sm:max-w-72 rounded-lg" 
                            src={docInfo.profileImage} 
                            alt={`Dr. ${docInfo.name}`} 
                        />
                    </div>
                    
                    <div className="flex-1 border border-[#ADADAD] rounded-lg p-6 bg-white mt-4 sm:mt-0">
                        <p className="text-3xl font-semibold text-gray-800">{docInfo.name}</p>
                        <div className="flex items-center gap-3 mt-2">
                            <p className="text-xl text-gray-600">{docInfo.specialization}</p>
                            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                                8+ years experience
                            </span>
                        </div>
                        
                        <div className="mt-4">
                            <p className="font-medium text-gray-700">About</p>
                            <p className="text-gray-600 mt-1">
                                {docInfo.bio || `${docInfo.name} is a highly respected specialist with extensive experience in the field.`}
                            </p>
                        </div>
                        
                        <p className="mt-4 text-gray-700">
                            <span className="font-medium">Appointment Fee:</span> 
                            <span className="ml-2 text-lg font-semibold">₹{docInfo.fees}</span>
                        </p>
                    </div>
                </div>

                {/* Booking Slots */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Appointment Time</h2>
                    
                    <div className="flex gap-4 items-center overflow-x-auto pb-4">
                        {docSlots.map((daySlots, index) => (
                            daySlots.length > 0 && (
                                <div
                                    key={index}
                                    onClick={() => setSlotIndex(index)}
                                    className={`flex flex-col items-center justify-center min-w-16 h-16 rounded-xl cursor-pointer transition-colors ${
                                        slotIndex === index 
                                            ? 'bg-blue-600 text-white' 
                                            : 'border border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="text-sm font-medium">
                                        {daysOfWeek[daySlots[0].date.getDay()]}
                                    </span>
                                    <span className="text-sm">
                                        {daySlots[0].date.getDate()}
                                    </span>
                                </div>
                            )
                        ))}
                    </div>
                    
                    <div className="mt-4">
                        <h3 className="text-gray-700 mb-2">Available Time Slots:</h3>
                        <div className="flex flex-wrap gap-2">
                            {docSlots[slotIndex]?.map((slot, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSlotTime(slot.time)}
                                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                        slot.time === slotTime
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-8 mb-4">
                        <button
                            onClick={handleBookAppointment}
                            disabled={!slotTime}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors disabled:opacity-50"
                        >
                            Add to Appointment Cart
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Loading doctor information...</p>
            </div>
        )
    );
};

export default Appointment;