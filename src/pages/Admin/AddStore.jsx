import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  MapPin,
  UploadCloud,
  X,
  Store,
  Clock,
  ShieldCheck,
} from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout"; // Adjust path if needed
import Api from "../API/Api";

const AddStore = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    storeName: "",
    managerEmail: "",
    storePhone: "",
    storeEmail: "",
    address: "",
    city: "Bengaluru",
    pincode: "",
    storeStatus: "ACTIVE",
    storeSku: "",

    // openTime: "24/7",
    // capabilities: {
    //   cod: true,
    //   coldStorage: true,
    //   twentyFourSeven: false,
    // },
  });

  // Dummy Image State for UI demonstration
  const [images, setImages] = useState([]); // Preview URLs
  const [imageFiles, setImageFiles] = useState([]); // Actual files

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // if (type === "checkbox") {
    //   setFormData((prev) => ({
    //     ...prev,
    //     capabilities: { ...prev.capabilities, [name]: checked },
    //   }));
    // } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // }
  };

  // Dummy image upload handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
      setImageFiles((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    imageFiles.forEach((file) => {
      data.append("images", file);
    });

    // console.log("Submitting Store Data:", formData);
    // console.log("Images to upload:", images);
    console.log("Submitting Store Data:", data);

    try {
      const response = await Api.post("/stores/oudiac/add", data);

      console.log(response.data);
      alert("Store added successfully!");
      navigate("/admin/stores");
    } catch (error) {
      console.error(error);
      alert("Failed to save store.");
    }
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/stores")}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                Add New Store
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Set up a new dark store or fulfillment center.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/stores")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Store
            </button>
          </div>
        </div>

        {/* Main Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Primary Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Info Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-600" />
                Store Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Store Name
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    required
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="e.g., HSR Layout Sector 2 Hub"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Manager's Email
                    </label>
                    <input
                      type="email"
                      name="managerEmail"
                      required
                      value={formData.managerEmail}
                      onChange={handleChange}
                      placeholder="Manager's Email"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Store's Contact Number
                    </label>
                    <input
                      type="tel"
                      name="storePhone"
                      required
                      value={formData.storePhone}
                      onChange={handleChange}
                      placeholder="+91"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Store's Email
                  </label>
                  <input
                    type="email"
                    name="storeEmail"
                    required
                    value={formData.storeEmail}
                    onChange={handleChange}
                    placeholder="store.hsr@quickmart.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Location Details Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Location & Delivery Range
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Complete Address
                  </label>
                  <textarea
                    name="address"
                    rows="3"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter street address, building, landmark..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm resize-none"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 560102"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Store SKU
                    </label>
                    <input
                      type="text"
                      name="storeSku"
                      required
                      value={formData.storeSku}
                      onChange={handleChange}
                      placeholder="STR-KOR-01"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            {/* <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  Operating Hours
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="twentyFourSeven"
                    checked={formData.capabilities.twentyFourSeven}
                    onChange={handleChange}
                    className="text-emerald-600 focus:ring-emerald-500 rounded border-gray-300 w-4 h-4"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    Open 24/7
                  </span>
                </label>
              </div>

              {!formData.capabilities.twentyFourSeven && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      name="openTime"
                      value={formData.openTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      name="closeTime"
                      value={formData.closeTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                </div>
              )}
            </div> */}
          </div>

          {/* Right Column: Organization & Media */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Store Status
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-emerald-500 bg-emerald-50 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="storeStatus"
                    value="ACTIVE"
                    checked={formData.storeStatus === "ACTIVE"}
                    onChange={handleChange}
                    className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <div>
                    <span className="block font-bold text-emerald-900 text-sm">
                      Active & Open
                    </span>
                    <span className="block text-xs text-emerald-700 mt-0.5">
                      Store is visible and accepting orders.
                    </span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="storeStatus"
                    value="INACTIVE"
                    checked={formData.storeStatus === "INACTIVE"}
                    onChange={handleChange}
                    className="text-gray-600 focus:ring-gray-500 w-4 h-4"
                  />
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">
                      Inactive / Offline
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      Temporarily closed for orders.
                    </span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="storeStatus"
                    value="COMING_SOON"
                    checked={formData.storeStatus === "COMING_SOON"}
                    onChange={handleChange}
                    className="text-gray-600 focus:ring-gray-500 w-4 h-4"
                  />
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">
                      Coming Soon
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      Setup phase. Not visible to customers.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Store Capabilities Card */}
            {/* <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Capabilities
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="cod"
                    checked={formData.capabilities.cod}
                    onChange={handleChange}
                    className="text-emerald-600 focus:ring-emerald-500 rounded border-gray-300 w-4 h-4"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    Accepts Cash on Delivery
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="coldStorage"
                    checked={formData.capabilities.coldStorage}
                    onChange={handleChange}
                    className="text-emerald-600 focus:ring-emerald-500 rounded border-gray-300 w-4 h-4"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    Has Cold Storage (Ice Creams/Meat)
                  </span>
                </label>
              </div>
            </div> */}

            {/* Media Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Store Photo
              </h2>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-emerald-600 mb-1">
                  Upload storefront image
                </p>
                <p className="text-xs text-gray-500">JPG or PNG (max. 2MB)</p>
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group"
                    >
                      <img
                        src={img}
                        alt={`Preview ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-white/90 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddStore;
