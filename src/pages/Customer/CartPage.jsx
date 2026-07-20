import { Link, useNavigate } from "react-router";
import { Plus, Minus, Trash2, ShoppingCart, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "../../components/Customer/context/AppContext";
import Layout from "../../components/Customer/ui/Layout";
import { CustomerApi } from "../API/Api";
import toast from "react-hot-toast";
import AddressSelection from "../../components/Customer/popups/AddressSelection";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [address,setAddress]=useState([]);
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const delivery = cartTotal > 0 ? 0 : 0;
  const total = cartTotal - discount + delivery;

  const placeOrder = async () => {
    // console.log(cart);
    // console.log(cartTotal);

    try {
      // 1. Generate a unique key for this specific checkout attempt
      const idempotencyKey = crypto.randomUUID();
      // console.log(idempotencyKey,"kkkkkkkkkkkk");
      // 2. Send it in the headers alongside your data and credentials
      // console.log(selectedAddressId,"Print jkcndsk c");
      const orderPayload = {
        addressId:selectedAddressId,
        items: cart.map(item => ({
          productId: item.product.id,
          variantId: item.variant.id,
          quantity: item.quantity
        }))
    };

    console.log(orderPayload,"PayLoad");

      const response = await CustomerApi.post("/orders/oudiac/place_order", orderPayload, {
        headers: {
          "Idempotency-Key": idempotencyKey // Custom header
        },
        withCredentials: true
      });

     //Here we are having OrderIf From Razorpy
      handlePayment(response.data);

      toast.success("Order placed successfully!");
      // console.log(response.data);
      // navigate("/payment", {  state: {orderNumber: response.data.orderNumber}})
    } catch (error) {
      // Handle error.
      toast.error("Failed to order!!")
    }
  }

  const fetchAddress= async ()=>{
    try{
       const response = await CustomerApi.get("/users/oudiac/get-address",  { withCredentials: true });

       setAddress(response.data);
        // console.log("jnkj",response.data);
       if(response.data.length===0){
         toast("Please add shipping address first!!");
       }
    }catch (error) {
      // Handle error..
      //create order and add payment methode as well , start here.
      //  navigate("/order-confirmed")
      toast.error("No Shipping Address Found,Please Add Shipping Address First")
    }
  }

  useEffect(()=>{
    fetchAddress();
  },[]);

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
    const handlePayment = (data) => {
      // Ensure the Razorpay script has finished loading
      //  console.log(data,"Me saasa");
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
  
      const options = {
        key: "rzp_test_TBmLd1TkRzAgwr", // Enter the Key ID generated from the Dashboard
        amount: data.totalAmount,//data.totalPrice*100, // Amount is in currency subunits (₹500.00)
        currency: "INR",
        name: "Oudiac",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.orderId, // Pass the `id` obtained from your backend
        handler: function (response) {
          toast.success("Payment ID: " + response.razorpay_payment_id);
          // alert("Order ID: " + response.razorpay_order_id);
          // alert("Signature: " + response.razorpay_signature);
          navigate("/payment-status",{state:"success",data:response});
        },
        prefill: {
          name: "Mohd Nafees",
          email: "mohdnafees2195@gmail.com",
          contact: "9946372839",
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
        toast.error("Error Code: " + response.error.code);
        navigate("/payment-status",{state:"failed",data:response.error});
        // alert("Description: " + response.error.description);
        // alert("Source: " + response.error.source);
        // alert("Step: " + response.error.step);
        // alert("Reason: " + response.error.reason);
        // alert("Order ID: " + response.error.metadata.order_id);
        // alert("Payment ID: " + response.error.metadata.payment_id);
      });
  
      // Open the checkout window
      rzp1.open();
    };

  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#181725] mb-6">My Cart</h2>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-[#F2F3F2] rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={36} className="text-[#7C7C7C]" />
            </div>
            <h3 className="text-xl font-bold text-[#181725] mb-2">Your cart is empty</h3>
            <p className="text-[#7C7C7C] mb-6">Add some products to get started</p>
            <Link to="/home" className="bg-[#53B175] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#3d9a5f] transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {/* Items list */}
            <div className="col-span-2 space-y-3">
              {cart.map(({ product, variant, quantity }) => (
                <div key={`${product.id}-${variant.variantType}`} className="bg-white rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-3xl shrink-0">
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
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#181725] truncate">{product.name}</p>
                    {/* Read directly from the variant object */}
                    <p className="text-xs text-[#7C7C7C]">{variant.variantType}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      // Pass the variantType to updateQty
                      onClick={() => updateQty(product.id, variant.variantType, quantity - 1)}
                      className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center text-[#7C7C7C] hover:border-[#53B175] hover:text-[#53B175] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold text-[#181725]">{quantity}</span>
                    <button
                      // Pass the variantType to updateQty
                      onClick={() => updateQty(product.id, variant.variantType, quantity + 1)}
                      className="w-8 h-8 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right min-w-[64px]">
                    {/* Calculate price using the variant's sellingPrice */}
                    <p className="font-bold text-[#181725]">₹{(variant.sellingPrice * quantity).toFixed(2)}</p>
                  </div>
                  <button
                    // Pass the variantType to removeFromCart
                    onClick={() => removeFromCart(product.id, variant.variantType)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold text-[#181725] mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7C7C7C]">Subtotal</span>
                    <span className="font-medium text-[#181725]">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#53B175]">
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#7C7C7C]">Delivery</span>
                    <span className="font-medium text-[#181725]">₹{delivery.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-[#181725]">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo */}
                <div className="flex gap-2 mb-5">
                  <div className="flex-1 flex items-center gap-2 bg-[#F2F3F2] rounded-xl px-3 py-2.5">
                    <Tag size={14} className="text-[#7C7C7C]" />
                    <input
                      value={promo}
                      onChange={e => setPromo(e.target.value)}
                      placeholder="Promo code"
                      className="bg-transparent outline-none text-sm flex-1 text-[#181725] placeholder:text-[#7C7C7C]"
                    />
                  </div>
                  <button
                    onClick={() => { if (promo) setPromoApplied(true); }}
                    className="bg-[#53B175] text-white px-4 rounded-xl text-sm font-medium hover:bg-[#3d9a5f] transition-colors"
                  >
                    Apply
                  </button>
                </div>

                <button
                  onClick={placeOrder}
                  className="w-full bg-[#53B175] text-white py-4 rounded-2xl font-semibold text-base hover:bg-[#3d9a5f] transition-colors"
                >
                  Place Order — ₹{total.toFixed(2)}
                </button>
              </div>      
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


              {/* Delivery info */}
              <div className="bg-white rounded-2xl p-5">
                <h4 className="font-semibold text-[#181725] mb-3 text-sm">Delivery Details</h4>
                <div className="space-y-2 text-xs text-[#7C7C7C]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#53B175] rounded-full" />
                    Express delivery
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#53B175] rounded-full" />
                    Free delivery on orders
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#53B175] rounded-full" />
                    Track your order in real-time
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}