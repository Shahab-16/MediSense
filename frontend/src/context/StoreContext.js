import { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/asset";
import axios from "axios";
import { io } from "socket.io-client";
export const StoreContext = createContext();
const StoreContextProvider = ({ children }) => {
  const BACKEND_URL = "http://localhost:5000";
  const [socket, setSocket] = useState(null);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDoctors, setSelectedDoctors] = useState(null);
  const [message, setMessage] = useState([]);
  const [onlineUser, setOnlineUser] = useState(null);
  const [userId,setUserId]=useState("");
  const backendurl = "http://localhost:5000";

  const [stats, setStats] = useState({
    doctorsAvailable: 120,
    totalMedicines: 2500,
    totalModels: 10,
  });

  const [medicineCart, setMedicineCart] = useState([]);

  const [appointmentCart, setAppointmentCart] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("appointmentCart")) || [];
    setAppointmentCart(savedCart);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("appointmentCart", JSON.stringify(appointmentCart));
  }, [appointmentCart]);

  
  const addToAppointmentCart = (appointment) => {
    setAppointmentCart((prev) => {
      const exists = prev.some(
        (item) =>
          item.doctorId === appointment.doctorId &&
          item.dateTime === appointment.dateTime
      );

      if (!exists) {
        return [...prev, appointment];
      }
      return prev;
    });
  };

  const removeFromAppointmentCart = (doctorId) => {
    setAppointmentCart((prev) =>
      prev.filter((item) => item.doctorId !== doctorId)
    );
  };

  // const connectSocket = (id) => {
  //   console.log("user data", id);
  //   if (!id || socket?.connected) return;
  //   const newSocket = io(backendurl, {
  //     query: {
  //       userId: id,
  //     },
  //   });
  //   newSocket.connect();
  //   setSocket(newSocket);

  //   io.on("getOnlineUser", (userIds) => {
  //     setOnlineUser(userIds);
  //   });
  // };
  const addToMedicineCart = async (itemId, userId) => {
    if (!medicineCart[itemId]) {
      setMedicineCart((prev) => ({ ...prev, [itemId]: 1 }));
    } else if (medicineCart[itemId] >= 1) {
      setMedicineCart((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    console.log(
      "Printing the userId in storeContext in addMedicineToCart",
      userId
    );
    if (token) {
      await axios.post(
        `${BACKEND_URL}/user/medicine/add-to-cart`,
        { medicineId: itemId, userId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const removeFromMedicineCart = async (itemId, userId) => {
    console.log(
      "Printing the userId and itemId in storeContext in removeFromMedicineCart",
      userId,
      " ",
      itemId
    );
    if (medicineCart[itemId] >= 1) {
      setMedicineCart((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
    if (token) {
      await axios.post(
        `${BACKEND_URL}/user/medicine/remove-from-cart`,
        { medicineId: itemId, userId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const getMessage = async (userId) => {
    try {
      const { data } = await axios.get(`${backendurl}/message/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Include credentials (cookies) if needed
      });
      if (data.success) {
        console.log("all messagees in frontend", data.data);
        setMessage(data.data);
      }
    } catch (error) {
      console.log("erron in getting message in frontend", error.message);
    }
  };

  const sendMessage = async (messageData) => {
    try {
      console.log("token after logging in in sendMessage", token);
      const { data } = await axios.post(
        `${backendurl}/message/send/${selectedDoctors._id}`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        setMessage((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        console.log("error ni sendMessage", data.message);
      }
    } catch (error) {
      console.log("erron in sending message ", error.message);
    }
  };

  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedDoctors) {
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      }
    });
  };

  const contextValue = {
    doctors,
    stats,
    setStats,
    login,
    setLogin,
    loading,
    setLoading,
    addToMedicineCart,
    removeFromMedicineCart,
    medicineCart,
    token,
    setToken,
    // selectedDoctors,
    setSelectedDoctors,
    BACKEND_URL,
    getMessage,
    sendMessage,
    // connectSocket,
    setMessage,
    appointmentCart,
    setAppointmentCart,
    addToAppointmentCart,
    removeFromAppointmentCart,
    userId,
    setUserId,
  };
  // const unsubscribeFromMessages = () => {
  //   if (socket) socket.off("newMessage");
  // };
  // useEffect(() => {
  //   subscribeToMessages();
  //   return () => unsubscribeFromMessages();
  // }, [socket, selectedDoctors]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
