import React, { useState } from "react";

const AddressSelection = ({ address }) => {
  // 1. State to track the ID of the selected address
  // You might want to default this to address[0]?.id if you want the first one pre-selected

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h4 className="font-semibold text-[#181725] mb-4 text-sm">
        Select Shipping Address
      </h4>
      
      <div className="space-y-3">
        {address.map((adr) => {
          // 2. Check if this specific address is the one currently selected
          const isSelected = selectedAddressId === adr.id;

          return (
            <div
              key={adr.id}
              onClick={() => setSelectedAddressId(adr.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                isSelected
                  ? "border-[#53B175] bg-[#53B175]/10 shadow-sm" // Active State
                  : "border-gray-200 hover:border-gray-300 bg-white" // Inactive State
              }`}
            >
              {/* 3. Custom Radio Button UI */}
              <div
                className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "border-[#53B175]" : "border-gray-300"
                }`}
              >
                {/* The inner dot only shows if selected */}
                {isSelected && (
                  <span className="w-2 h-2 bg-[#53B175] rounded-full" />
                )}
              </div>

              {/* 4. Address Details (Expanded to show full details clearly) */}
              <div className="flex-1 text-sm">
                <p
                  className={`font-medium mb-1 ${
                    isSelected ? "text-[#181725]" : "text-gray-700"
                  }`}
                >
                  {adr.fullName || "Delivery Address"}
                </p>
                <p className="text-xs text-[#7C7C7C] leading-relaxed">
                  {adr.shippingAddress}, {adr.city} - {adr.pinCode}
                </p>
                <p className="text-xs text-[#7C7C7C] mt-1">
                  Phone: {adr.phoneNumber}
                </p>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddressSelection;