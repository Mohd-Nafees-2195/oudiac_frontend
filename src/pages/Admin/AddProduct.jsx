import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UploadCloud,
  Image as ImageIcon,
  X,
  Save,
} from "lucide-react";
import AdminLayout from "../../components/Admin/Layout/AdminLayout";
import { Api } from "../API/Api";
import toast from "react-hot-toast";
import FuturisticLoader from "../../components/Admin/Layout/FuturisticLoader";

const AddProduct = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  // Start with one default variant block
  const [variants, setVariants] = useState([
    { sellingPrice: "", MRP: "", variantType: "", stock: "" }
  ]);


  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productStatus: "DRAFT",
    categoryId: 0,
    brandId: 0,
    productTypeId: 0,
    fragranceFamily: "",
    storeId: 0,
  });

  // Dummy Image State for UI demonstration

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [images, setImages] = useState([]); // Preview URLs
  const [imageFiles, setImageFiles] = useState([]); // Actual files
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setImageFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...previews]);
  };
  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));

    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = new FormData();

    console.log("Nafees  ", formData);
    Object.keys(formData).forEach((key) => {
      // For standard fields (name, description, etc.)
      data.append(key, formData[key]);
    });

    // Loop through the array and append each property with an index
    console.log(variants);
    variants.forEach((variant, index) => {
      data.append(`productVariants[${index}].sellingPrice`, variant.sellingPrice);
      data.append(`productVariants[${index}].MRP`, variant.MRP);
      data.append(`productVariants[${index}].variantType`, variant.variantType);
      data.append(`productVariants[${index}].stock`, variant.stock);
    });

    imageFiles.forEach((file) => {
      data.append("images", file);
    });

    try {
      const response = await Api.post("/products/oudiac/add", data);

      console.log(response.data);
      toast("Product saved successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      setLoading(false)
      alert("Failed to save product.");
    }
  };

  const fetchStores = async () => {
    try {
      const response = await Api.get(
        "/stores/oudiac/get-stores",
      );

      // const managersData = await response.json();
      console.log("Fetched Stores:", response.data);
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching Stores:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await Api.get(
        "/category/oudiac/get-categories",
      );

      // const managersData = await response.json();
      console.log("Fetched Categories:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await Api.get(
        "/brand/oudiac/get-brands",
      );

      // const managersData = await response.json();
      console.log("Fetched Brands:", response.data);
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching Brands:", error);
    }
  };
  const fetchProductTypes = async () => {
    try {
      const response = await Api.get(
        "/product-type/oudiac/get-product-types",
      );

      // const managersData = await response.json();
      console.log("Fetched Product Types:", response.data);
      setProductTypes(response.data);
    } catch (error) {
      console.error("Error fetching Product Types:", error);
    }
  };


  // Handle input changes for a specific variant row
  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...variants];
    updatedVariants[index][name] = value;
    setVariants(updatedVariants);
  };

  // Add a new empty variant block to the bottom
  const addVariantBlock = () => {
    setVariants([
      ...variants,
      { sellingPrice: "", MRP: "", variantType: "", stock: "" }
    ]);
  };

  // Optional but highly recommended: Allow users to remove a block if they misclick
  const removeVariantBlock = (indexToRemove) => {
    setVariants(variants.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    fetchStores();
    fetchCategories();
    fetchBrands();
    fetchProductTypes();
  }, [])

  return (
    <>
      {(<AdminLayout>
        {loading && <FuturisticLoader />}
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  Add New Product
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Create a new product for your stores.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Discard
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Product
              </button>
            </div>
          </div>

          {/* Main Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Primary Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Info Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  General Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Amul Taaza Toned Milk"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write a brief description about the product..."
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="space-y-6">
                {variants.map((variant, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">

                    {/* Optional: Remove button for blocks added after the first one */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeVariantBlock(index)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}

                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                      Pricing {variants.length > 1 && `(Variant ${index + 1})`}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Selling Price (₹)
                        </label>
                        <input
                          type="number"
                          name="sellingPrice"
                          required
                          min="0"
                          step="0.01"
                          value={variant.sellingPrice}
                          onChange={(e) => handleVariantChange(index, e)}
                          placeholder="0.00"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          MRP (₹)
                        </label>
                        <input
                          type="number"
                          name="MRP"
                          min="0"
                          step="0.01"
                          value={variant.MRP}
                          onChange={(e) => handleVariantChange(index, e)}
                          placeholder="0.00"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-gray-800 mb-4 mt-4">
                      Inventory
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Variant (e.g., 100ml, 50ml)
                        </label>
                        <input
                          type="text"
                          name="variantType"
                          value={variant.variantType}
                          onChange={(e) => handleVariantChange(index, e)}
                          placeholder="e.g., 100ml, 50ml"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Quantity in Stock
                        </label>
                        <input
                          type="number"
                          name="stock"
                          required
                          min="0"
                          value={variant.stock}
                          onChange={(e) => handleVariantChange(index, e)}
                          placeholder="0"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Button to add a new grid */}
                <button
                  type="button"
                  onClick={addVariantBlock}
                  className="w-full py-3 border-2 border-dashed border-emerald-500 text-emerald-600 font-medium rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  + Add Another Variant
                </button>
              </div>

              {/* Inventory Card */}
              {/* <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Inventory
              </h2>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    SKU (Stock Keeping Unit)
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g., MILK-AMUL-1L"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm uppercase"
                  />
                </div>
            </div> */}
            </div>

            {/* Right Column: Organization & Media */}
            <div className="lg:col-span-1 space-y-6">
              {/* Product Media Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Product Media
                </h2>

                {/* Upload Box */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-sm font-medium text-emerald-600 mb-1">
                    Click to upload images
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </p>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
                      >
                        <img
                          src={img}
                          alt={`Preview ${idx}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-white/90 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Organization Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Organization
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Stores
                    </label>
                    <select
                      name="storeId"
                      required
                      value={formData.storeId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm appearance-none cursor-pointer"
                    >
                      <option value={0}>
                        Select Store
                      </option>
                      {
                        stores.map((store) => {
                          return (
                            <option key={store.id} value={store.id}>
                              {store.storeName}
                            </option>
                          );
                        })
                      }
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Category
                    </label>
                    <select
                      name="categoryId"
                      required
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm appearance-none cursor-pointer"
                    >
                      <option value={0}>
                        Select category
                      </option>
                      {
                        categories.map((category) => {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })
                      }
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Brand
                    </label>
                    <select
                      name="brandId"
                      required
                      value={formData.brandId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm appearance-none cursor-pointer"
                    >
                      <option value={0}>
                        Select brand
                      </option>
                      {
                        brands.map((brand) => {
                          return (
                            <option key={brand.id} value={brand.id}>
                              {brand.name}
                            </option>
                          );
                        })
                      }
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Product Type
                    </label>
                    <select
                      name="productTypeId"
                      required
                      value={formData.productTypeId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm appearance-none cursor-pointer"
                    >
                      <option value={0}>
                        Select product type
                      </option>
                      {
                        productTypes.map((productType) => {
                          return (
                            <option key={productType.id} value={productType.id}>
                              {productType.name}
                            </option>
                          );
                        })
                      }
                      {/* <option value="DAKHOON">Dakhoon</option>
                    <option value="BAKHOOR">Bakhoor</option> */}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Product Status
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="productStatus"
                          value="PUBLISHED"
                          checked={formData.productStatus === "PUBLISHED"}
                          onChange={handleChange}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">Published</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="productStatus"
                          value="DRAFT"
                          checked={formData.productStatus === "DRAFT"}
                          onChange={handleChange}
                          className="text-gray-600 focus:ring-gray-500"
                        />
                        <span className="text-sm text-gray-700">Draft</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </AdminLayout>)}
    </>
  );
};

export default AddProduct;
