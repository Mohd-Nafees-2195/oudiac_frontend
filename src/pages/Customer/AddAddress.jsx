import React, { useState } from "react";
import Layout from "../../components/Customer/ui/Layout";
import toast from "react-hot-toast";
import { CustomerApi } from "../API/Api";
import { Save } from "lucide-react";
// Import your API configuration (adjust path as needed)
// import CustomerApi from "../api/CustomerApi"; 

const AddAddress = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    shippingAddress: "",
    city: "",
    pinCode: "",
    country: "IND",
    state: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call
       const response = await CustomerApi.post("/users/oudiac/add-address", formData, { withCredentials: true });

      // Simulating network delay for visual effect
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form Data Submitted:", formData);
      toast.success("Address saved successfully!");
      // navigate("/checkout"); 
    } catch (err) {
      setError("Failed to save address. Please try again.");
      toast.error(err.response.data)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 ml-20">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Delivery Address</h1>
          <p className="text-sm text-gray-500 mt-1">
            Where should we send your Oudiac order?
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl ml-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              placeholder="Oudi ac"
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="mobileNumber"
              value={formData.phoneNumber}
              placeholder="+91 98765 43210"
              required
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm uppercase"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Shipping Address
            </label>
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              rows="3"
              required
              value={formData.shippingAddress}
              onChange={handleChange}
              placeholder="House No, Building, Street Area"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <div className="mt-1">
              <input
                id="state"
                name="state"
                type="text"
                required
                value={formData.state}
                onChange={handleChange}
                placeholder="UP"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-colors duration-200"
              />
            </div>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City/District
            </label>
            <div className="mt-1">
              <input
                id="city"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Bengaluru"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <div className="mt-1">
              <input
                id="pinCode"
                name="pinCode"
                type="text"
                required
                value={formData.pinCode}
                onChange={handleChange}
                placeholder="560001"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

      </div>


    </Layout>
  );
};

export default AddAddress;