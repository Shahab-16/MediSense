import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../services/axios';

export default function InsideHospital() {
    const navigate = useNavigate();
    const [doctorsInsideHospital, setDoctorsInsideHospital] = useState([]);
    const { hospitalName, speciality } = useParams();
    const [filterDoc, setFilter] = useState([]);
    const [hosInfo, setHos] = useState(null);

    useEffect(() => {
        const fetchDoctorsFromHospital = async () => {
            try {
                const res = await axiosInstance.get(`/hospital/${hospitalName}/list-all-doctors`);
                console.log("Fetched Doctors inside hospital:", res.data.doctors);
                setDoctorsInsideHospital(res.data.doctors);
            } catch (error) {
                console.log("Error fetching from frontend", error);
            }
        };
        fetchDoctorsFromHospital();
    }, [hospitalName]);

    const findDoctor = () => {
        if (speciality) {
            setFilter(doctorsInsideHospital.filter(doc => doc.specialization === speciality));
        } else {
            setFilter(doctorsInsideHospital);
        }
    };

    useEffect(() => {
        findDoctor();
    }, [doctorsInsideHospital, hospitalName, speciality]);

    return (
        <div className='container mx-auto px-8 py-8 flex'>
            {/* Sidebar for Specialities */}
            <div className='flex flex-col'>
                <div className='flex flex-col text-gray-700 gap-4'>
                    <p onClick={() => navigate(`/dashboard/doctors/hospital/${hospitalName}`)} className={`border w-[175px] p-2 cursor-pointer ${!speciality ? "bg-indigo-50" : ""}`}>All</p>
                    <p onClick={() => navigate(`/dashboard/doctors/hospital/${hospitalName}/General physician`)} className={`border w-[175px] p-2 cursor-pointer ${speciality === "General physician" ? "bg-indigo-50" : ""}`}>General Physician</p>
                    <p onClick={() => navigate(`/dashboard/doctors/hospital/${hospitalName}/Gynecologist`)} className={`border w-[175px] p-2 cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-50" : ""}`}>Gynecologist</p>
                    <p onClick={() => navigate(`/dashboard/doctors/hospital/${hospitalName}/Dermatologist`)} className={`border w-[175px] p-2 cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-50" : ""}`}>Dermatologist</p>
                    <p onClick={() => navigate(`/dashboard/doctors/hospital/${hospitalName}/Pediatricians`)} className={`border w-[175px] p-2 cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-50" : ""}`}>Pediatricians</p>
                    <p onClick={() => navigate(`/dashboard/doctors/hospital/${hospitalName}/Neurologist`)} className={`border w-[175px] p-2 cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-50" : ""}`}>Neurologist</p>
                </div>
            </div>

            {/* Doctor Cards */}
            <div className='w-full grid grid-cols-4 gap-6 ml-8'>
                {filterDoc.map((item, index) => (
                    <div
                        key={index}
                        className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 flex flex-col h-[350px]'
                        onClick={() => navigate(`/dashboard/doctors/appointment/${item._id}`)}
                    >
                        {/* Image */}
                        <div className='h-[180px] overflow-hidden'>
                            <img
                                className='w-full h-full object-cover transition-transform duration-500 hover:scale-110'
                                src={item.profileImage}
                                alt={item.name}
                            />
                        </div>

                        {/* Doctor Info */}
                        <div className='p-4 flex flex-col justify-between flex-grow'>
                            <div className='flex items-center gap-2 text-sm'>
                                <span className='bg-green-600 rounded-full w-2 h-2'></span>
                                <span className='text-green-600'>Available</span>
                            </div>

                            <div>
                                <p className='text-[#262626] text-lg font-semibold mt-2'>{item.name}</p>
                                <p className='text-[#555] text-sm'>{item.specialization}</p>
                                <p className='text-[#555] text-sm'>{hosInfo?.name}</p>
                                <p className='text-green-600 text-sm mt-1'>⭐ {hosInfo?.rating || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
