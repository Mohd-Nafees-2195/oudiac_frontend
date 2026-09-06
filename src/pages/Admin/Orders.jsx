import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  MoreVertical,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Download,
  Calendar,
} from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout"; // Adjust path based on your setup
import { Api } from "../API/Api";
import { filterByDate } from "../../components/Utils/StoreUtils";
import OrderDetails from "./OrderDetails";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStats, setOrderStats] = useState([
    {
      title: "Total Orders",
      value: "0",
      subtitle: "1.2% increase from last week",
      color: "blue",
    },
    {
      title: "Processing",
      value: "0",
      subtitle: "Requires attention",
      color: "amber",
    },
    {
      title: "Out for Delivery",
      value: "0",
      subtitle: "Currently in transit",
      color: "purple",
    },
    {
      title: "Delivered Today",
      value: "0",
      subtitle: "Successfully fulfilled",
      color: "emerald",
    },
  ]);

  // Order Status Badge Logic
  const getStatusBadge = (status) => {
    const styles = {
      PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
      CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
      SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
      DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
      CANCELLED: "bg-red-50 text-red-700 border-red-200",
    };

    const icons = {
      PENDING: <Clock className="w-3 h-3" />,
      CONFIRMED: <ShoppingBag className="w-3 h-3" />,
      SHIPPED: <Truck className="w-3 h-3" />,
      DELIVERED: <CheckCircle2 className="w-3 h-3" />,
      CANCELLED: <XCircle className="w-3 h-3" />,
    };

    return (
      <span
        className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 w-max ${styles[status]}`}
      >
        {icons[status]} {status}
      </span>
    );
  };

  // Payment Status Badge Logic
  const getPaymentBadge = (payment) => {
    const styles = {
      SUCCESS: "bg-emerald-100 text-emerald-800",
      PENDING: "bg-gray-100 text-gray-800",
      REFUNDED: "bg-blue-100 text-blue-800",
      FAILED: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${styles[payment]}`}
      >
        {payment}
      </span>
    );
  };

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // /products/oudiac/get-products
  const fetchOrgers = async () => {
    const page = 0;
    const size = 10;
    try {
      const response = await Api.get("/orders/oudiac/manager/get-orders", {
        params: { page, size },
      });
      setOrders(response.data.content);
      calculateOrderStats(response.data.content);
      console.log("Fetched orders:", response.data);
      // console.log("filtered Item :",filteredInventory);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const calculateOrderStats = (orders) => {
    const totalOrders = orders.length;

    const processing = orders.filter(
      (order) => order.orderStatus === "CONFIRMED",
    ).length;

    const outForDelivery = orders.filter(
      (order) => order.orderStatus === "SHIPPED",
    ).length;

    const deliveredToday = orders.filter(
      (order) => order.orderStatus === "DELIVERED",
    ).length;

    setOrderStats([
      {
        title: "Total Orders",
        value: totalOrders.toString(),
        subtitle: "Total orders",
        color: "blue",
      },
      {
        title: "Processing",
        value: processing.toString(),
        subtitle: "Requires attention",
        color: "amber",
      },
      {
        title: "Out for Delivery",
        value: outForDelivery.toString(),
        subtitle: "Currently in transit",
        color: "purple",
      },
      {
        title: "Delivered Today",
        value: deliveredToday.toString(),
        subtitle: "Successfully fulfilled",
        color: "emerald",
      },
    ]);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    // Call your API or state updater here:
    console.log(`Update ${orderId} to ${newStatus}`);
  };

  useEffect(() => {
    fetchOrgers();
  }, []);

  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track customer orders in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            Select Date
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {orderStats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500 mb-1">
              {stat.title}
            </p>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">
              {stat.value}
            </h4>
            <span
              className={`text-xs font-medium text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-md`}
            >
              {stat.subtitle}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters & Search */}
        <div className="p-4 sm:px-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID or Customer Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 min-w-max">
              {["ALL", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].map(
                (status) => (
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
                ),
              )}
            </div>
            <button className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Order ID & Date</th>
                <th className="px-6 py-4 font-medium">Customer Info</th>
                <th className="px-6 py-4 font-medium text-center">Items</th>
                <th className="px-6 py-4 font-medium">Total Amount</th>
                <th className="px-6 py-4 font-medium">Order Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 hover:text-emerald-600 cursor-pointer transition-colors">
                          {order.orderId}
                        </span>
                        <span className="text-xs text-gray-500 mt-0.5">
                          {filterByDate(order.date)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold border border-emerald-200">
                          {order.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-sm">
                            {order.customer}
                          </span>
                          <span className="text-xs text-gray-500 mt-0.5">
                            {order.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                        {order.orderItems.length}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-bold text-gray-900 text-sm">
                          ₹{order.totalPrice}
                        </span>
                        {getPaymentBadge(order.payment)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.orderStatus)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors">
                          Update
                        </button>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
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
                    <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      No orders found
                    </h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                      We couldn't find any orders matching your search or
                      filters.
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
            Showing {filteredOrders.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-emerald-600 text-white font-medium rounded-md">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50">
              2
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

export default Orders;
