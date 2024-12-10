import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { images } from '../../assets/asset';
import { ImCross } from "react-icons/im";

const LoginForm = () => {
    const { role } = useParams();
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [currState, setCurrState] = useState("Login");
    const { login, setLogin } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const crossbutton = () => {
        setLogin(false);
        navigate('/');
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (currState === "Login") {
            navigate(role === 'admin' ? "/dashboard/admin" : "/dashboard/home");
            setLogin(false);
        } else if (currState === "Signup") {
            navigate("/otp");
        }
    };

    useEffect(() => {
        if (login) document.body.classList.add("overflow-hidden");
        return () => document.body.classList.remove("overflow-hidden");
    }, [login]);

    if (!login) return null;

    return (
        <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-[900px] h-[600px] rounded-lg bg-white shadow-2xl flex overflow-hidden relative">
                <ImCross 
                    className="absolute top-4 right-4 cursor-pointer w-6 h-6 text-gray-500 hover:text-red-600 transition-colors" 
                    onClick={crossbutton}
                />
                
                <div className="w-2/3 hidden lg:block">
                    <img src={images.login_img} alt="Login" className="w-full h-full object-fit" />
                </div>

                <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                        {currState === "Login" ? "Welcome Back!" : "Create an Account"}
                    </h2>
                    
                    <div className="flex justify-between mb-6 gap-4">
                        <button
                            className={`w-1/2 py-2 ${currState === "Login" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"} hover:bg-blue-700 transition-colors rounded-lg`}
                            onClick={() => setCurrState("Login")}
                        >
                            Login
                        </button>
                        {role === "user" && (
                            <button
                                className={`w-1/2 py-2 ${currState === "Signup" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"} hover:bg-blue-700 transition-colors rounded-lg`}
                                onClick={() => setCurrState("Signup")}
                            >
                                Signup
                            </button>
                        )}
                    </div>
                    
                    <form className="flex flex-col gap-4" onSubmit={submitForm}>
                        {currState === "Signup" && role === "user" && (
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                value={data.name}
                                onChange={handleInputChange}
                                className="w-full h-[50px] border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                            className="w-full h-[50px] border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={handleInputChange}
                            className="w-full h-[50px] border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {currState === "Signup" && role === "user" && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full h-[50px] border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        )}
                        <button
                            type="submit"
                            className="w-full h-[50px] mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            {currState}
                        </button>
                    </form>
                    
                    <div className="flex items-center mt-4">
                        <input type="checkbox" className="w-[15px] h-[20px] mr-2" />
                        <p className="text-sm text-gray-600">
                            By continuing, I agree to the <span className="text-blue-600 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>.
                        </p>
                    </div>
                    <p className="text-sm mt-3 text-blue-600 underline cursor-pointer text-center">Forgot Password?</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
