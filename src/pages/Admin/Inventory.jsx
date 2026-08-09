import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
  Box,
  ArrowDownToLine,
  Plus,
  MoreVertical,
  PackageX,
} from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout"; // Adjust path if using <Outlet/> pattern
import { Api } from "../API/Api";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [inventory, setInventory] = useState([]);
  const [total, setTotal] = useState({
    "Total Items": 0,
    "In Stock Items": 0,
    "Low Stock Items": 0,
    "Out of Stock Items": 0,
  });

  // Status Badge styling logic
  const getStatusStyle = (stock) => {
    const status = getStatus(stock);
    switch (status) {
      case "In Stock":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "Low Stock":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Out of Stock":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatus = (stock) => {
    if (stock == 0) return "Out of Stock";
    else if (stock <= 250) return "Low Stock";
    else return "In Stock";
  };
  const calculateTotals = (data) => {
    const newTotals = {
      "Total Items": data.length,
      "In Stock Items": 0,
      "Low Stock Items": 0,
      "Out of Stock Items": 0,
    };
    data.forEach((item) => {
      const status = getStatus(item.quantity);

      // 2. Increment the correct counter based on the status
      if (status === "In Stock") {
        newTotals["In Stock Items"]++;
      }
      // Catching both the correct spelling and the "stoxk" typo from your database!
      else if (status === "Out of Stock" || status === "out of stoxk") {
        newTotals["Out of Stock Items"]++;
      }
      // If you eventually add a "Low Stock" string to your status column
      else if (status === "Low Stock") {
        newTotals["Low Stock Items"]++;
      }
    });
    setTotal(newTotals);
  };

  // Filter Logic
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || getStatus(item.quantity) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // /products/oudiac/get-products
  const fetchProducts = async () => {
    const page = 0;
    const size = 10;
    try {
      const response = await Api.get("/products/oudiac/get-products", {
        params: { page, size },
      });
      const products = response.data.content;
      const list = products.flatMap((product) =>
        product.productVariants.map((variant) => ({
          name: product.name,
          brand: product.brand.name,
          category: product.category.name,
          imageUrl: product.imageUrl,

          price: variant.price,
          sellingPrice: variant.sellingPrice,
          quantity: variant.quantity,
          id: variant.id,
          mrp: variant.mrp,
          status: getStatus(variant.quantity),
          stock: variant.stock,
          sku: variant.sku,
          variantType: variant.variantType,
        })),
      );
      setInventory(list);
      calculateTotals(response.data.content);
      console.log("Fetched products:", response.data);
      // console.log("filtered Item :",filteredInventory);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your product stock levels across stores.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <ArrowDownToLine className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Inventory Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Box className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Total Products
          </p>
          <h4 className="text-2xl font-bold text-gray-900">
            {total["Total Items"]}
          </h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Box className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">In Stock</p>
          <h4 className="text-2xl font-bold text-gray-900">
            {total["In Stock Items"]}
          </h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-amber-400">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Low Stock Items
          </p>
          <h4 className="text-2xl font-bold text-gray-900">
            {total["Low Stock Items"]}
          </h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-red-400">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <PackageX className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Out of Stock</p>
          <h4 className="text-2xl font-bold text-gray-900">
            {total["Out of Stock Items"]}
          </h4>
        </div>
      </div>

      {/* Main Inventory Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters & Search */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
              {["All", "In Stock", "Low Stock", "Out of Stock"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
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

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">Product & SKU</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Variant</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.sku}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 text-sm">
                      ₹{item.sellingPrice}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 text-sm">
                      {item.variantType}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${item.stock === 0 ? "text-red-600" : "text-gray-900"}`}
                        >
                          {item.stock}
                        </span>
                        <span className="text-xs text-gray-400">units</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getStatusStyle(item.stock)}`}
                      >
                        {getStatus(item.stock)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <Box className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium text-gray-900">
                      No products found
                    </p>
                    <p className="text-sm mt-1">
                      Try adjusting your search or filter settings.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Dummy */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filteredInventory.length} of 1,248 products</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-emerald-50 text-emerald-600 font-medium border border-emerald-200 rounded-md">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Inventory;
