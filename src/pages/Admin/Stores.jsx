import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Store,
  MapPin,
  TrendingUp,
  Users,
  Power,
  Activity,
  Map,
  Phone,
} from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout"; // Adjust path based on your setup
import { useNavigate } from "react-router-dom";
import {Api} from "../API/Api";

// Dummy Stores Data
const initialStores = [
  {
    id: "STR-KOR-01",
    storeName: "Koramangala Hub",
    address: "Block 5, Koramangala",
    managerName: "Ankit Sharma",
    storePhone: "+91 98765 11111",
    storeStatus: "ACTIVE",
    ordersToday: 845,
    revenueToday: "₹1.2L",
    activePartners: 42,
  },
  {
    id: "STR-HSR-02",
    storeName: "HSR Layout Sector 2",
    address: "27th Main Road, HSR",
    managerName: "Priya Patel",
    storePhone: "+91 98765 22222",
    storeStatus: "HIGH_VOLUME",
    ordersToday: 1120,
    revenueToday: "₹1.8L",
    activePartners: 55,
  },
  {
    id: "STR-IND-01",
    storeName: "Indiranagar Main",
    address: "100ft Road, Indiranagar",
    managerName: "Rahul Desai",
    storePhone: "+91 98765 33333",
    storeStatus: "ACTIVE",
    ordersToday: 630,
    revenueToday: "₹95K",
    activePartners: 30,
  },
  {
    id: "STR-WFD-03",
    storeName: "Whitefield Tech Park",
    address: "ITPL Main Road",
    managerName: "Sneha Reddy",
    storePhone: "+91 98765 44444",
    storeStatus: "INACTIVE",
    ordersToday: 0,
    revenueToday: "₹0",
    activePartners: 0,
  },
  {
    id: "STR-JP-01",
    storeName: "JP Nagar Phase 6",
    address: "Outer Ring Road, JP Nagar",
    managerName: "Vikram Singh",
    storePhone: "+91 98765 55555",
    storeStatus: "ACTIVE",
    ordersToday: 410,
    revenueToday: "₹62K",
    activePartners: 25,
  },
  {
    id: "STR-BTM-02",
    storeName: "BTM Layout Stage 2",
    address: "Udupi Garden Road",
    managerName: "Neha Gupta",
    storePhone: "+91 98765 66666",
    storeStatus: "HIGH_VOLUME",
    ordersToday: 950,
    revenueToday: "₹1.4L",
    activePartners: 48,
  },
];

const Stores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [filteredData, setFilteredData] = useState({
    totalActiveStores: 0,
    highVolumeStores: 0,
    networkOrdersToday: 0,
    activeFleetPartners: 0,
  });

  const fetchStores = async () => {
    try {
      const response = await Api.get("/stores/oudiac/get-stores");

      // const managersData = await response.json();
      console.log("Fetched Stores:", response.data);
      setStores(response.data);
      setFilteredData({
        totalActiveStores: response.data.filter(
          (store) => store.storeStatus === "ACTIVE",
        ).length,
        highVolumeStores: response.data.filter(
          (store) => store.storeStatus === "HIGH_VOLUME",
        ).length,
        networkOrdersToday: response.data.reduce(
          (sum, store) => sum + store.ordersToday,
          0,
        ),
        activeFleetPartners: response.data.reduce(
          (sum, store) => sum + store.activePartners,
          0,
        ),
      });
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Status Badge Logic
  const getStatusBadge = (status) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center w-max gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
            Open
          </span>
        );
      case "HIGH_VOLUME":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center w-max gap-1.5">
            <Activity className="w-3 h-3" /> High Volume
          </span>
        );
      case "INACTIVE":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center w-max gap-1.5">
            <Power className="w-3 h-3" /> Offline
          </span>
        );
      default:
        return null;
    }
  };

  // Filter Logic
  const filteredStores = stores?.filter((store) => {
    const matchesSearch =
      store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.storeSku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || store.storeStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dark Stores</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage fulfillment centers and monitor local performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Map className="w-4 h-4" />
            Map View
          </button>
          <button
            onClick={() => navigate("/admin/stores/add")}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Store
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Store className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Total Active Stores
          </p>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-bold text-gray-900">
              {filteredData.totalActiveStores}
            </h4>
            <span className="text-sm text-gray-500 mb-1">
              / {stores?.length || 0} total
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-amber-400">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            High Volume Stores
          </p>
          <h4 className="text-2xl font-bold text-gray-900">
            {filteredData.highVolumeStores}
          </h4>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Network Orders Today
          </p>
          <h4 className="text-2xl font-bold text-gray-900">
            {filteredData.networkOrdersToday.toLocaleString()}
          </h4>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Active Fleet Partners
          </p>
          <h4 className="text-2xl font-bold text-gray-900">
            {filteredData?.activeFleetPartners || 0}
          </h4>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters & Search */}
        <div className="p-4 sm:px-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by store name, location, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 min-w-max">
              {["All", "ACTIVE", "HIGH_VOLUME", "INACTIVE"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    statusFilter === status
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stores Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Store Name & Location</th>
                <th className="px-6 py-4 font-medium">Store Manager</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Today's Orders</th>
                {/* <th className="px-6 py-4 font-medium">Active Fleet</th> */}
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStores.length > 0 ? (
                filteredStores.map((store, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">
                          {store.storeName}
                        </span>
                        <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{store.address}</span>
                          <span className="text-xs text-gray-300 ml-1">|</span>
                          <span className="text-xs font-mono text-gray-400 ml-1">
                            {store.storeSku}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold border border-blue-200">
                          {store.managerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-sm">
                            {store.managerName}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {store.storePhone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(store.storeStatus)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">
                          {store.ordersToday ? store.ordersToday : 0}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            orders
                          </span>
                        </span>
                        <span className="text-xs text-emerald-600 font-medium mt-0.5">
                          {store.revenueToday ? store.revenueToday : 0} revenue
                        </span>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                          {store.activePartners}
                        </span>
                        <span className="text-xs text-gray-500">riders</span>
                      </div>
                    </td> */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          Manage
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <Store className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      No stores found
                    </h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                      We couldn't find any fulfillment centers matching your
                      search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Dummy */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Showing {filteredStores.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-emerald-600 text-white font-medium rounded-md">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Stores;
