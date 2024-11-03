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
  const [categories, setCategories] = useState<ICategory[]>([]); // Sample categories
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // State for selected category

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
          setCategories(response?.category);

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

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

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
          <div
            onClick={() => setSelectedCategory(null)} // Allow to show all products
            className={`inline-block py-2 px-4 rounded-lg mr-2 cursor-pointer transition duration-300 
              ${selectedCategory === null
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            All Products
          </div>
          {categories.map((category, index: number) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(category._id)} // Set selected category on click
              className={`inline-block py-2 px-4 rounded-lg mr-2 cursor-pointer transition duration-300 
                ${selectedCategory === category._id
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              {category?.name}
            </div>
          ))}

        </div>

        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-[90vh]">
          {filteredProducts.map((item) => (
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
