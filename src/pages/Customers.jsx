import React, { useState } from 'react';
import PageHeader from "../components/PageHeader";

const customersData = [
  
  { "customerId": "CUS-001", "customerName": "Budi Santoso", "email": "budi.s@gmail.com", "phone": "081234567890", "loyalty": "Gold" },
  { "customerId": "CUS-002", "customerName": "Siti Aminah", "email": "siti.a@yahoo.com", "phone": "081234567891", "loyalty": "Silver" },
  { "customerId": "CUS-003", "customerName": "Andi Wijaya", "email": "andi.w@outlook.com", "phone": "081234567892", "loyalty": "Bronze" },
  { "customerId": "CUS-004", "customerName": "Rina Rose", "email": "rina.r@gmail.com", "phone": "081234567893", "loyalty": "Gold" },
  { "customerId": "CUS-005", "customerName": "Dewi Lestari", "email": "dewi.l@gmail.com", "phone": "081234567894", "loyalty": "Silver" },
  { "customerId": "CUS-006", "customerName": "Ahmad Dhani", "email": "dhani.a@dewa19.com", "phone": "081234567895", "loyalty": "Gold" },
  { "customerId": "CUS-007", "customerName": "Raisa Andriana", "email": "raisa@gmail.com", "phone": "081234567896", "loyalty": "Gold" },
  { "customerId": "CUS-008", "customerName": "Tulus", "email": "tulus@musik.com", "phone": "081234567897", "loyalty": "Silver" },
  { "customerId": "CUS-009", "customerName": "Isyana Sarasvati", "email": "isyana@gmail.com", "phone": "081234567898", "loyalty": "Gold" },
  { "customerId": "CUS-010", "customerName": "Afgan", "email": "afgan@gmail.com", "phone": "081234567899", "loyalty": "Silver" },
  { "customerId": "CUS-011", "customerName": "Vidi Aldiano", "email": "vidi@gmail.com", "phone": "081234567800", "loyalty": "Bronze" },
  { "customerId": "CUS-012", "customerName": "Lyodra Ginting", "email": "lyodra@gmail.com", "phone": "081234567801", "loyalty": "Gold" },
  { "customerId": "CUS-013", "customerName": "Tiara Andini", "email": "tiara@gmail.com", "phone": "081234567802", "loyalty": "Silver" },
  { "customerId": "CUS-014", "customerName": "Ziva Magnolya", "email": "ziva@gmail.com", "phone": "081234567803", "loyalty": "Bronze" },
  { "customerId": "CUS-015", "customerName": "Rizky Febian", "email": "rizky@gmail.com", "phone": "081234567804", "loyalty": "Gold" },
  { "customerId": "CUS-016", "customerName": "Mahalini Raharja", "email": "mahalini@gmail.com", "phone": "081234567805", "loyalty": "Silver" },
  { "customerId": "CUS-017", "customerName": "Nadin Amizah", "email": "nadin@gmail.com", "phone": "081234567806", "loyalty": "Bronze" },
  { "customerId": "CUS-018", "customerName": "Pamungkas", "email": "pam@gmail.com", "phone": "081234567807", "loyalty": "Gold" },
  { "customerId": "CUS-019", "customerName": "Hindia", "email": "hindia@gmail.com", "phone": "081234567808", "loyalty": "Silver" },
  { "customerId": "CUS-020", "customerName": "Sal Priadi", "email": "sal@gmail.com", "phone": "081234567809", "loyalty": "Bronze" },
  { "customerId": "CUS-021", "customerName": "Kunto Aji", "email": "kunto@gmail.com", "phone": "081234567810", "loyalty": "Gold" },
  { "customerId": "CUS-022", "customerName": "Yura Yunita", "email": "yura@gmail.com", "phone": "081234567811", "loyalty": "Silver" },
  { "customerId": "CUS-023", "customerName": "Glenn Fredly", "email": "glenn@gmail.com", "phone": "081234567812", "loyalty": "Gold" },
  { "customerId": "CUS-024", "customerName": "Marion Jola", "email": "lala@gmail.com", "phone": "081234567813", "loyalty": "Silver" },
  { "customerId": "CUS-025", "customerName": "Ardhito Pramono", "email": "ardhito@gmail.com", "phone": "081234567814", "loyalty": "Bronze" },
  { "customerId": "CUS-026", "customerName": "Danilla Riyadi", "email": "danilla@gmail.com", "phone": "081234567815", "loyalty": "Gold" },
  { "customerId": "CUS-027", "customerName": "Fiersa Besari", "email": "fiersa@gmail.com", "phone": "081234567816", "loyalty": "Silver" },
  { "customerId": "CUS-028", "customerName": "Jason Ranti", "email": "jejeng@gmail.com", "phone": "081234567817", "loyalty": "Bronze" },
  { "customerId": "CUS-029", "customerName": "Iwan Fals", "email": "iwan@gmail.com", "phone": "081234567818", "loyalty": "Gold" },
  { "customerId": "CUS-030", "customerName": "Ebiet G. Ade", "email": "ebiet@gmail.com", "phone": "081234567819", "loyalty": "Silver" }
];

export default function Customers() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 pb-10">
      <PageHeader title="Customers" breadcrumb={["Home", "User List"]}>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition"
        >
          + Add Customer
        </button>
      </PageHeader>

      <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-5 font-bold text-gray-600">Customer ID</th>
              <th className="p-5 font-bold text-gray-600">Name</th>
              <th className="p-5 font-bold text-gray-600">Email</th>
              <th className="p-5 font-bold text-gray-600">Phone</th>
              <th className="p-5 font-bold text-gray-600">Loyalty</th>
            </tr>
          </thead>
          <tbody>
            {customersData.map((cust) => (
              <tr key={cust.customerId} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="p-5 text-gray-500 font-mono">{cust.customerId}</td>
                <td className="p-5 font-bold text-gray-800">{cust.customerName}</td>
                <td className="p-5 text-gray-600">{cust.email}</td>
                <td className="p-5 text-gray-600">{cust.phone}</td>
                <td className="p-5 text-blue-600 font-bold italic">{cust.loyalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-black mb-6">New Customer</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
               <input type="text" className="w-full p-3 rounded-xl border border-gray-200" placeholder="Customer ID" required />
               <input type="text" className="w-full p-3 rounded-xl border border-gray-200" placeholder="Full Name" required />
               <input type="email" className="w-full p-3 rounded-xl border border-gray-200" placeholder="Email Address" required />
               <input type="text" className="w-full p-3 rounded-xl border border-gray-200" placeholder="Phone Number" required />
               <select className="w-full p-3 rounded-xl border border-gray-200">
                  <option>Bronze</option>
                  <option>Silver</option>
                  <option>Gold</option>
               </select>
               <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-gray-500 font-bold">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl">Save</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}