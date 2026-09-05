import { Link, useParams } from "react-router";
import { Heart, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Layout from "../../components/Customer/ui/Layout";
import { useApp } from "../../components/Customer/context/AppContext";
import { useAuth } from "../../components/Auth/AuthContext";
import { useEffect, useState } from "react";
import { CustomerApi } from "../API/Api";
import { filterByDate } from "../../components/Utils/StoreUtils";

const MyOrders = () => {
  //   const { myList, toggleMyList, addToCart } = useApp();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  //   console.log(user);

  const fetchOrders = async () => {
    setLoading(true);
    const page = 0;
    const size = 10;
    try {
      const response = await CustomerApi.get(
        "/orders/oudiac/get-order/" + user.userId,
        {
          params: { page, size },
        },
      );
      setOrders(response.data.content);
      //   setCategories(response.data.content);
      console.log("Fetched orders:", response.data.content);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#181725] mb-6">Your Orders</h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-[#F2F3F2] rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={36} className="text-[#7C7C7C]" />
            </div>
            <h3 className="text-xl font-bold text-[#181725] mb-2">
              Your have no orders yet
            </h3>
            <p className="text-[#7C7C7C] mb-6">
              Your past orders will appear here. Start shopping to place your
              first order!
            </p>
            <Link
              to="/browse"
              className="bg-[#53B175] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#3d9a5f] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="min-h-screen bg-slate-50 p-5 font-sans text-gray-800">
            <div className="mx-auto w-full">
              {/* <h2 className="text-2xl font-bold mb-5 text-gray-900">
                My Orders
              </h2> */}

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100 w-full"
                >
                  {/* Header: Status, Date, and Amount */}
                  <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
                    <div className="flex flex-col">
                      <p
                        className={`text-sm font-semibold mb-1 ${order.orderStatus === "CONFIRMED" ? "text-green-600" : "text-amber-500"}`}
                      >
                        {order.orderStatus}
                      </p>
                      <p className="text-xs text-gray-500">
                        {filterByDate(order.date)} • Order #{order.orderId}
                      </p>
                    </div>
                    <div className="text-base font-bold text-gray-900">
                      ₹{order.totalPrice}
                    </div>
                  </div>

                  {/* Body: Mapped Items */}
                  <div className="flex flex-wrap gap-10 items-start">
                    {order.orderItems.length == 0
                      ? ""
                      : order.orderItems.map((item) => (
                          <div key={item.id} className="flex flex-col w-32">
                            <img
                              src={item.url}
                              alt={item.productName}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-100 mb-2"
                            />

                            <div>
                              <p className="text-sm font-medium mb-0.5 text-gray-800">
                                {item.productName}
                              </p>
                              <p className="text-sm font-medium mb-0.5 text-gray-800">
                                {item.variantType}
                              </p>

                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity} • ₹{item.unitPrice}
                              </p>
                            </div>
                          </div>
                        ))}
                  </div>

                  {/* Footer: Action Button */}
                  <div className="mt-4 pt-3 border-t border-dashed border-gray-200 text-right">
                    <button className="bg-[#f8cb46] hover:bg-[#e5b93d] text-gray-900 px-4 py-2 rounded-md font-semibold text-sm transition-colors">
                      {order.orderStatus === "CONFIRMED"
                        ? "Reorder"
                        : "Track Order"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default MyOrders;
