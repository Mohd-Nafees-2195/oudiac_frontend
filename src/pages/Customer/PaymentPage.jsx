import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLocation } from "react-router-dom";
import { CustomerApi } from "../API/Api";
import FuturisticLoader from "../../components/Admin/Layout/FuturisticLoader";

const PaymentPage = () => {
  // Mocking state that you would normally receive from React Router (useLocation) or an initial API call
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading,setLoading]=useState(false);

  const [paymentStatus, setPaymentStatus] = useState("PENDING"); // PENDING, SUCCESS, FAILED
  const [timeLeft, setTimeLeft] = useState(300); // 5-minute expiry timer for security
  const { state } = useLocation();
  const orderNumber=state.orderNumber;
  // 1. Countdown Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setPaymentStatus("FAILED");
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // 2. Real-World Polling Logic (Asks backend every 3 seconds if the webhook fired)
  useEffect(() => {
    if (paymentStatus !== "PENDING") return;
    
    const checkPaymentStatus = async () => {
      try {
        // In your real code, replace with your Axios instance:
        //For webhook
        // const response = await CustomerApi.get(`/orders/${paymentDetails.orderNumber}/status`);
        // if (response.data.status === "PAID") { setPaymentStatus("SUCCESS"); }
        
        // Simulating a successful payment verification after 15 seconds for visual testing
        if (timeLeft === 285) {
          setPaymentStatus("SUCCESS");
        }
      } catch (error) {
        console.error("Error checking order status:", error);
      }
    };

    const intervalId = setInterval(checkPaymentStatus, 3000); // Poll every 3 seconds
    return () => clearInterval(intervalId);
  }, [paymentStatus, timeLeft]);

  // Format countdown timer (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const fetchPaymentUrl= async ()=>{
    setLoading(true);
    const url=`/payment/oudiac/make-payment/${orderNumber}/pay/razorpay`;
    try{
        const response = await CustomerApi.get(url, { withCredentials: true} );
        setPaymentDetails(response.data);
        console.log(response.data.paymentUrl,"Payment Data");
    }catch (error) {
        console.error("Error to get payment url:", error.response.data);
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchPaymentUrl();
  },[])

  return (
    <>
      {loading?(<FuturisticLoader/>):(<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Brand Header */}
        <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wider">OUDIAC</h1>
            <p className="text-xs text-gray-400">Secure Payment Gateway</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Order ID</p>
            <p className="text-sm font-mono font-medium">{paymentDetails?paymentDetails.orderNumber:"NA"}</p>
          </div>
        </div>

        {/* Dynamic Content States */}
        <div className="p-8 flex flex-col items-center">
          
          {/* STATE 1: WAITING FOR PAYMENT */}
          {paymentStatus === "PENDING" && (
            <>
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Amount to Pay</p>
                <h2 className="text-4xl font-extrabold text-gray-900 mt-1">₹{paymentDetails?paymentDetails.amount.toFixed(2):0}</h2>
              </div>

              {/* Dynamic QR Code Container */}
              <div className="relative bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex items-center justify-center group">
                <QRCodeSVG
                  value={paymentDetails?paymentDetails.paymentUrl:"NA"}
                  size={220}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"} // High resilience layout
                  includeMargin={true}
                />
                
                {/* Subtle Luxury Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black m-2 rounded-tl"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black m-2 rounded-tr"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black m-2 rounded-bl"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black m-2 rounded-br"></div>
              </div>

              {/* Expiry Timer */}
              <div className="mt-5 flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-200/50">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                <p className="text-xs font-medium text-amber-800">
                  QR expires in <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </p>
              </div>

              <div className="mt-6 text-center space-y-2">
                <p className="text-sm font-semibold text-gray-800">Scan with any UPI App to pay</p>
                <div className="flex justify-center items-center gap-4 text-xs font-medium text-gray-400">
                  <span>PhonePe</span>
                  <span className="text-gray-300">•</span>
                  <span>Google Pay</span>
                  <span className="text-gray-300">•</span>
                  <span>Paytm</span>
                </div>
              </div>

              {/* Loading indicator representing active status checking */}
              <div className="mt-8 flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Awaiting secure verification from bank...</span>
              </div>
            </>
          )}

          {/* STATE 2: SUCCESS STATE */}
          {paymentStatus === "SUCCESS" && (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Payment Successful!</h3>
                <p className="text-sm text-gray-500 mt-1">Your order has been confirmed.</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between"><span className="text-gray-400">Amount:</span><span className="text-gray-900 font-bold">₹{paymentDetails.amount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Order:</span><span className="text-gray-900">{paymentDetails.orderNumber}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Status:</span><span className="text-emerald-600 font-bold">PAID</span></div>
              </div>
              <button 
                onClick={() => window.location.href = "/dashboard"} 
                className="w-full mt-4 bg-black text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-gray-900 transition-all"
              >
                Go to My Orders
              </button>
            </div>
          )}

          {/* STATE 3: TIMEOUT / FAILED STATE */}
          {paymentStatus === "FAILED" && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Session Expired</h3>
                <p className="text-sm text-gray-500 mt-1">For security reasons, this QR code has timed out.</p>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="w-full mt-4 bg-black text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-gray-900 transition-all"
              >
                Regenerate QR Code
              </button>
            </div>
          )}

        </div>

        {/* Footer Security Badge */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
          </svg>
          <span>PCI-DSS Compliant • 256-bit Encryption</span>
        </div>

      </div>
    </div>)}
    </>
  );
};

