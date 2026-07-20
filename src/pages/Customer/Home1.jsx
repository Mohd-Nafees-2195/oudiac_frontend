import React from "react";

import { dummyProducts } from "../../data/products";
import CustomerLayout from "../../components/Customer/CustomerLayout";
import ProductCard from "../../components/Customer/ProductCard";
import Bestsellers from "../../components/Customer/Bestsellers";

const Home1 = () => {
  return (
    <CustomerLayout>
      <Bestsellers />
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-sm">
        <h1 className="text-3xl sm:text-5xl font-black mb-4">
          Groceries delivered in 10 mins
        </h1>
        <p className="text-lg font-medium opacity-90">
          Get fresh produce, dairy, and snacks instantly.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Bestsellers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Home1;
