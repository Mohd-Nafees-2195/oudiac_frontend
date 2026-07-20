import { useParams, Link, useNavigate, useLocation } from "react-router";
import { ArrowLeft, Star, Heart, Plus, Minus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Layout from "../../components/Customer/ui/Layout";
import { useApp } from "../../components/Customer/context/AppContext";
import FuturisticLoader from "../../components/Admin/Layout/FuturisticLoader";
import { CustomerApi } from "../API/Api";
import { div } from "framer-motion/client";
import toast from "react-hot-toast";
// import { products } from "../../data/customerData";

export default function ProductPage() {
  const { id, categoryId } = useParams();
  const { state } = useLocation();

  // 1. Instantly use the state product if it exists, otherwise start with null
  const [product, setProduct] = useState(state?.product || null);
  const [loading, setLoading] = useState(!state?.product); // Only load if we have no state
  const [subLoading, setSubLoading] = useState(false);

  const navigate = useNavigate();
  const { addToCart, toggleMyList, myList, cartTotal } = useApp();
  const [qty, setQty] = useState(1);
  const isWished = myList.find(p => p.id === product.id);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.productVariants?.[0] || null
  );

  const rating = product.rating || 4.8;
  const reviews = product.reviews || 124;

  const fetchFreshProduct = async () => {
    try {
      // 2. Fetch the fresh, accurate data from the backend
      const response = await CustomerApi.get(`/products/public/get-by-id/${id}`);
      setProduct(response.data);
      console.log(response.data, "eeeee");
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductByCategoryId = async () => {
    setSubLoading(true);
    try {
      // 2. Fetch the fresh, accurate data from the backend
      const response = await CustomerApi.get(`/products/public/get-by-categoryId/${categoryId}`);
      setRelatedProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch Related Product", error);
    } finally {
      setSubLoading(false);
    }
  };

  useEffect(() => {
    fetchFreshProduct();
    fetchProductByCategoryId();
  }, [id]);
  return (
    <>
      {loading ? (<FuturisticLoader />) :
        (<Layout>
          <div className="p-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#181725] font-medium mb-6 hover:text-[#53B175] transition-colors">
              <ArrowLeft size={20} />
              Back
            </button>

            <div className="grid grid-cols-2 gap-10 mb-12">
              {/* Image */}
              <div className="group overflow-hidden rounded-2xl">
                <img
                  src={product.imageUrl || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800"}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col">
                {/* {product.badge && (
              <span className="self-start bg-[#F8A44C] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )} */}
                <h1 className="text-3xl font-bold text-[#181725] mb-2">{product.name}</h1>
                <p className="text-[#7C7C7C] mb-4">{product.quantity}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                    />
                  ))}
                  <span className="text-[#7C7C7C] text-sm ml-1">{reviews} (reviews)</span>
                </div>

                {/* Description */}
                <p className="text-[#7C7C7C] text-sm leading-relaxed mb-6">
                  {product.description.toLowerCase()}
                </p>

                <div className="border-t border-gray-100 pt-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    {/* <div className="flex items-center gap-4">
                  {
                    product.productVariants.map((variant)=>(
                       <div>
                        <span className="text-2xl font-bold text-[#181725]">₹{(product.sellingPrice * qty).toFixed(2)}</span>
                       </div>
                      
                    ))
                  }
                </div> */}
                    {/* Variant Selector */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Select Size/Variant:</h3>
                      <div className="flex flex-wrap gap-3">
                        {product.productVariants.map((variant, index) => {
                          // Check if this button is the currently selected one
                          const isActive = selectedVariant.variantType === variant.variantType;

                          return (
                            <button
                              key={index}
                              onClick={() => setSelectedVariant(variant)}
                              className={`px-5 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${isActive
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700" // Active styling
                                : "border-gray-200 text-gray-600 hover:border-emerald-200" // Inactive styling
                                }`}
                            >
                              {variant.variantType}
                            </button>
                          );
                        })}
                      </div>
                      {/* Price Display */}
                      <div className="flex items-end gap-3 mb-6 mt-6">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{(selectedVariant.sellingPrice * qty).toFixed(2)}
                        </span>
                        {selectedVariant.mrp > selectedVariant.sellingPrice && (
                          <span className="text-lg text-gray-400 line-through mb-1">
                            ₹{selectedVariant.mrp}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-emerald-600 font-medium mb-1 ml-2">
                        ({selectedVariant.stock} in stock)
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-10 h-10 border-2 border-[#53B175] rounded-full flex items-center justify-center text-[#53B175] hover:bg-[#f0faf5] transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-xl font-bold text-[#181725] w-8 text-center">{qty}</span>
                      <button
                        onClick={() => setQty(q => q + 1)}
                        className="w-10 h-10 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {/* <button
                onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); navigate("/cart"); }}
                className="flex-1 bg-[#53B175] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#3d9a5f] transition-colors"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button> */}
                  <button
                    onClick={() => {
                      // Pass BOTH the product and the variant state!
                      addToCart(product, selectedVariant, qty);
                      toast.success(`${product.name} (${selectedVariant.variantType}) added!`);
                    }}
                    disabled={selectedVariant.stock <= 0}
                    className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {selectedVariant.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>

                    {cartTotal>0?(<button
                    onClick={() => {
                      if(cartTotal > 0)
                       navigate("/cart");
                      else
                       toast("Please Add item first")
                    }}
                    disabled={selectedVariant.stock <= 0}
                    className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Check Out
                  </button>):""}


                  <button
                    onClick={() => toggleMyList(product)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-colors ₹{
                  isWished ? "border-red-400 bg-red-50 text-red-400" : "border-gray-200 text-[#7C7C7C] hover:border-red-300 hover:text-red-400"
                }`}
                  >
                    <Heart size={20} fill={isWished ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>

            {/* Related */}
            {relatedProduct.length > 0 && (
              <section>
                <h3 className="text-lg font-bold text-[#181725] mb-4">Related Products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {relatedProduct.map(p => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      className="bg-white rounded-2xl p-4 hover:shadow-md transition-shadow flex flex-col gap-2"
                    >
                      <div className="w-full h-24 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-4xl">
                        {/* {p.emoji} */}
                      </div>
                      <p className="font-semibold text-[#181725] text-sm">{p.name}</p>
                      <p className="text-[#53B175] font-bold">₹{p.price.toFixed(2)}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </Layout>)}
    </>
  );
}