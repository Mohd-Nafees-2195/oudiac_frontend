import React from "react";
import {
  ArrowLeft,
  Printer,
  Clock,
  PackageCheck,
  Truck,
  CheckCircle,
  User,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";

const mockOrder = {
  id: "ORD-94821",
  date: "Oct 24, 2026, 02:45 PM",
  status: "In Transit",
  paymentStatus: "Paid",
  paymentMethod: "Credit Card (•••• 4242)",
  customer: {
    name: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    phone: "+1 (555) 234-5678",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  shippingAddress: {
    street: "742 Evergreen Terrace",
    city: "Springfield",
    state: "OR",
    postalCode: "97477",
    country: "United States",
  },
  deliveryPartner: {
    name: "SwiftLog Express",
    trackingNumber: "TRK-98231902",
    driverName: "Marcus Brody",
    driverPhone: "+1 (555) 901-2234",
  },
  timeline: [
    { title: "Order Placed", date: "Oct 24, 02:45 PM", completed: true },
    { title: "Payment Confirmed", date: "Oct 24, 02:46 PM", completed: true },
    { title: "Packed at Warehouse", date: "Oct 24, 05:10 PM", completed: true },
    { title: "Handed to Courier", date: "Oct 25, 08:30 AM", completed: true },
    { title: "Delivered", date: "Estimated Oct 26", completed: false },
  ],
  items: [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      sku: "AUDIO-PRO-BLK",
      price: 249.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Braided USB-C Fast Charging Cable (2m)",
      sku: "CAB-USBC-2M",
      price: 19.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=100&auto=format&fit=crop&q=80",
    },
  ],
  subtotal: 289.97,
  discount: 25.0,
  shipping: 12.0,
  tax: 22.16,
  total: 299.13,
};

export default function OrderDetails({ order, onBack }) {
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  if (!order) {
    return <div>No order selected</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {order.orderId}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                {order.orderStatus}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                {order.payment == "SUCCESS" ? "Paid" : "Pending"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              Placed on {order.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition shadow-sm">
            Update Status
          </button>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-6">
          Order Progress
        </h2>
        <div className="flex flex-col md:flex-row justify-between relative gap-4">
          {mockOrder.timeline.map((step, idx) => (
            <div
              key={idx}
              className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 relative"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.completed
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-400 border border-gray-300"
                }`}
              >
                {step.completed ? <CheckCircle className="w-4 h-4" /> : idx + 1}
              </div>
              <div className="md:text-center">
                <p
                  className={`text-sm font-medium ${step.completed ? "text-gray-900" : "text-gray-400"}`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Order Items & Financials */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
              <h2 className="text-base font-semibold text-gray-900">
                Ordered Products
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {order.orderItems.map((item) => (
                <div key={item.id} className="p-6 flex items-center gap-4">
                  <img
                    src={item.url}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.productName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      SKU: {item.sku}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${item.unitPrice.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            {/* <div className="p-6 bg-gray-50/50 border-t border-gray-200 space-y-2.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-emerald-600">
                <span>Coupon Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping Fee</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Estimated Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
                <span>Total Amount</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Right 1 Col: Customer, Shipping, Delivery Partner */}
        {/* Customer Details */}
        <div className="space-y-6">
          {/* <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              Customer Information
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={order.customer.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.customer.name}
                </p>
                <p className="text-xs text-gray-500">Regular Buyer</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <p className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-gray-400" />{" "}
                {order.customer.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />{" "}
                {order.customer.phone}
              </p>
            </div>
          </div> */}

          {/* Shipping Address */}
          {/* <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              Delivery Destination
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </p>
          </div> */}

          {/* Logistics & Delivery Partner */}
          {/* <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              Assigned Partner
            </h3>
            <div className="bg-gray-50 p-3 rounded-lg space-y-1.5 text-xs">
              <p className="font-medium text-gray-800">
                {order.deliveryPartner.name}
              </p>
              <p className="text-gray-500">
                Tracking:{" "}
                <span className="font-mono text-gray-700">
                  {order.deliveryPartner.trackingNumber}
                </span>
              </p>
              <p className="text-gray-500">
                Rider: {order.deliveryPartner.driverName} (
                {order.deliveryPartner.driverPhone})
              </p>
            </div>
          </div> */}

          {/* Payment Overview */}
          {/* <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              Payment Details
            </h3>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Method</span>
              <span className="font-medium text-gray-800">
                {order.paymentMethod}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Transaction</span>
              <span className="flex items-center gap-1 font-medium text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
