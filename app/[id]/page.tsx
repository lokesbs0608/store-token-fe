"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "../component/productCard"; // Importing the ProductCard component
import { getStoreProduct } from "@/utils/products";

const StoreProducts = () => {
  const { id } = useParams(); // Extract the store ID from URL params
  const [store, setStore] = useState<IStore>(); // State for store details
  const [products, setProducts] = useState<IProduct[]>([]); // State for product list
  const [loading, setLoading] = useState(true); // State for loading
  const categories = ["Fruits", "Vegetables", "Dairy", "Beverages", "Snacks", "Bakery"]; // Sample categories

  useEffect(() => {
    // Fetch store details and products
    const fetchStoreDetails = async () => {
      if (id) {
        setLoading(true); // Set loading to true before fetch
        try {
          // Await the response from the API call
          const response = await getStoreProduct(id);

          // Assuming response contains store data and products
          setStore(response.store); // Set store details
          setProducts(response.products); // Set products list

          console.log("Fetched store details:", response);
        } catch (error) {
          console.log("Failed to fetch store details:", error);
        } finally {
          setLoading(false); // Set loading to false after fetch completes
        }
      }
    };

    fetchStoreDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>; // Show loading state
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 flex-grow">
        {store && (
          <div className="mb-8 sticky top-0 left-0 z-10">
            <h1 className="text-2xl font-bold">{store?.storeName}</h1>
            <p className="text-gray-600">{store?.address}</p>
          </div>
        )}
  {/* Horizontal Scrollable Categories */}
  <div className="overflow-x-auto whitespace-nowrap mb-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="inline-block bg-black text-white py-2 px-4 rounded-lg mr-2 cursor-pointer hover:bg-gray-700 transition duration-300"
            >
              {category}
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-[90vh]">
          {products.map((item) => (
            <ProductCard key={item?._id} product={item} />
          ))}
            {products.map((item) => (
            <ProductCard key={item?._id} product={item} />
          ))}
            {products.map((item) => (
            <ProductCard key={item?._id} product={item} />
          ))}
              {products.map((item) => (
            <ProductCard key={item?._id} product={item} />
          ))}
            {products.map((item) => (
            <ProductCard key={item?._id} product={item} />
          ))}
            {products.map((item) => (
            <ProductCard key={item?._id} product={item} />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 p-4 bg-white dark:bg-gray-800 shadow-lg">
        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300">
          Continue to payment
        </button>
      </div>
    </div>
  );
};

export default StoreProducts;
