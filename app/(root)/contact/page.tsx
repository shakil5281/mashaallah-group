"use client";

import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
          <motion.section
      className="max-w-3xl mx-auto px-6 py-12 text-center bg-white shadow-lg rounded-lg border"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        মাশাআল্লাহ্ ট্রেডার্স
      </motion.h2>

      <motion.p
        className="text-lg text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="font-medium">প্রোঃ মোঃ তৌহিদুল ইসলাম</span>
      </motion.p>

      <motion.p
        className="text-md text-gray-700 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        এখানে চাল, ডাল, চিনি সহ সকল প্রকার মুদি মালামাল পাইকারী ও খুচরা বিক্রয় করা হয়।
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-800 text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <a
          href="tel:01681291736"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          <FaPhoneAlt /> 01681-291736
        </a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=24.0870358,90.3459346"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          <FaMapMarkerAlt /> Location
        </a>
      </motion.div>
    </motion.section>
    </main>
  );
}
