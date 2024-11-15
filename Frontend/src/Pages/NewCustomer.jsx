import React, { useState } from 'react';
import logo from "../assets/logos.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    contact: '',
    model: '',
    problem: '',
    description: '',
    serviceFee: '',
    itemCost: '',
    itemProfit: '',
    technician: '',
    time: '',
  });

  const companyPhoneNumber = "061XXXXXXX"; // Example phone number

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/new-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        toast.success("Customer added successfully!");
        setCustomerData({
          name: '',
          contact: '',
          model: '',
          problem: '',
          description: '',
          serviceFee: '',
          itemCost: '',
          itemProfit: '',
          technician: '',
          time: '',
        });
      } else {
        toast.error("Failed to add customer. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting customer data:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Company Logo" className="h-12 w-auto mb-2" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Contact", name: "contact", type: "text" },
            { label: "Model", name: "model", type: "text" },
            { label: "Service Fee", name: "serviceFee", type: "number" },
            { label: "Item Cost", name: "itemCost", type: "number" },
            { label: "Item Profit", name: "itemProfit", type: "number" },
            { label: "Time", name: "time", type: "text" },
            { label: "Problem", name: "problem", type: "text" },
            { label: "Technician", name: "technician", type: "text" },
          ].map((field, index) => (
            <div key={index} className="flex items-center">
              <label className="w-1/3 text-xs font-medium text-gray-700 mr-2">{field.label}:</label>
              <input
                type={field.type}
                name={field.name}
                value={customerData[field.name]}
                onChange={handleChange}
                className="flex-1 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A51B2B] focus:border-transparent text-xs"
                required
              />
            </div>
          ))}

          <div className="flex items-center">
            <label className="w-1/3 text-xs font-medium text-gray-700 mr-2">Description:</label>
            <textarea
              name="description"
              value={customerData.description}
              onChange={handleChange}
              className="flex-1 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A51B2B] focus:border-transparent text-xs"
              rows="2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#A51B2B] text-white px-3 py-1 rounded hover:bg-[#911D2D] transition-colors text-sm"
          >
            Submit
          </button>
          <p className="text-sm font-medium text-gray-600 text-center">Phone: {companyPhoneNumber}</p>
        </form>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default NewCustomer;