export default PaymentPage;
// import React, { useEffect, useState } from "react";
// import { QRCodeSVG } from "qrcode.react"; // Import the QR generator
// import { useLocation, useParams } from "react-router-dom";
// import { CustomerApi } from "../API/Api";
// import FuturisticLoader from "../../components/Admin/Layout/FuturisticLoader";

// const PaymentPage = () => {
//   const [selectedMethod, setSelectedMethod] = useState("UPI_QR");
//   const [upiIntentString,setUpiIntentString] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [qrLoading, setQrLoading]=useState(false);
//   const { state } = useLocation();
//   const orderNumber=state.orderNumber;
//   // Mock data (Replace with your actual order state)

// //   const orderNumber = "OUD-2026-DBE09";
  
//   // YOUR BUSINESS UPI ID

//   // Generate the dynamic UPI string
  

//     const fetchOrder = async () => {
//         setLoading(true);
//         setQrLoading(true);
//         const merchantUpiId = "7408514306@ybl"; 
//         const url=`/orders/oudiac/get/${orderNumber}`;
//         console.log(orderNumber,"Why undefine  ,",url);
        
    //    try {
        //  const response = await CustomerApi.get(
        //    url,
        //    { withCredentials: true}
        //  );
   
    //      // const managersData = await response.json();
    //     //  console.log("Fetched Category Tabs:", response.data);
    //      console.log(response.data,"In Payment");
    //      const upiString = `upi://pay?pa=${merchantUpiId}&pn=Oudiac%20Perfumes&tr=${orderNumber}&am=${response.data.totalPrice.toFixed(2)}&cu=INR`;
    //       setUpiIntentString(upiString);
    //    } catch (error) {
    //      console.error("Error fetching order :", error.response.data);
    //    }
//        setLoading(false)
//      };

//   useEffect(()=>{
//     fetchOrder();
//   },[]);

//   return (
//     <>
//   {loading ? (<FuturisticLoader/>) :(   <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Left Column: Payment Selection */}
//         <div className="md:col-span-2 space-y-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
//             <p className="mt-1 text-sm text-gray-500">Select how you want to pay.</p>
//           </div>

//           <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            
//             {/* UPI QR Option */}
//             <div
//               onClick={() => setSelectedMethod("UPI_QR")}
//               className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
//                 selectedMethod === "UPI_QR" ? "border-black bg-gray-50" : "border-gray-200"
//               }`}
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedMethod === "UPI_QR" ? "border-black" : "border-gray-300"}`}>
//                   {selectedMethod === "UPI_QR" && <span className="w-2 h-2 bg-black rounded-full" />}
//                 </div>
//                 <p className="font-medium text-gray-900">Pay via UPI QR Code</p>
//               </div>

//               {/* ONLY SHOW QR IF THIS METHOD IS SELECTED */}
//               {selectedMethod === "UPI_QR" && (
//                 <div className="flex flex-col items-center justify-center py-6 bg-white border border-dashed border-gray-300 rounded-lg">
//                   <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
//                     <QRCodeSVG 
//                       value={upiIntentString} 
//                       size={200} 
//                       bgColor={"#ffffff"}
//                       fgColor={"#000000"}
//                       level={"H"} // High error correction
//                     />
//                   </div>
//                   <p className="text-sm font-medium text-gray-900 mt-4">Scan with any UPI App</p>
//                   <p className="text-xs text-gray-500 mt-1 flex gap-2">
//                     <span>GPay</span> • <span>PhonePe</span> • <span>Paytm</span>
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Other Options (COD, Razorpay) would go here... */}

//           </div>
//         </div>

//         {/* Right Column: Order Summary (Same as before) */}
//         {/* ... */}
//       </div>
//     </div>)}
//     </>
//   );
// };

// export default PaymentPage;