import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { images } from "../../assets/asset";
import { ImCross, ImArrowLeft2 } from "react-icons/im";
import { toast } from "react-toastify";
import Spinner from "../spinner/spinner";
import Cookies from "js-cookie";

// import { ChatContext } from "../../context/chatContext";


const LoginForm = () => {
  // const {connectSocket} = useContext(ChatContext);
  const { role } = useParams();
  const [loading, setloading] = useState(false);
  // const {userId,setUserId}=useContext()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [currState, setCurrState] = useState("Login");
  const { login, setLogin,token,setToken,connectSocket,userId,setUserId} = useContext(StoreContext);
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);

  const url = "http://localhost:5000";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const crossbutton = () => {
    setLogin(false);
    navigate("/");
  };

  const goBack = () => {
    navigate("/login");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    //navigate('/dashboard');
    setloading(true);
    try {
      if (currState === "Login") {
      const response = await axios.post(
        `${url}/user/login`,
        { email: data.email, password: data.password, role: role },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Login success");
        
        Cookies.set("token", response.data.token, { expires: 1 });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setToken(response.data.token);
        // console.log("response after login in login form",response.data.user.id);
        setUserId(response.data.user.id);
        // connectSocket(response.data.user.id);
        // connectSocket(response.data);
        // Store role-specific identifiers
        switch(role) {
          case 'pharmacy':
            localStorage.setItem('pharmacyName', response.data.pharmacyName);
            console.log("pharmacyName", response.data.pharmacyName);
            break;
          case 'hospital':
            localStorage.setItem('hospitalName', response.data.hospitalName);
            break;
          case 'doctor':
            localStorage.setItem('doctorId', response.data.doctorId);
            break;
          case 'admin':
            localStorage.setItem('adminId', response.data.adminId);
            break;
        }

        // Set axios headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        // Configure redirect URLs
        const redirectConfig = {
          admin: `http://localhost:3002/admin/${response.data.adminId}/dashboard`,
          doctor: `http://localhost:3001/doctor/${response.data.doctorId}/dashboard`,
          pharmacy: `http://localhost:5174/pharmacy/${response.data.pharmacyName}/dashboard`,
          hospital: `http://localhost:5173/hospital/${response.data.hospitalName}/dashboard`,
          user: "/dashboard/home"
        };

        const targetUrl = redirectConfig[role];
        role === "user" ? navigate(targetUrl) : window.location.href = targetUrl;
      }
    } else if (currState === "Signup") {
        // Keep your existing signup logic exactly the same
        if (!isOtpSent) {
          const response = await axios.post(`${url}/user/send-otp`, {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            confirmPassword: data.confirmPassword,
          });

          if (response.data.success) {
            toast.success("OTP sent successfully");
            setIsOtpSent(true);
            navigate("/signup/verify-otp", {
              state: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                confirmPassword: data.confirmPassword,
              },
            });
          } else {
            toast.error(response.data.message);
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (login) document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [login]);

  if (!login) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="w-[900px] h-[600px] rounded-lg bg-white shadow-2xl flex overflow-hidden relative">
        <ImCross
          className="absolute top-4 right-4 cursor-pointer w-6 h-6 text-gray-500 hover:text-red-600 transition-colors"
          onClick={crossbutton}
        />

        <ImArrowLeft2
          className="absolute top-4 left-4 cursor-pointer w-6 h-6 text-gray-500 hover:text-blue-600 transition-colors"
          onClick={goBack}
        />

        <div className="w-2/3 hidden lg:block">
          <img
            src={images.login_img}
            alt="Login"
            className="w-full h-full object-fit"
          />
        </div>

        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            {currState === "Login" ? "Welcome Back!" : "Create an Account"}
          </h2>

          <div className="flex justify-between mb-6 gap-4">
            <button
              className={`w-1/2 py-2 ${
                currState === "Login"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } hover:bg-blue-700 transition-colors rounded-lg`}
              onClick={() => {
                setCurrState("Login");
                setIsOtpSent(false);
                setData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
                setOtp("");
              }}
            >
              Login
            </button>
            {role === "user" && (
              <button
                className={`w-1/2 py-2 ${
                  currState === "Signup"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } hover:bg-blue-700 transition-colors rounded-lg`}
                onClick={() => setCurrState("Signup")}
              >
                Signup
              </button>
            )}
          </div>

          <form className="flex flex-col gap-4" onSubmit={submitForm}>
            {currState === "Signup" && role === "user" && (
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleInputChange}
                  className="w-1/2 h-[50px] border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleInputChange}
                  className="w-1/2 h-[50px] border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
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
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleInputChange}
                className="w-full h-[50px] border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            )}
            {currState === "Signup" && role === "user" && isOtpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                className="w-full h-[50px] border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            )}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <Spinner />
              ) : currState === "Login" ? (
                "Login"
              ) : (
                "Signup"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
