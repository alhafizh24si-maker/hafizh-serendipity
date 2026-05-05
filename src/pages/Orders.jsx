import React, { useState } from 'react';
import PageHeader from "../components/PageHeader";


const ordersData = [
  { "orderId": "ORD-001", "customerName": "Budi Santoso", "status": "Completed", "totalPrice": 150000, "orderDate": "2024-03-01" },
  { "orderId": "ORD-002", "customerName": "Siti Aminah", "status": "Pending", "totalPrice": 85000, "orderDate": "2024-03-02" },
  { "orderId": "ORD-003", "customerName": "Andi Wijaya", "status": "Cancelled", "totalPrice": 210000, "orderDate": "2024-03-03" },
  { "orderId": "ORD-004", "customerName": "Rina Rose", "status": "Completed", "totalPrice": 320000, "orderDate": "2024-03-04" },
  { "orderId": "ORD-005", "customerName": "Dewi Lestari", "status": "Pending", "totalPrice": 125000, "orderDate": "2024-03-05" },
  { "orderId": "ORD-006", "customerName": "Ahmad Dhani", "status": "Completed", "totalPrice": 450000, "orderDate": "2024-03-06" },
  { "orderId": "ORD-007", "customerName": "Raisa Andriana", "status": "Completed", "totalPrice": 500000, "orderDate": "2024-03-07" },
  { "orderId": "ORD-008", "customerName": "Tulus", "status": "Cancelled", "totalPrice": 95000, "orderDate": "2024-03-08" },
  { "orderId": "ORD-009", "customerName": "Isyana Sarasvati", "status": "Pending", "totalPrice": 175000, "orderDate": "2024-03-09" },
  { "orderId": "ORD-010", "customerName": "Afgan", "status": "Completed", "totalPrice": 230000, "orderDate": "2024-03-10" },
  { "orderId": "ORD-011", "customerName": "Vidi Aldiano", "status": "Pending", "totalPrice": 110000, "orderDate": "2024-03-11" },
  { "orderId": "ORD-012", "customerName": "Lyodra Ginting", "status": "Completed", "totalPrice": 275000, "orderDate": "2024-03-12" },
  { "orderId": "ORD-013", "customerName": "Tiara Andini", "status": "Cancelled", "totalPrice": 65000, "orderDate": "2024-03-13" },
  { "orderId": "ORD-014", "customerName": "Ziva Magnolya", "status": "Completed", "totalPrice": 380000, "orderDate": "2024-03-14" },
  { "orderId": "ORD-015", "customerName": "Rizky Febian", "status": "Pending", "totalPrice": 140000, "orderDate": "2024-03-15" }
  // ... tambahkan data lainnya jika perlu
];

export default function Orders() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 pb-10">
      <PageHeader title="Service History" breadcrumb={["Home", "Management", "History"]}>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-indigo-500 transition"
        >
          + Add Service
        </button>
      </PageHeader>

      <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-5 font-bold text-gray-600">Order ID</th>
              <th className="p-5 font-bold text-gray-600">Customer</th>
              <th className="p-5 font-bold text-gray-600">Status</th>
              <th className="p-5 font-bold text-gray-600">Total Price</th>
              <th className="p-5 font-bold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.orderId} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="p-5 font-medium text-blue-600">{order.orderId}</td>
                <td className="p-5 text-gray-700">{order.customerName}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-5 font-bold text-gray-800">Rp {order.totalPrice.toLocaleString()}</td>
                <td className="p-5 text-gray-500">{order.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-black mb-6">New Service</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
               <input type="text" className="w-full p-3 rounded-xl border border-gray-200" placeholder="Order ID (e.g. ORD-031)" required />
               <input type="text" className="w-full p-3 rounded-xl border border-gray-200" placeholder="Customer Name" required />
               <select className="w-full p-3 rounded-xl border border-gray-200">
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
               </select>
               <input type="number" className="w-full p-3 rounded-xl border border-gray-200" placeholder="Total Price" required />
               <input type="date" className="w-full p-3 rounded-xl border border-gray-200" required />
               <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-gray-500 font-bold">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-indigo-500 text-white font-bold rounded-xl">Save</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}