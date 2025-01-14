
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