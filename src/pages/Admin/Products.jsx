import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Tag,
  CheckSquare,
  Image as ImageIcon,
} from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout"; // Adjust path based on your setup
import {Api} from "../API/Api";
import { filterByDate } from "../../components/Utils/StoreUtils";

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(false);

  const fetchProducts = async () => {
    setLoading(true)
    const page = 0;
    const size = 10;
    try {
      const response = await Api.get("/products/oudiac/get-products", {
        params: { page, size },
      });
      setProducts(response.data.content);
      console.log("Fetched products:", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Status Badge Logic
  const getStatusBadge = (status) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
            <Eye className="w-3 h-3" /> Published
          </span>
        );
      case "DRAFT":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center gap-1">
            <Edit className="w-3 h-3" /> Draft
          </span>
        );
      case "HIDDEN":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
            <EyeOff className="w-3 h-3" /> Hidden
          </span>
        );
      default:
        return null;
    }
  };

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "All" || product.productStatus === activeTab;
    return matchesSearch && matchesTab;
  });

  // Bulk Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((prodId) => prodId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <>
    {loading ? (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px]">
    <div className="rounded-2xl bg-white/95 p-8 shadow-2xl">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-4 text-center text-gray-600">
        Fetching flight data...
      </p>
    </div>
  </div>
):(<AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your storefront products, pricing, and visibility.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Export
          </button>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tabs & Search Header */}
        <div className="border-b border-gray-100">
          {/* Top Row: Search and Filters */}
          <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <Tag className="w-4 h-4" /> Category
              </button>
              <button className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Row: Tabs */}
          <div className="px-4 sm:px-6 flex items-center gap-6 text-sm font-medium">
            {["All", "PUBLISHED", "DRAFT", "HIDDEN"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 relative ${
                  activeTab === tab
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Actions Bar (Shows only when items are selected) */}
        {selectedProducts.length > 0 && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-800">
              {selectedProducts.length} product(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-semibold bg-white text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50">
                Mark as Draft
              </button>
              <button className="px-3 py-1.5 text-xs font-semibold bg-white text-red-600 border border-red-200 rounded-md hover:bg-red-50">
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                </th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                {/* <th className="px-6 py-4 font-medium">Pricing</th> */}
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date Added</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-white"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 text-sm hover:text-emerald-600 cursor-pointer">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            ID: {product.code.toString().padStart(5, "0")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        {product.category.name}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">
                          ₹{product.sellingPrice}
                        </span>
                        {product.sellingPrice > product.MRP && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.MRP}
                          </span>
                        )}
                      </div>
                    </td> */}
                    <td className="px-6 py-4">
                      {getStatusBadge(product.productStatus)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {filterByDate(product.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <CheckSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      No products found
                    </h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                      We couldn't find any products matching your current
                      filters. Try clearing your search or switching tabs.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setActiveTab("All");
                      }}
                      className="mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Dummy */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Showing {filteredProducts.length} entries
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
    </AdminLayout>)}
    </>
  );
};

export default Products;
