import React from "react";
import { Plus, Minus, Star } from "lucide-react";
import { useCart } from "./CartContext";
import { useApp } from "./context/AppContext";
import { Link } from "react-router-dom";
// import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useApp();
  const rating = product.rating || 4.8;
  const reviews = product.reviews || 124;
  const description =
    product.description ||
    "A captivating blend of rare woods, warm amber, and delicate florals, creating an unforgettable signature scent.";

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-neutral-100 h-full">
      {/* --- Image Section --- */}
      <Link
        to={`/product/${product.id}/${product.category.id}`}
        state={{ product }}
        className="block relative aspect-[4/5] bg-neutral-50 overflow-hidden shrink-0"
      >
        <img
          src={
            product.imageUrl ||
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800"
          }
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badge */}
        {/* {product.badge && (
          <span className="absolute top-4 left-4 bg-neutral-900 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">
            {product.badge}
          </span>
        )} */}

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Link>

      {/* --- Details Section --- */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category & Unit */}
        <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-1.5">
          {product.category.name || "Fragrance"} •{" "}
          {(product.productVariants.length > 0 &&
            product.productVariants?.[0]?.variantType) ||
            "100ml"}
        </p>

        {/* Product Name */}
        <Link
          to={`/product/${product.id}/${product.category.id}`}
          state={{ product }}
        >
          <h3 className="font-serif text-xl text-neutral-900 truncate group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* --- Rating & Reviews --- */}
        <div className="flex items-center gap-1.5 mt-2 mb-3">
          <div className="flex items-center gap-0.5 text-amber-500">
            {/* Renders 5 stars, filling them based on the rating */}
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(rating)
                    ? "fill-amber-500"
                    : "fill-neutral-200 text-neutral-200"
                }
              />
            ))}
          </div>
          <span className="text-xs font-medium text-neutral-700 ml-1">
            {rating}
          </span>
          <span className="text-xs text-neutral-400">({reviews})</span>
        </div>

        {/* --- Description --- */}
        {/* line-clamp-2 ensures it only takes up 2 lines maximum, keeping cards the same height */}
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-6">
          {description}
        </p>

        {/* --- Price & Action Button --- */}
        {/* mt-auto forces this block to the absolute bottom of the card, aligning perfectly with other cards */}
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-neutral-100">
          <div className="flex flex-col">
            {product.productVariants.length > 0 && (
              <span className="text-xs text-neutral-400 line-through mb-0.5">
                ₹{product.productVariants?.[0]?.mrp || 0}
              </span>
            )}
            {product.productVariants.length > 0 && (
              <span className="font-medium text-lg text-neutral-900">
                ₹{product.productVariants?.[0]?.sellingPrice || 0}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.productVariants?.[0], 1);
              toast.success(
                `${product.name} (${product.productVariants?.[0]?.variantType}) added!`,
              );
            }}
            className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-white hover:bg-amber-600 hover:scale-110 transition-all duration-300 shadow-md shrink-0"
            aria-label="Add to cart"
          >
            <Plus size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
