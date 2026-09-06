import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Eye,
  MoreHorizontal,
  MoreVertical,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import { filterByDate } from "../../Utils/StoreUtils";

// Order Status Badge Logic
const getStatusBadge = (status) => {
  const styles = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    CONFIRMED: "bg-blue-50 text-green-700 border-green-200",
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

const RecentOrders = ({ orders }) => {
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

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-sm">
              <th className="px-6 py-4 font-medium">Order ID & Date</th>
              <th className="px-6 py-4 font-medium">Customer Name</th>
              <th className="px-6 py-4 font-medium text-center">Items</th>
              <th className="px-6 py-4 font-medium">Total Amount</th>
              <th className="px-6 py-4 font-medium">Order Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order, idx) => (
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
                    We couldn't find any orders matching your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
