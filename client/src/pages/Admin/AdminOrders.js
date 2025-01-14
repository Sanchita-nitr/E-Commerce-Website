import { Select } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const AdminOrders = () => {
  const [statusOptions] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      // Validate the response to ensure it's an array
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Unexpected response format:", data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Ensure orders is reset to an empty array on error
    }
  };


  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  const handleStatusChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value });
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Admin | All Orders">
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <div className="md:w-1/4 bg-white shadow-md p-4">
          <AdminMenu />
        </div>

        {/* Orders Section */}
        <div className="md:w-3/4 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h1>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Order #{index + 1}
                  </h2>
                  <Select
                    defaultValue={order?.status}
                    className="w-48"
                    onChange={(value) => handleStatusChange(order._id, value)}
                  >
                    {statusOptions.map((status, idx) => (
                      <Option key={idx} value={status}>
                        {status}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Buyer:</span>{" "}
                      {order?.buyer?.name || "Anonymous"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Date:</span>{" "}
                      {moment(order?.createdAt).fromNow()}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Payment:</span>{" "}
                      {order?.payment.success ? (
                        <span className="text-green-600 font-semibold">
                          Success
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Failed
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Products:</span>{" "}
                      {order?.products?.length}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {order?.products?.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center border-b pb-4"
                    >
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <p className="font-medium text-gray-700">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {product.description.substring(0, 30)}...
                        </p>
                        <p className="text-gray-700">₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No orders available at the moment.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
