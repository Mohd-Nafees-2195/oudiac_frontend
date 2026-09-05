import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Note: Usually 'react-router-dom' in modern React
import { Search, Plus } from "lucide-react";
import Layout from "../../components/Customer/ui/Layout";
// import { products } from "../../data/customerData";
import { useApp } from "../../components/Customer/context/AppContext";
import { CustomerApi } from "../API/Api";
import ProductCard from "../../components/Customer/ProductCard";

export default function BrowsePage() {
  const categories = [
    {
      id: 1,
      name: "perfume",
      color: "#F7F8F3",
    },
    {
      id: 2,
      name: "Attar",
      emoji: "🫙",
      color: "#FFF8F0",
    },
    { id: 3, name: "Dahkoon", emoji: "🍗", color: "#FFF0F0" },
    { id: 4, name: "Bhakhoor", emoji: "🍞", color: "#FFFBF0" },
    { id: 5, name: "Pure Oud", emoji: "🥛", color: "#F0F8FF" },
    { id: 6, name: "Mix", emoji: "🧃", color: "#F5F0FF" },
  ];
  // Removed <string | null>
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const { addToCart } = useApp();

  const filtered = products.filter((p) => {
    if (activeCategory && query) {
      return products;
    }
    const matchesCat =
      !activeCategory ||
      p.name.toLocaleLowerCase().includes(activeCategory.toLocaleLowerCase());
    const matchesQuery =
      !query || p.name.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const fetchProducts = async () => {
    // setLoading(true);
    const page = 0;
    const size = 50;
    try {
      const response = await CustomerApi.get("/products/public/getall", {
        params: { page, size },
      });
      setProducts(response.data.content);
      // setCategories(response.data.content);
      console.log("Fetched products:", response.data.content);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    // setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#181725] mb-6">
          Find Your Perfect Match
        </h2>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 mb-6 border border-gray-100 shadow-sm">
          <Search size={18} className="text-[#7C7C7C]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search store..."
            className="bg-transparent outline-none flex-1 text-[#181725] placeholder:text-[#7C7C7C] text-sm"
          />
        </div>

        {/* Categories filter */}
        <div className="flex gap-3 flex-wrap mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeCategory
                ? "bg-[#53B175] text-white"
                : "bg-white text-[#7C7C7C] border border-gray-200 hover:border-[#53B175]"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategory(cat.name === activeCategory ? null : cat.name)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeCategory === cat.name
                  ? "bg-[#53B175] text-white"
                  : "bg-white text-[#7C7C7C] border border-gray-200 hover:border-[#53B175]"
              }`}
            >
              {/* <span>{cat.emoji}</span> */}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category cards */}
        {!query && !activeCategory && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Products grid */}
        {(query || activeCategory) && (
          <>
            <p className="text-sm text-[#7C7C7C] mb-4">
              {filtered.length} products found
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  {/* <Link to={`/product/${product.id}`}>
                    <div className="w-full h-24 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-4xl">
                      {product.emoji}
                    </div>
                    <p className="text-xs text-[#7C7C7C] mt-2">
                      {product.unit}
                    </p>
                    <p className="font-semibold text-[#181725] text-sm">
                      {product.name}
                    </p>
                  </Link> */}
                  {/* <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-[#181725]">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-8 h-8 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div> */}
                  <ProductCard key={product.id} product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
