"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  weight: number;
  weightUnit: string;
  mrp: number;
  traderPrice: number;
  image: string;
  expireDate: string;
}

export default function SingleProduct() {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  if (!product) return <p className="text-center mt-10 text-gray-600">No product found.</p>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 mt-10 bg-white/90 shadow-lg rounded-2xl backdrop-blur-md border border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col lg:flex-row justify-between items-center gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Product Image */}
        <motion.div
          className="w-full lg:w-1/2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <CldImage
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="rounded-lg w-full object-cover shadow-md"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="w-full lg:w-1/2 text-gray-800 space-y-3"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Weight:</strong> {product.weight} {product.weightUnit}
            </p>
            <p>
              <strong>MRP:</strong> <span className="text-red-500 font-bold">৳{product.mrp}</span>
            </p>
            <p>
              <strong>Trader Price:</strong> <span className="text-green-600 font-bold">৳{product.traderPrice}</span>
            </p>
            <p className="col-span-2">
              <strong>Expire Date:</strong> {new Date(product.expireDate).toLocaleDateString()}
            </p>
          </div>

          <motion.div
            className="mt-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Buy Now
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
