// // Orders.js
// import axios from 'axios';
// import moment from "moment";
// import React, { useEffect, useState } from 'react';
// import Layout from '../../components/Layout/Layout';
// import UserMenu from '../../components/Layout/UserMenu';
// import { useAuth } from '../../context/auth';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();

//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/auth/orders");
//       setOrders(data);
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);


//   // // const [products, setProducts] = useState([]);

//   // const getAllProducts = async () => {
//   //     try {
//   //         const { data } = await axios.get('/api/v1/products/get-product');
//   //         console.log('Fetched Products:', data.products);
//   //         setProducts(data.products);
//   //     } catch (error) {
//   //         console.log(error);
//   //         toast.error('Something went wrong');
//   //     }
//   // };

//   // useEffect(() => {
//   //     getAllProducts();
//   // }, []);

//   return (
//     <Layout title={'Dashboard - Orders'}>
//       <div className="flex flex-col sm:flex-row min-h-screen">
//         <div className="bg-gray-100 min-w-max">
//           <UserMenu />
//         </div>
//         <div className="w-full p-4 md:p-6">
//           <div className="bg-white p-4 md:p-6 shadow rounded-md">
//             <h1 className="text-2xl font-bold mb-4">Orders</h1>
//             {JSON.stringify(orders, null, 4)}

//             {orders?.map((o, i) => {
//               return (
//                 <div className="border shadow">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Buyer</th>
//                         <th scope="col"> date</th>
//                         <th scope="col">Payment</th>
//                         <th scope="col">Quantity</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>{i + 1}</td>

//                         <td>{o?.buyer?.name}</td>
//                         <td>{moment(o?.createAt).fromNow()}</td>
//                         <td>{o?.payment.success ? "Success" : "Failed"}</td>
//                         <td>{o?.products?.length}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <div className="container">
//                     {o?.products?.map((p, i) => (
//                       <div className="row mb-2 p-3 card flex-row" key={p._id}>
//                         <div className="col-md-4">
//                           <img
//                             src={`/api/v1/product/product-photo/${p._id}`}
//                             className="card-img-top"
//                             alt={p.name}
//                             width="100px"
//                             height={"100px"}
//                           />
//                         </div>
//                         <div className="col-md-8">
//                           <p>{p.name}</p>
//                           <p>{p.description.substring(0, 30)}</p>
//                           <p>Price : {p.price}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Orders;
import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/products/orders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-6">
        <div className="md:w-1/4 bg-white rounded-lg shadow-lg p-4">
          <UserMenu />
        </div>
        <div className="md:w-3/4 p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            All Orders
          </h1>
          {JSON.stringify(orders, null, 4)}
          {orders?.length > 0 ? (
            orders.map((o, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg mb-6 p-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Order #{i + 1}
                </h2>
                <table className="table-auto w-full mt-4 mb-6">
                  <thead className="bg-gray-200 text-gray-600 text-left">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Buyer</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Payment</th>
                      <th className="p-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-700">
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2 capitalize">{o?.status}</td>
                      <td className="p-2">{o?.buyer?.name || "Anonymous"}</td>
                      <td className="p-2">
                        {moment(o?.createAt).fromNow()}
                      </td>
                      <td className="p-2">
                        {o?.payment.success ? (
                          <span className="text-green-500 font-semibold">
                            Success
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="p-2">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                <div>
                  {o?.products?.map((p, index) => (
                    <div
                      key={p._id}
                      className="flex items-center border-b pb-4 mb-4"
                    >
                      <img
                        src={`/api/v1/products/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {p.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {p.description.substring(0, 30)}...
                        </p>
                        <p className="text-gray-700 font-medium">
                          Price: ₹{p.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No orders found. Start shopping!
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
