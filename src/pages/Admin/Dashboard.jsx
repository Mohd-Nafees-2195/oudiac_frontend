import React, { useEffect, useState } from "react";
import {
  IndianRupee,
  ShoppingBag,
  Users,
  Store,
  Bike,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout";
import StatsCard from "../../components/Admin/Ui/StatsCard";
import RevenueChart from "../../components/Admin/Charts/RevenueChart";
import RecentOrders from "../../components/Admin/Dashboard/RecentOrders";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Auth/AuthContext";
import {Api} from "../API/Api";

const Dashboard = () => {
  const navigate = useNavigate();
  const {user,logout}=useAuth();
  const [stores,setStores]=useState([]);

  if(user==null||user.role==='USER'){
    logout();
  }
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
  };

  useEffect(()=>{
    fetchStores();
  },[])

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back, here's what's happening in your stores today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Export Report
          </button>
          <button
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
            onClick={() => {
              console.log("Navigating to Add Product page...");
              navigate("/admin/add-product");
            }}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Revenue"
          value="₹8,45,200"
          icon={IndianRupee}
          trend="up"
          trendValue="12.5"
          colorClass="bg-emerald-100 text-emerald-600"
        />
        <StatsCard
          title="Total Orders"
          value="1,240"
          icon={ShoppingBag}
          trend="up"
          trendValue="8.2"
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatsCard
          title="Active Customers"
          value="8,924"
          icon={Users}
          trend="up"
          trendValue="5.4"
          colorClass="bg-purple-100 text-purple-600"
        />
        <StatsCard
          title="Pending Deliveries"
          value="42"
          icon={Bike}
          trend="down"
          trendValue="2.1"
          colorClass="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Low Stock Alert Mini-Card */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-bold">Low Stock Alert</h3>
            </div>
            <p className="text-red-700/80 text-sm mb-4">
              24 products are running dangerously low on inventory across 3
              stores.
            </p>
            <button className="text-sm font-semibold text-red-700 hover:text-red-800 underline">
              View Inventory
            </button>
          </div>

          {/* Active Stores Mini-Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Top Stores</h3>
              <Store className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {stores.map((store, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm font-medium">
                    {store.storeName}
                  </span>
                  <span className="text-gray-900 font-bold">
                    {store.ordersToday || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="w-full">
        <RecentOrders />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
