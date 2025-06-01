import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdChat } from 'react-icons/md';

import { doctors } from "../../assets/asset";
import  { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { bookAppointmentAPI, getDoctors } from "../../services/axios";
const Appointment = () => {
    const { docName } = useParams();
    const {selectedDoctors,setSelectedDoctors}=useContext(StoreContext);
    console.log("doc name", docName);
    const navigate = useNavigate()
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState(' ');
    const { doctors } = useContext(StoreContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [allDoctorsInfo, setAllDoctorsInfo] = useState([]);
    //getting all doctors from databse and filtering info by name

    useEffect(() => {
        const fectchDoctors = async () => {
            try {
                const res = await getDoctors();
                console.log("fetched doctors in appointent section", res);
                setAllDoctorsInfo(res);
            } catch (error) {
                console.log("error in fetching data in appointment section", error);
            }
        }
        fectchDoctors();
    }, [docName])

    //fetch info of the doctor who is getting appointmented
    useEffect(() => {
        const fetchDocInfo = async () => {
            const docInfo = allDoctorsInfo.find(doc => doc.name == docName);
            setDocInfo(docInfo);
            console.log("dcotors Info", docInfo);
        };
        fetchDocInfo();
    }, [docName, allDoctorsInfo])

    const getAvailableSlots = async () => {
        let today = new Date();
        let allSlots = [];

        for (let i = 0; i < 7; i++) {
            let currDate = new Date(today);
            currDate.setDate(today.getDate() + i);
            let endTime = new Date(currDate);
            endTime.setHours(21, 0, 0, 0); // Ensure end time is 9 PM

            if (currDate.getDate() === today.getDate()) {
                currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
                currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currDate.setHours(10);
                currDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currDate < endTime) {
                let formattedTime = currDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                timeSlots.push({
                    dateTime: new Date(currDate), // Store a copy of the date to avoid mutation
                    time: formattedTime,
                });
                currDate.setMinutes(currDate.getMinutes() + 30);
            }

            allSlots.push(timeSlots);
        }

        // Replace the previous state with the new slots (not appending)
        setDocSlots(allSlots);
    };

    //make appContext
    useEffect(() => {
        if (docInfo) getAvailableSlots();
    }, [docInfo]);

    const bookAppointment = async () => {
        if (!slotTime || !docSlots[slotIndex]?.length) {
            alert("Please select valid slots");
            return;
        }
        const selectedSlot = docSlots[slotIndex].find(slot => slot.time == slotTime);
        if (!selectedSlot) {
            alert("Selected time not found");
            return;
        }
        localStorage.setItem('appointmentInfo', JSON.stringify({
            docName: docInfo.name,
            dateTime: selectedSlot.dateTime,
            time: slotTime,
            fees: docInfo.fees,
            image: docInfo.profileImage,
            specialization: docInfo.specialization,
            success_rate: docInfo.success_rate
        }))
        navigate('/dashboard/doctors/my-appointments', {
            state: {
                docName: docInfo.name,
                dateTime: selectedSlot.dateTime,
                time: slotTime,
                fees: docInfo.fees,
                image: docInfo.profileImage,
                specialization: docInfo.specialization,
                success_rate: docInfo.success_rate
            }
        })
        // try{
        //     const response=await bookAppointmentAPI({
        //         docName:docInfo.name,
        //         dateTime: selectedSlot.dateTime,
        //         time:slotTime
        //     });
        //     setDocInfo(response);
        //     alert("appointment completed");
        //     navigate('/my-appointments');
        // } catch(error){
        //     console.log("error in frontend making the function call api");
        //     console.error("Booking failed:", error);
        //     alert(error.response?.data?.error || "Something went wrong");
        // }   

    }

    useEffect(() => {
        console.log(docSlots);
    }, [docSlots]);

    return (
        docInfo && (
            <div className="flex flex-col mx-[10%]">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col">
                        <img onClick={()=>setSelectedDoctors(docInfo)} className="bg-blue-600 w-full sm:max-w-72 rounded-lg" src={docInfo.profileImage} alt="Doctor" />
                        <div className="flex justify-center items-center gap-2 mr-5 mt-4 text-lg font-medium">
                            <MdChat className="text-blue-600 w-[40px] h-[50px]" />
                            <button onClick={()=>navigate('/dashboard/doctors/chat-with-doctor')} className="bg-blue-600 rounded-md p-2 text-white">Chat with Doctor</button>
                        </div>
                    </div>
                    <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-5 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0">
                        <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{docInfo.name}</p>
                        <div className="flex items-center gap-2 text-xl font-medium text-gray-700">
                            <p className="text-gray-600">{docInfo.specialization}</p>
                            <button className="border rounded-xl text-sm text-center">8 Years</button>
                        </div>
                        <div>
                            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">About</p>
                            <p className="text-sm text-gray-600 max-w-[700px] mt-1">{docInfo.name} is a highly respected specialist with extensive experience in the field.</p>
                        </div>
                        <p className="text-gray-600 font-medium mt-4">
                            Appointment Fee <span className="text-gray-800">₹{docInfo.fees}</span>
                        </p>
                    </div>
                </div>

                {/* Booking Slots */}
                <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                    <p>Booking Slots</p>
                    <div className="flex gap-4 items-center overflow-x-scroll mt-4">
                        {
                            docSlots.length > 0 && docSlots.map((item, index) => (
                                <div
                                    onClick={() => setSlotIndex(index)}
                                    key={index}
                                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-600'}`}
                                >
                                    <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                    <p>{item[0] && item[0].dateTime.getDate()}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex items-center w-full overflow-x-scroll mt-4 gap-2">
                        {
                            docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                                <p
                                    onClick={() => setSlotTime(item.time)}
                                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-gray-600 border border-gray-300'}`}
                                    key={index}
                                >
                                    {item.time.toLowerCase()}
                                </p>
                            ))
                        }
                    </div>
                    <div>
                        <button onClick={bookAppointment} className="bg-blue-600 text-white text-sm font-light px-14 py-3 rounded-full my-6">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Appointment;