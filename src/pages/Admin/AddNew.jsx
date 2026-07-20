import React, { useState } from "react";
import {
  Store,
  User,
  CreditCard,
  Bell,
  Shield,
  Save,
  MapPin,
  Globe,
  Mail,
  Phone,
  Lock,
  PlusCircle,
} from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Api } from "../API/Api";
import ErrorMessage from "../../components/Message/ErrorMessage";

const AddNew = () => {
  const [activeTab, setActiveTab] = useState("category");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    name: "Women",
    code: "WMEN",
  });
  const [brand, setBrand] = useState({
    name: "Shanaya",
    code:"SNYA",
  });
  const [productType, setProductType] = useState({
    name: "Attar",
    code:"ATR",
  });
  const [errors, setErrors] = useState("");

  // Dummy State for Form Toggles
  const [toggles, setToggles] = useState({
    orderAlerts: true,
    stockAlerts: true,
    promoEmails: false,
    codEnabled: true,
    taxIncluded: false,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    {
      id: "category",
      name: "Category",
      icon: PlusCircle,
      desc: "Add new Category",
    },
    {
      id: "brand",
      name: "Brand",
      icon: PlusCircle,
      desc: "Add new Brand",
    },
    {
      id: "product-type",
      name: "Product Type",
      icon: PlusCircle,
      desc: "Add new product type e.g. Attar, Dakhoon...",
    },
  ];

  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();

    if (activeTab === 'category') {
      console.log("Saving category with data:", category);
      saveData("/category/oudiac/add", category, "Category saved successfully!", "Failed to save category.");

    } else if (activeTab === 'brand') {
      // FIX: Pass the 'brand' state and the brand endpoint URL
      console.log("Saving brand with data:", brand);
      saveData("/brand/oudiac/add", brand, "Brand saved successfully!", "Failed to save brand.");

    } else if (activeTab === 'product-type') {
      // FIX: Pass the 'productType' state and the product type endpoint URL
      console.log("Saving product type with data:", productType);
      saveData("/product-type/oudiac/add", productType, "Product Type saved successfully!", "Failed to save product type.");
    }
  };

  // FIX: Renamed to saveData and added an errorMessage parameter
  const saveData = async (url, data, successMessage, errorMessage) => {

    try {
      const response = await Api.post(url, data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response.data);
      toast(successMessage);
    } catch (error) {
      if (error.response) {
      // This is where your custom Spring Boot message lives!
      const backendData = error.response.data;
      const status = error.response.status;

      console.log("Backend Status Code:", status);
      console.log("Backend Error Data:", backendData);

      // Depending on how Spring Boot is configured, your message might be directly 
      // in 'data', or nested inside a 'message' field like data.message.
      setErrors(backendData);
      const errorMessage = backendData.message || backendData || "Something went wrong";
      toast.error(errorMessage); // Shows: "Manager not exist!!Please enter correct email"

    } else if (error.request) {
      // The request was made but no response was received (e.g., server is down)
      console.error("No response from server:", error.request);
      toast.error("Server is unreachable. Please try again later.");
    } else {
      // Something happened in setting up the request
      toast.error(errorMessage);
    }
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();

    if (activeTab === 'category') {
      console.log("Saving category with data:", category);
      removeData("/category/oudiac/remove/" + category.name, "Category Removed successfully!", "Failed to Remove category.");

    } else if (activeTab === 'brand') {
      // FIX: Pass the 'brand' state and the brand endpoint URL
      console.log("Saving brand with data:", brand);
      removeData("/brand/oudiac/remove/" + brand.name, "Brand Removed successfully!", "Failed to Remove brand.");

    } else if (activeTab === 'product-type') {
      // FIX: Pass the 'productType' state and the product type endpoint URL
      console.log("Saving product type with data:", productType);
      removeData("/product-type/oudiac/remove/" + productType.name, "Product Type Removed successfully!", "Failed to Remove product type.");
    }
  };

  const removeData = async (url, successMessage, errorMessage) => {

    try {
      const response = await Api.delete(url, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      // console.log(response.data);
      toast(successMessage);
    } catch (error) {
      console.error(error);
      // FIX: Use the dynamic error message
      toast(errorMessage);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your application preferences and configurations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-red-600/60 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-red-500 transition-colors">
            Remove
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar Navigation */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 flex flex-col gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-start gap-3 w-full p-3 rounded-xl transition-all text-left ${isActive
                      ? "bg-emerald-50 border-emerald-100/50 shadow-sm"
                      : "hover:bg-gray-50 border-transparent"
                    } border`}
                >
                  <div
                    className={`p-2 rounded-lg ${isActive ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500"}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={`text-sm font-bold ${isActive ? "text-emerald-800" : "text-gray-700"}`}
                    >
                      {tab.name}
                    </h3>
                    <p
                      className={`text-xs mt-0.5 ${isActive ? "text-emerald-600/80" : "text-gray-500"}`}
                    >
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {activeTab === "category" && (
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Add New Category
                </h2>

                <div className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category Name
                      </label>
                      <input
                        type="text"
                        placeholder={category.name}
                        onChange={(e) => {
                          setCategory({
                            ...category,           // 1. Copy any existing properties
                            name: e.target.value   // 2. Update the 'name' property ,MEN, WOMEN, ALL ...
                          });
                        }}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category SKU
                      </label>
                      <input
                        type="text"
                        placeholder={category.code}
                        required
                        onChange={(e) => {
                          setCategory({
                            ...category,           // 1. Copy any existing properties
                            code: e.target.value   // 2. Update the 'name' property ,MEN, WOMEN, ALL ...
                          });
                        }}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm uppercase"
                      />
                    </div>
                  </div>

                </div>
              </div>
            )}
            {activeTab === "brand" && (
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Add New Brand
                </h2>

                <div className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder={brand.name}
                        onChange={(e) => {
                          setBrand({
                            ...brand,           // 1. Copy any existing properties
                            name: e.target.value   // 2. Update the 'name' property  Brand - SHANAYA ,etc ...
                          });
                        }}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Brand SKU
                      </label>
                      <input
                        type="text"
                        placeholder={brand.code}
                        required
                        onChange={(e) => {
                          setBrand({
                            ...brand,           // 1. Copy any existing properties
                            code: e.target.value   // 2. Update the 'name' property ,MEN, WOMEN, ALL ...
                          });
                        }}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm uppercase"
                      />
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeTab === "product-type" && (
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Add New Product Type
                </h2>

                <div className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Product Type Name
                      </label>
                      <input
                        type="text"
                        placeholder={productType.name}
                        onChange={(e) => {
                          setProductType({
                            ...productType,           // 1. Copy any existing properties
                            name: e.target.value   // 2. Update the 'name' property  Type- ATTAR, PERFUME,DAKHOON etc ...
                          });
                        }}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Product Type SKU
                      </label>
                      <input
                        type="text"
                        placeholder={productType.code}
                        required
                        onChange={(e) => {
                          setProductType({
                            ...productType,           // 1. Copy any existing properties
                            code: e.target.value   // 2. Update the 'name' property ,MEN, WOMEN, ALL ...
                          });
                        }}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm uppercase"
                      />
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddNew;
