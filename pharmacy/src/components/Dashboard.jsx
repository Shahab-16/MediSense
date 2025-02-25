import React from "react";
import {
  FaPills,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaBoxOpen,
  FaCalendarAlt,
} from "react-icons/fa";

const Dashboard = () => {
  // Sample data
  const pharmacyStats = {
    totalMedicines: 1250,
    lowStockMedicines: 45,
    totalSalesToday: 120,
    totalRevenueToday: 4500,
    pendingOrders: 12,
    totalCustomers: 850,
  };

  const recentOrders = [
    { id: 1, customer: "John Doe", amount: 120, status: "Delivered" },
    { id: 2, customer: "Jane Smith", amount: 85, status: "Pending" },
    { id: 3, customer: "Alice Johnson", amount: 200, status: "Delivered" },
  ];

  const lowStockMedicines = [
    { id: 1, name: "Paracetamol", stock: 5 },
    { id: 2, name: "Amoxicillin", stock: 3 },
    { id: 3, name: "Ibuprofen", stock: 8 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Pharmacy Dashboard</h1>
          <p className="text-gray-600">Welcome to your pharmacy management system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaPills className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Total Medicines</p>
              <p className="text-2xl font-bold text-blue-800">
                {pharmacyStats.totalMedicines}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <FaBoxOpen className="text-red-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Low Stock Medicines</p>
              <p className="text-2xl font-bold text-red-600">
                {pharmacyStats.lowStockMedicines}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaShoppingCart className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Total Sales Today</p>
              <p className="text-2xl font-bold text-green-600">
                {pharmacyStats.totalSalesToday}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FaChartLine className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Total Revenue Today</p>
              <p className="text-2xl font-bold text-purple-600">
                ${pharmacyStats.totalRevenueToday}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
                  <th className="px-4 py-2 text-left text-gray-600">Customer</th>
                  <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                  <th className="px-4 py-2 text-left text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-3 text-gray-700">#{order.id}</td>
                    <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                    <td className="px-4 py-3 text-gray-700">${order.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Medicines */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Low Stock Medicines</h2>
          <div className="space-y-4">
            {lowStockMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-gray-700 font-medium">{medicine.name}</p>
                  <p className="text-sm text-gray-500">Stock: {medicine.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;