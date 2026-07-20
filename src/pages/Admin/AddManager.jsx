import React, { useEffect, useState } from "react";
import {Api} from "../API/Api";
import { ArrowDownToLine, Save, UserPlus } from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout";
import { useNavigate } from "react-router-dom";

const AddManager = () => {
  const navigate = useNavigate();
  const [stores,setStores]=useState([]);
  const [loading,setLoading]=useState(false);

  const [managerFormData, setManagerFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    storeId:0,
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setManagerFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Saving new manager:", managerFormData);
    try {
      const response = await Api.post(
        "/admin/oudiac/register-manager",
        managerFormData,
      );

      console.log(response.data);
      alert("Manager added successfully!");
      navigate("/admin/managers");
    } catch (error) {
      console.error(error);
      alert("Failed to save manager.");
    }
  };

   const fetchStores = async () => {
    try {
      const response = await Api.get(
        "/stores/oudiac/get-stores",
      );

      // const managersData = await response.json();
      console.log("Fetched Stores:", response.data);
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching Stores:", error);
    }
    setLoading(false);
  };

  useEffect(()=>{
    setLoading(true)
    fetchStores();
  },[])
  
  return (
    <>
      {loading ? <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
        : (<AdminLayout>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Managers</h1>
              <p className="text-sm text-gray-500 mt-1">
                View and manage your registered managers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Manager
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
              Add New Store Manager
            </h2>

            <div className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                   value={managerFormData.name}
                   placeholder="John Du"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={managerFormData.email}
                    onChange={handleChange}
                    placeholder="support@quickmart.com"
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={managerFormData.mobileNumber}
                    onChange={handleChange}
                    placeholder="+91 1800 123 4567"
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={managerFormData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Stores
                  </label>
                  <select
                    name="storeId"
                    required
                    value={managerFormData.storeId}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm appearance-none cursor-pointer"
                  >
                    <option value="0">
                      Select Store
                    </option>
                    {
                      stores.map((store) => {
                        return (
                          <option key={store.id} value={store.id}>
                            {store.storeName}
                          </option>
                        );
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>)}
    </>
  );
};
export default AddManager;
