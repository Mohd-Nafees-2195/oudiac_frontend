import React, { useEffect } from "react";

const RazorpayCheckout = () => {
  // 1. Load the Razorpay script dynamically when the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script if the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 2. The function that triggers when the user clicks the button
  const handlePayment = () => {
    // Ensure the Razorpay script has finished loading
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits (₹500.00)
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_IluGWxBm9U8zJ8", // Pass the `id` obtained from your backend
      handler: function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
        alert("Signature: " + response.razorpay_signature);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);

    // Handle payment failures
    rzp1.on("payment.failed", function (response) {
      alert("Error Code: " + response.error.code);
      alert("Description: " + response.error.description);
      alert("Source: " + response.error.source);
      alert("Step: " + response.error.step);
      alert("Reason: " + response.error.reason);
      alert("Order ID: " + response.error.metadata.order_id);
      alert("Payment ID: " + response.error.metadata.payment_id);
    });

    // Open the checkout window
    rzp1.open();
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-[#3399cc] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default RazorpayCheckout;