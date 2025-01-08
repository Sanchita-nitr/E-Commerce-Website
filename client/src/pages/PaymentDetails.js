// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout/Layout";
// import DropIn from "braintree-web-drop-in-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/auth";
// import { useCart } from "../context/cart";
// import toast from "react-hot-toast";

// const PaymentDetails = () => {
//   const [clientToken, setClientToken] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isTestMode, setIsTestMode] = useState(true); // Toggle test mode
//   const [auth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [cardDetails, setCardDetails] = useState({
//     cardholderName: "",
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//   });
//   const navigate = useNavigate();

//   // Calculate total price
//   const totalPrice = cart.reduce(
//     (acc, product) => acc + product.price * product.quantity,
//     0
//   );

//   // Fetch client token for Braintree
//   useEffect(() => {
//     if (!isTestMode) {
//       // Only fetch token in real mode
//       const getToken = async () => {
//         try {
//           const response = await fetch("/api/v1/payment/braintree-token");
//           const data = await response.json();
//           setClientToken(data.clientToken);
//         } catch (error) {
//           console.error("Error fetching Braintree token:", error);
//           toast.error("Failed to initialize payment. Please try again.");
//         }
//       };
//       getToken();
//     }
//   }, [isTestMode]);

//   // Handle payment
//   const handlePayment = async () => {
//     setLoading(true);
//     if (isTestMode) {
//       // Simulate payment success in test mode
//       setTimeout(() => {
//         toast.success("Test Payment Successful! Thank you for your purchase.");
//         setCart([]); // Clear the cart after successful payment
//         navigate("/dashboard/user/orders");
//         setLoading(false);
//       }, 1000); // Simulate processing delay
//     } else {
//       try {
//         const { nonce } = await this.instance.requestPaymentMethod();
//         const response = await fetch("/api/v1/payment/braintree-payment", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ nonce, cart }),
//         });
//         const data = await response.json();
//         if (data.success) {
//           toast.success("Payment successful! Thank you for your purchase.");
//           setCart([]); // Clear the cart after successful payment
//           navigate("/dashboard/user/orders");
//         } else {
//           toast.error("Payment failed. Please try again.");
//         }
//       } catch (error) {
//         console.error("Payment error:", error);
//         toast.error("Something went wrong during payment. Please try again.");
//       }
//       setLoading(false);
//     }
//   };

//   // Handle card details input
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Validation for specific fields
//     if (name === "cvv" && value.length > 3) return; // Restrict CVV to 3 digits
//     if (name === "expiryDate" && !/^\d{0,2}\/?\d{0,2}$/.test(value)) return; // Allow only MM/YY format

//     setCardDetails({ ...cardDetails, [name]: value });
//   };

//   return (
//     <Layout title="Payment - E-Commerce">
//       <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Payment Summary */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">
//             Payment Summary
//           </h1>
//           <div className="text-lg text-gray-700">
//             <p className="mb-4">Total Items: {cart.length}</p>
//             <p className="font-bold">Total Price: ₹{totalPrice.toFixed(2)}</p>
//           </div>
//         </div>


//            {/* Card Details & DropIn */}
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">
//         Enter Card Details
//       </h1>
//       <form className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">
//             Cardholder Name
//           </label>
//           <input
//             type="text"
//             name="cardholderName"
//             value={cardDetails.cardholderName}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder=""
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">
//             Card Number
//           </label>
//           <input
//             type="text"
//             name="cardNumber"
//             value={cardDetails.cardNumber}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="1234 5678 9012 3456"
//           />
//         </div>
//         <div className="flex space-x-4">
//           <div className="flex-1">
//             <label className="block text-gray-700 font-medium mb-2">
//               Expiry Date
//             </label>
//             <input
//               type="text"
//               name="expiryDate"
//               value={cardDetails.expiryDate}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="MM/YY"
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block text-gray-700 font-medium mb-2">
//               CVV
//             </label>
//             <input
//               type="text"
//               name="cvv"
//               value={cardDetails.cvv}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="123"
//             />
//           </div>
//         </div>
//       </form>
//       {!isTestMode && clientToken && (
//         <div className="mt-6">
//           <DropIn
//             options={{ authorization: clientToken }}
//             onInstance={(instance) => (this.instance = instance)}
//           />
//         </div>
//       )}
//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className={`w-full py-3 px-4 ${
//           loading
//             ? "bg-gray-300 cursor-not-allowed"
//             : "bg-blue-500 hover:bg-blue-600"
//         } text-white rounded-md transition mt-4`}
//       >
//         {loading ? "Processing..." : "Make Payment"}
//       </button>
//       <div className="mt-4 text-sm text-gray-600">
//         {isTestMode
//           ? "You are in Test Mode. Any details entered will simulate a successful payment."
//           : "Payment will be processed through Braintree."}
//       </div>
//     </div>
//   </div>
// </Layout>
//   );
// };

// export default PaymentDetails;
// PaymentDetails.js
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Layout from "./../components/Layout/Layout";

const PaymentDetails = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.error("Error fetching client token", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/products/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.error("Payment error", error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart Summary</h2>
        <p className="text-gray-600 mb-6">Review your cart and proceed to payment.</p>
        <hr className="border-gray-300 mb-4" />
        <h4 className="text-xl font-semibold text-gray-800 mb-6">Total: {totalPrice()}</h4>

        {auth?.user?.address ? (
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Current Address</h4>
            <p className="text-gray-600">{auth?.user?.address}</p>
            <button
              className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Update Address
            </button>
          </div>
        ) : (
          <div className="mb-6">
            {auth?.token ? (
              <button
                className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Please Login to Checkout
              </button>
            )}
          </div>
        )}

        <div className="mt-4">
          {!clientToken || !auth?.token || !cart?.length ? (
            <p className="text-gray-600">No items in cart or authentication required.</p>
          ) : (
            <div className="mt-6">
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />

              <button
                className="mt-4 w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user?.address}
              >
                {loading ? "Processing ...." : "Make Payment"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PaymentDetails;