import React, { createContext, useContext, useState } from "react";
// Removed CartItem as it was likely a TypeScript type. 
// Keep 'products' if you plan to use it in this file later.
// import { products } from "../../data/customerData";

const AppCtx = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [myList, setMyList] = useState([]);

  const addToCart = (product, selectedVariant, qty) => {
  setCart((prev) => {
    // 1. Check if this EXACT product + variant combo is already in the cart
    const existing = prev.find(
      (i) => i.product.id === product.id && i.variant.variantType === selectedVariant.variantType
    );

    if (existing) {
      // 2. If it exists, increase the quantity of ONLY that specific variant
      return prev.map((i) =>
        i.product.id === product.id && i.variant.variantType === selectedVariant.variantType
          ? { ...i, quantity: i.quantity + qty }
          : i
      );
    }
    
    // 3. If it's a new variant (or new product entirely), add it as a new row
    return [...prev, { product: product, variant: selectedVariant, quantity: qty }];
  });
};

  // const addToCart = (product) => {
  //   setCart((prev) => {
  //     const existing = prev.find((i) => i.product.id === product.id);
  //     if (existing) {
  //       return prev.map((i) =>
  //         i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
  //       );
  //     }
  //     return [...prev, { product, quantity: 1 }];
  //   });
  // };

  // const removeFromCart = (id) => {
  //   setCart((prev) => prev.filter((i) => i.product.id !== id));
  // };

  // const updateQty = (id, qty) => {
  //   if (qty <= 0) {
  //     removeFromCart(id);
  //   } else {
  //     setCart((prev) =>
  //       prev.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i))
  //     );
  //   }
  // };
  const removeFromCart = (productId, variantType) => {
    setCart((prev) => 
      // Keep items where either the product ID or the variant type does NOT match
      prev.filter((i) => !(i.product.id === productId && i.variant.variantType === variantType))
    );
  };

  const updateQty = (productId, variantType, qty) => {
    if (qty <= 0) {
      removeFromCart(productId, variantType);
    } else {
      setCart((prev) =>
        prev.map((i) =>
          // Match EXACTLY on both product ID and variant type
          i.product.id === productId && i.variant.variantType === variantType
            ? { ...i, quantity: qty }
            : i
        )
      );
    }
  };

  const toggleMyList = (product) => {
    setMyList((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  // const cartTotal = cart.reduce(
  //   (sum, i) => sum + i.product.sellingPrice * i.quantity,
  //   0
  // );
  
  // const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce(
    // CHANGED: i.product.sellingPrice is now i.variant.sellingPrice
    (sum, i) => sum + i.variant.sellingPrice * i.quantity,
    0
  );
  
  // UNCHANGED: This still works perfectly because it just counts total rows/quantities
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppCtx.Provider
      value={{
        cart,
        myList,
        addToCart,
        removeFromCart,
        updateQty,
        toggleMyList,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export const useApp = () => useContext(AppCtx);