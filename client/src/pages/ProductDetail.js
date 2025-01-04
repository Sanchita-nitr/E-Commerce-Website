import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedImages, setRelatedImages] = useState([]);

  // Fetch a single product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product/${params.slug}`);
      setProduct(data?.product);
      setRelatedImages(data?.product?.relatedImages || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Images */}
          <div className="space-y-4">
            <div className="border rounded-lg shadow-md overflow-hidden">
              <img
                src={`/api/v1/products/get-product-photo/${product._id}`}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Additional Images */}
            <div className="grid grid-cols-3 gap-4">
              {relatedImages.map((img, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={img}
                    alt={`Related ${index + 1}`}
                    className="w-full h-28 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-2">Category: {product.category?.name}</p>
            <p className="text-gray-900 text-xl font-semibold mt-4">
              ₹{product.price}
            </p>
            <p className="text-gray-700 mt-6 leading-7">
              {product.description}
            </p>

            <button
              className="mt-6 py-3 px-6 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
