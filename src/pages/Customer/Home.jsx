import React, { useEffect, useState } from "react";
import Layout from "../../components/Customer/ui/Layout";
import { Link } from "react-router-dom";
import { categories, products, exclusiveOffers } from "../../data/customerData";
import { useApp } from "../../components/Customer/context/AppContext";
import { Plus, ShoppingBag, Star } from "lucide-react";
import { useAuth } from "../../components/Auth/AuthContext";
import { CustomerApi } from "../API/Api";
import FuturisticLoader from "../../components/Admin/Layout/FuturisticLoader";
import toast from "react-hot-toast";
import ProductCard from "../../components/Customer/ProductCard";

// function ProductCard({ product }) {
//   const { addToCart } = useApp();
//   const rating = product.rating || 4.8;
//   const reviews = product.reviews || 124;
//   const description =
//     product.description ||
//     "A captivating blend of rare woods, warm amber, and delicate florals, creating an unforgettable signature scent.";

//   return (
//     <div className="group flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-neutral-100 h-full">
//       {/* --- Image Section --- */}
//       <Link
//         to={`/product/${product.id}/${product.category.id}`}
//         state={{ product }}
//         className="block relative aspect-[4/5] bg-neutral-50 overflow-hidden shrink-0"
//       >
//         <img
//           src={
//             product.imageUrl ||
//             "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800"
//           }
//           alt={product.name}
//           className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
//         />

//         {/* Badge */}
//         {/* {product.badge && (
//           <span className="absolute top-4 left-4 bg-neutral-900 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">
//             {product.badge}
//           </span>
//         )} */}

//         {/* Hover Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
//       </Link>

//       {/* --- Details Section --- */}
//       <div className="p-5 flex flex-col flex-grow">
//         {/* Category & Unit */}
//         <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-1.5">
//           {product.category.name || "Fragrance"} •{" "}
//           {(product.productVariants.length > 0 &&
//             product.productVariants?.[0]?.variantType) ||
//             "100ml"}
//         </p>

//         {/* Product Name */}
//         <Link
//           to={`/product/${product.id}/${product.category.id}`}
//           state={{ product }}
//         >
//           <h3 className="font-serif text-xl text-neutral-900 truncate group-hover:text-amber-600 transition-colors">
//             {product.name}
//           </h3>
//         </Link>

//         {/* --- Rating & Reviews --- */}
//         <div className="flex items-center gap-1.5 mt-2 mb-3">
//           <div className="flex items-center gap-0.5 text-amber-500">
//             {/* Renders 5 stars, filling them based on the rating */}
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={14}
//                 className={
//                   i < Math.floor(rating)
//                     ? "fill-amber-500"
//                     : "fill-neutral-200 text-neutral-200"
//                 }
//               />
//             ))}
//           </div>
//           <span className="text-xs font-medium text-neutral-700 ml-1">
//             {rating}
//           </span>
//           <span className="text-xs text-neutral-400">({reviews})</span>
//         </div>

//         {/* --- Description --- */}
//         {/* line-clamp-2 ensures it only takes up 2 lines maximum, keeping cards the same height */}
//         <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-6">
//           {description}
//         </p>

//         {/* --- Price & Action Button --- */}
//         {/* mt-auto forces this block to the absolute bottom of the card, aligning perfectly with other cards */}
//         <div className="flex items-end justify-between mt-auto pt-4 border-t border-neutral-100">
//           <div className="flex flex-col">
//             {product.productVariants.length > 0 && (
//               <span className="text-xs text-neutral-400 line-through mb-0.5">
//                 ₹{product.productVariants?.[0]?.mrp || 0}
//               </span>
//             )}
//             {product.productVariants.length > 0 && (
//               <span className="font-medium text-lg text-neutral-900">
//                 ₹{product.productVariants?.[0]?.sellingPrice || 0}
//               </span>
//             )}
//           </div>

