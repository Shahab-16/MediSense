import React from 'react';
import { FaPills, FaCalendarAlt, FaTruck, FaMoneyBillWave, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../../context/StoreContext';

const OrderedMedicines = () => {

  const { BACKEND_URL,token } = useContext(StoreContext);
  console.log("Printing the backend url",BACKEND_URL);
  console.log("Printing the token",token);
  
  let userId = null;
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id;
    }
  } catch (err) {
    console.error("Error decoding token:", err);
  }

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchOrderedMedicines = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/user/medicine/get-all-ordered-medicines`,
        { patientId: userId }
      );
      setOrders(response.data.data);
    } catch (err) {
      console.log("Error in fetching ordered medicines", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrderedMedicines();
  }, [userId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' };
      case 'dispatched': return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Dispatched' };
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Processing' };
      case 'cancelled': return { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'paid': return { bg: 'bg-green-100', text: 'text-green-800', label: 'Paid' };
      case 'failed': return { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' };
      case 'refunded': return { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Refunded' };
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <FaPills className="mr-2 text-blue-600" /> My Medicine Orders
      </h2>
      
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const deliveryStatus = getStatusColor(order.deliveryStatus);
            const paymentStatus = getPaymentStatusColor(order.paymentStatus);
            
            return (
              <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-lg">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">Order ID:</span>
                    <span className="text-gray-600 text-sm">{order._id}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${deliveryStatus.bg} ${deliveryStatus.text} flex items-center`}>
                        <FaTruck className="mr-1" /> {deliveryStatus.label}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatus.bg} ${paymentStatus.text} flex items-center`}>
                        <FaMoneyBillWave className="mr-1" /> {paymentStatus.label}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start">
                      <FaCalendarAlt className="mt-1 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaMoneyBillWave className="mt-1 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaUser className="mt-1 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Recipient</p>
                        <p className="font-medium">{order.deliveryAddress.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mt-1 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Delivery Address</p>
                        <p className="font-medium">
                          {order.deliveryAddress.streetAddress}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.postalCode}, {order.deliveryAddress.country}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-3 flex items-center text-gray-700">
                    <FaPills className="mr-2 text-blue-500" /> Ordered Items
                  </h3>
                  
                  <div className="overflow-x-auto border border-gray-100 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.items.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.medicine?.name || 'Medicine not available'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              ₹{item.priceAtOrder.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {item.medicalStoreId?.name || 'Store not available'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaPills className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't placed any medicine orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default OrderedMedicines;