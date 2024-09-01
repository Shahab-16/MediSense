import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import { images } from '../assets/asset';
import { ImCross } from "react-icons/im";

const Login = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [currState, setCurrState] = useState("Login");
    const { login, setlogin } = useContext(StoreContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    useEffect(() => {
        if (login) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        
        // Cleanup when the component is unmounted
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [login]);

    return (
        <div className="bg-[#000000c0] absolute w-full h-full flex justify-center items-center min-h-screen">
            <div className="w-[900px] h-[550px] rounded-lg bg-white flex overflow-hidden shadow-lg relative">
                {/* Cross Icon */}
                <ImCross
                    className="absolute top-4 right-4 cursor-pointer w-5 h-5"
                    onClick={() => setlogin(false)}
                />

                {/* Left Section with Image */}
                <div className="w-2/3">
                    <img 
                        src={images.register} 
                        alt="Login" 
                        className="w-full h-full object-fill" 
                    />
                </div>

                {/* Right Section with Form */}
                <div className="w-1/2 p-8 flex flex-col">
                    {/* Toggle Buttons */}
                    <div className="flex justify-between mb-6 gap-2 mt-4">
                        <button 
                            className={`w-full py-2 text-center ${currState === "Login" ? "bg-gray-300" : "bg-gray-100"} hover:bg-gray-300 font-semibold rounded-md`}
                            onClick={() => setCurrState("Login")}
                        >
                            Login
                        </button>
                        <button 
                            className={`w-full py-2 text-center ${currState === "Signup" ? "bg-gray-300" : "bg-gray-100"} hover:bg-gray-300 font-semibold rounded-md`}
                            onClick={() => setCurrState("Signup")}
                        >
                            Signup
                        </button>
                    </div>

                    <form className="flex flex-col gap-4">
                        {currState === "Signup" && (
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                value={data.name}
                                onChange={handleInputChange}
                                className="w-full h-[50px] border border-black rounded-lg p-4"
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                            className="w-full h-[50px] border border-black rounded-lg p-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={handleInputChange}
                            className="w-full h-[50px] border border-black rounded-lg p-4"
                        />
                        {currState === "Signup" && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full h-[50px] border border-black rounded-lg p-4"
                            />
                        )}
                        <button
                            type="submit"
                            className="w-full h-[50px] border border-black rounded-lg p-4 mt-4 flex justify-center items-center bg-blue-800 hover:bg-blue-600 text-white font-semibold"
                        >
                            {currState}
                        </button>
                    </form>

                    <div className="flex items-center mt-4">
                        <input type="checkbox" className="w-[15px] h-[20px]" />
                        <p className="ml-2 text-xs">
                            By continuing, I agree to the Terms of Service and Privacy Policy.
                        </p>
                    </div>

                    {currState === "Login" ? (
                        <p className="mt-4 text-sm">
                            Don't have an account?{" "}
                            <span
                                className="text-blue-800 cursor-pointer font-semibold"
                                onClick={() => setCurrState("Signup")}
                            >
                                Sign Up
                            </span>
                        </p>
                    ) : (
                        <p className="mt-4 text-sm">
                            Already have an account?{" "}
                            <span
                                className="text-blue-800 cursor-pointer font-semibold"
                                onClick={() => setCurrState("Login")}
                            >
                                Login
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
