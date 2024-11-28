import React, { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(Array(6).fill("")); // State to hold OTP values
    const inputRefs = useRef([]);

    // Handle OTP input
    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return; // Allow only digits
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus the next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle backspace to focus the previous input
    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle OTP submission
    const handleSubmit = () => {
        const otpValue = otp.join("");
        console.log("Entered OTP:", otpValue); // Replace with API call or verification logic
    };

    return (
        <div className="flex text-black p-10 rounded-md bg-white shadow-lg flex-col justify-center items-center max-w-[70%]">
            <h2 className="text-[2rem] font-bold mb-4">Verify email</h2>
            <p className="mb-6 text-sm text-gray-600 text-center">
                A verification code has been sent to your email. Enter the code below:
            </p>
            <div className="flex justify-center gap-2 mb-6">
                {[...Array(6)].map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
                        type="text"
                        name={`otp-${index}`}
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                        className="w-12 h-12 text-center text-xl bg-gray-50 font-semibold border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-800 text-white font-bold text-lg py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Verify and Register
            </button>

            <div className="flex justify-between w-full mt-6 text-base font-medium">
                <button
                    className="flex items-center gap-2 text-blue-800 hover:underline hover:text-blue-500 transition duration-300"
                    onClick={() => navigate("/login-and-signup")}
                >
                    <FaArrowLeft />
                    Back to Login
                </button>
                <button className="flex items-center gap-2 text-blue-800 hover:underline hover:text-blue-500 transition duration-300">
                    <FiRefreshCcw />
                    Resend Code
                </button>
            </div>
        </div>
    );
};

export default Otp;
