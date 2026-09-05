import { Link, useParams } from "react-router";
import { Heart, Plus, Trash2 } from "lucide-react";
import Layout from "../../components/Customer/ui/Layout";
import { useApp } from "../../components/Customer/context/AppContext";
import { useAuth } from "../../components/Auth/AuthContext";
import { useEffect, useState } from "react";

const MyList = () => {
  const { myList, toggleMyList, addToCart } = useApp();
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#181725] mb-6">My List</h2>

        {myList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-[#F2F3F2] rounded-full flex items-center justify-center mb-6">
              <Heart size={36} className="text-[#7C7C7C]" />
            </div>
            <h3 className="text-xl font-bold text-[#181725] mb-2">
              Your list is empty
            </h3>
            <p className="text-[#7C7C7C] mb-6">
              Save your favorite items to find them easily
            </p>
            <Link
              to="/browse"
              className="bg-[#53B175] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#3d9a5f] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myList.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="w-20 h-20 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-4xl shrink-0"
                >
                  {product.emoji}
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#7C7C7C]">{product.unit}</p>
                  <p className="font-semibold text-[#181725] truncate">
                    {product.name}
                  </p>
                  <p className="font-bold text-[#181725] mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-9 h-9 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => toggleMyList(product)}
                    className="w-9 h-9 border border-red-200 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
export default MyList;