//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               addToCart(product, product.productVariants?.[0], 1);
//               toast.success(
//                 `${product.name} (${product.productVariants?.[0]?.variantType}) added!`,
//               );
//             }}
//             className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-white hover:bg-amber-600 hover:scale-110 transition-all duration-300 shadow-md shrink-0"
//             aria-label="Add to cart"
//           >
//             <Plus size={18} strokeWidth={2} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [categoryTabs, setCategoryTabs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, customerLogout } = useAuth();
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [categories, setCategories] = useState([]);

  if (user == null) {
    toast.error("Please login first");
    customerLogout();
  }

  const filtered = categories.filter((p) => {
    const matchesCat =
      activeCategory === "ALL" || p.category.code === activeCategory;
    return matchesCat;
  });

  const fetchProducts = async () => {
    setLoading(true);
    const page = 0;
    const size = 10;
    try {
      const response = await CustomerApi.get("/products/public/getall", {
        params: { page, size },
      });
      setProducts(response.data.content);
      setCategories(response.data.content);
      console.log("Fetched products:", response.data.content);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };
  const fetchCategoryTabs = async () => {
    try {
      const response = await CustomerApi.get("/category/public/get-categories");

      // const managersData = await response.json();
      //  console.log("Fetched Category Tabs:", response.data);
      setCategoryTabs(response.data);
    } catch (error) {
      console.error("Error fetching Category Tabs:", error);
    }
  };

  useEffect(() => {
    fetchCategoryTabs();
    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <FuturisticLoader />
      ) : (
        <Layout>
          <div className="p-8 space-y-8">
            {/* Banner */}
            <div className="w-full bg-[#53B175] rounded-3xl p-8 flex items-center justify-between overflow-hidden relative">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10">
                <p className="text-white/80 text-sm mb-1">Welcome back!</p>
                <h2 className="text-white text-2xl font-bold mb-3">
                  Get the Fragrance at an Affordable Price. ✅
                </h2>
                <Link
                  to="/browse"
                  className="inline-block bg-white text-[#53B175] px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Shop now
                </Link>
              </div>
              <div className="relative z-10 text-8xl">🛒</div>
            </div>

            {/* Exclusive offers */}
            <section className="py-8">
              {/* --- Section Header --- */}
              <div className="flex items-center justify-between mb-8 border-b border-neutral-200 pb-4">
                <h3 className="text-2xl font-serif text-neutral-900 uppercase tracking-widest">
                  Exclusive Offers
                </h3>
                <Link
                  to="/browse"
                  className="text-amber-600 text-xs font-semibold uppercase tracking-[0.2em] hover:text-amber-700 hover:underline transition-all"
                >
                  Discover More
                </Link>
              </div>

              {/* --- Offers Grid --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exclusiveOffers.map((offer) => (
                  <Link
                    key={offer.id}
                    to={`/offer/${offer.id}`} // Or wherever this should route
                    className="group relative bg-neutral-900 rounded-xl overflow-hidden flex h-56 sm:h-64 shadow-md hover:shadow-2xl transition-shadow duration-500"
                  >
                    {/* --- Text Content (Left Side) --- */}
                    <div className="w-3/5 p-6 sm:p-8 flex flex-col justify-center relative z-20">
                      {/* Subtitle */}
                      <p className="text-[10px] sm:text-xs text-amber-500 uppercase tracking-[0.2em] mb-2 font-medium">
                        Signature Collection
                      </p>

                      {/* Offer Title */}
                      <h4 className="font-serif text-xl sm:text-3xl text-white mb-4 leading-snug group-hover:text-amber-400 transition-colors duration-300">
                        {offer.name}
                      </h4>

                      {/* Elegant Discount Badge */}
                      <div>
                        <span className="inline-block border border-amber-500/50 bg-amber-500/10 text-amber-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-sm backdrop-blur-sm">
                          {offer.discount}
                        </span>
                      </div>
                    </div>

                    {/* --- Image Content (Right Side) --- */}
                    <div className="w-2/5 h-full relative overflow-hidden">
                      {/* Fade Gradient: Blends the left edge of the image into the black background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/40 to-transparent z-10 pointer-events-none" />

                      <img
                        src={
                          offer.image ||
                          "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800"
                        }
                        alt={offer.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Best Selling */}
            <section>
              <div className="flex items-center justify-between mb-8 border-b border-neutral-200 pb-4">
                <h3 className="text-2xl font-serif text-neutral-900 uppercase tracking-widest">
                  Best Selling
                </h3>
                <Link
                  to="/browse"
                  className="text-amber-600 text-xs font-semibold uppercase tracking-[0.2em] hover:text-amber-700 hover:underline transition-all"
                >
                  See All
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className="mt-15">
              <div className="flex items-center justify-between mb-8 border-b border-neutral-200 pb-4">
                <h3 className="text-2xl font-serif text-neutral-900 uppercase tracking-widest">
                  Categories
                </h3>
                {/* Categories filter */}
                <div className="flex gap-3 flex-wrap mb-6">
                  <button
                    onClick={() => setActiveCategory("ALL")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === "ALL"
                        ? "bg-[#53B175] text-white"
                        : "bg-white text-[#7C7C7C] border border-gray-200 hover:border-[#53B175]"
                    }`}
                  >
                    All
                  </button>

                  {categoryTabs.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.code)}
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all 
                        ${
                          activeCategory === cat.code
                            ? "bg-[#53B175] text-white"
                            : "bg-white text-[#7C7C7C] border border-gray-200 hover:border-[#53B175]"
                        }`}
                    >
                      {/* <span>{cat.emoji}</span> */}
                      {cat.name}
                      {/* {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-t-full"></span>
                  )} */}
                    </button>
                  ))}
                </div>
                <Link
                  to="/browse"
                  className="text-amber-600 text-xs font-semibold uppercase tracking-[0.2em] hover:text-amber-700 hover:underline transition-all"
                >
                  Discover More
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>

            {/* More products */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#181725]">
                  All Products
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Home;
