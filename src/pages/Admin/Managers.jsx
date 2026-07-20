import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Mail,
  Phone,
  ShoppingBag,
  ArrowDownToLine,
} from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout";
import {Api} from "../API/Api";
import { useNavigate } from "react-router-dom";

// Dummy Customers Data
const initialCustomers = [
  {
    id: "CUS-8901",
    name: "Arjun Reddy",
    email: "arjun.r@example.com",
    phone: "+91 98765 00001",
    joinDate: "Jan 15, 2026",
    totalOrders: 42,
    totalSpent: 15400,
    lastActive: "Today",
    status: "Active",
  },
  {
    id: "CUS-8902",
    name: "Neha Sharma",
    email: "neha.s@example.com",
    phone: "+91 98765 00002",
    joinDate: "Feb 03, 2026",
    totalOrders: 18,
    totalSpent: 6200,
    lastActive: "Yesterday",
    status: "Active",
  },
  {
    id: "CUS-8903",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 98765 00003",
    joinDate: "Dec 10, 2025",
    totalOrders: 5,
    totalSpent: 1200,
    lastActive: "2 weeks ago",
    status: "Inactive",
  },
  {
    id: "CUS-8904",
    name: "Priya Patel",
    email: "priya.p@example.com",
    phone: "+91 98765 00004",
    joinDate: "Mar 22, 2026",
    totalOrders: 104,
    totalSpent: 45800,
    lastActive: "Today",
    status: "Active",
  },
  {
    id: "CUS-8905",
    name: "Rahul Desai",
    email: "rahul.desai@example.com",
    phone: "+91 98765 00005",
    joinDate: "Nov 05, 2025",
    totalOrders: 2,
    totalSpent: 450,
    lastActive: "3 months ago",
    status: "Blocked",
  },
  {
    id: "CUS-8906",
    name: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    phone: "+91 98765 00006",
    joinDate: "Apr 12, 2026",
    totalOrders: 12,
    totalSpent: 3800,
    lastActive: "3 days ago",
    status: "Active",
  },
];

const Managers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  const [managers, setManagers] = useState([]);

  const fetchManagers = async () => {
    try {
      const response = await Api.get(
        "/admin/oudiac/get-managers",
      );

      // const managersData = await response.json();
      console.log("Fetched Managers:", response.data);
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  // Status Badge Logic
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            Active
          </span>
        );
      case "Inactive":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            Inactive
          </span>
        );
      case "Blocked":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-600 border border-red-200">
            Blocked
          </span>
        );
      default:
        return null;
    }
  };

  // Format Currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  //Filter Date
  const filterByDate = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);

    if (isNaN(date)) return "Invalid Date";

    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replace(",", "");
  };
  // Filter Logic
  const filteredManagers = managers?.filter((manager) => {
    const matchesSearch =
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.mobileNumber.includes(searchTerm);
    const matchesStatus =
      statusFilter === "All" || manager.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchManagers();
  }, []);
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Managers</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your registered managers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <ArrowDownToLine className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => navigate("/admin/add-manager")}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Add Manager
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Total Customers
          </p>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-bold text-gray-900">24,592</h4>
            <span className="text-sm text-emerald-600 font-medium mb-1">
              +12% this month
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Active (30 Days)
          </p>
          <h4 className="text-2xl font-bold text-gray-900">18,240</h4>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-amber-400">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Average Order Value
          </p>
          <h4 className="text-2xl font-bold text-gray-900">₹450</h4>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-red-400">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <UserX className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Churn Risk</p>
          <h4 className="text-2xl font-bold text-gray-900">1,245</h4>
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
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 min-w-max">
              {["All", "Active", "Inactive", "Blocked"].map((status) => (
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

        {/* Customers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Managers</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium text-center">Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Status & Activity</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredManagers.length > 0 ? (
                filteredManagers.map((manager, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
                          {manager.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-sm hover:text-emerald-600 cursor-pointer">
                            {manager.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-0.5">
                            Joined: {filterByDate(manager.created_at)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span>{manager.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{manager.mobileNumber}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                        {manager.totalOrders || 234}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">
                          {/* {formatCurrency(manager.totalSpent)} | 23,400 */}
                          23,400
                        </span>
                        <span className="text-xs text-gray-500 mt-0.5">
                          Lifetime Value
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-1.5">
                        {/* {getStatusBadge(manager.status)}*/}
                        {getStatusBadge("Active")}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          Last seen:{" "}
                          <span className="font-medium text-gray-700">
                            {/* {manager.lastActive} */} Today
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          View Profile
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
                    <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      No Manager found
                    </h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                      We couldn't find any users matching your search or
                      filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Showing {filteredManagers?.length || 0} entries
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

export default Managers;
