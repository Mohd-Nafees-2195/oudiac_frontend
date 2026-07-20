import { useState } from "react";
import { Link } from "react-router-dom"; // Note: Usually 'react-router-dom' in modern React
import { Search, Plus } from "lucide-react";
import Layout from "../../components/Customer/ui/Layout";
import { categories, products } from "../../data/customerData";
import { useApp } from "../../components/Customer/context/AppContext";

export default function BrowsePage() {
  // Removed <string | null>
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState("");
  const { addToCart } = useApp();

  const filtered = products.filter((p) => {
    const matchesCat = !activeCategory || p.category === activeCategory;
    const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#181725] mb-6">Browse</h2>

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
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeCategory === cat.id
                  ? "bg-[#53B175] text-white"
                  : "bg-white text-[#7C7C7C] border border-gray-200 hover:border-[#53B175]"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Category cards */}
        {!query && !activeCategory && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{ backgroundColor: cat.color }}
                className="rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-md transition-shadow text-center"
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="font-semibold text-[#181725] text-sm leading-tight">
                  {cat.name}
                </span>
              </button>
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
                  <Link to={`/product/${product.id}`}>
                    <div className="w-full h-24 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-4xl">
                      {product.emoji}
                    </div>
                    <p className="text-xs text-[#7C7C7C] mt-2">{product.unit}</p>
                    <p className="font-semibold text-[#181725] text-sm">
                      {product.name}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-[#181725]">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-8 h-8 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}