// Login.js
import { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { images } from '../../assets/asset';
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [currState, setCurrState] = useState("Login");
    const { login, setLogin } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (currState === "Login") {
            setLogin(false);
            navigate("/dashboard/home");
        }
    };

    useEffect(() => {
        if (login) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [login]);

    if (!login) return null;

    return (
        <div className="bg-[#000000c0] fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-[900px] h-[550px] rounded-lg bg-white flex overflow-hidden shadow-lg relative">
                <ImCross className="absolute top-4 right-4 cursor-pointer w-5 h-5" onClick={() => setLogin(false)} />
                <div className="w-2/3 hidden lg:block">
                    <img src={images.register} alt="Login" className="w-full h-full object-cover" />
                </div>
                <div className="w-full lg:w-1/2 p-8 flex flex-col">
                    <div className="flex justify-between mb-6 gap-2 mt-4">
                        <button className={`w-full py-2 text-center ${currState === "Login" ? "bg-gray-300" : "bg-gray-100"} hover:bg-gray-300 font-semibold rounded-md`} onClick={() => setCurrState("Login")}>Login</button>
                        <button className={`w-full py-2 text-center ${currState === "Signup" ? "bg-gray-300" : "bg-gray-100"} hover:bg-gray-300 font-semibold rounded-md`} onClick={() => setCurrState("Signup")}>Signup</button>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={submitForm}>
                        {currState === "Signup" && (
                            <input type="text" placeholder="Your Name" name="name" value={data.name} onChange={handleInputChange} className="w-full h-[50px] border border-black rounded-lg p-4" />
                        )}
                        <input type="email" placeholder="Email" name="email" value={data.email} onChange={handleInputChange} className="w-full h-[50px] border border-black rounded-lg p-4" />
                        <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleInputChange} className="w-full h-[50px] border border-black rounded-lg p-4" />
                        {currState === "Signup" && (
                            <input type="password" placeholder="Confirm Password" className="w-full h-[50px] border border-black rounded-lg p-4" />
                        )}
                        <button type="submit" className="w-full h-[50px] border border-black rounded-lg p-4 mt-4 flex justify-center items-center bg-blue-800 hover:bg-blue-600 text-white font-semibold">{currState}</button>
                    </form>
                    <div className="flex items-center mt-4">
                        <input type="checkbox" className="w-[15px] h-[20px]" />
                        <p className="ml-2 text-xs">By continuing, I agree to the Terms of Service and Privacy Policy.</p>
                    </div>
                    <p className="text-xs mt-3 underline cursor-pointer">Forgot Password?</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
