"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <motion.section
      className="max-w-4xl mx-auto px-6 py-12 text-center bg-white shadow-lg rounded-lg border"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        আমাদের সম্পর্কে
      </motion.h2>

      <motion.p
        className="text-lg text-gray-700 mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="font-semibold">মাশাআল্লাহ্ ট্রেডার্স</span> হলো একটি বিশ্বস্ত মুদি ব্যবসা প্রতিষ্ঠান, 
        যেখানে চাল, ডাল, চিনি সহ সকল প্রকার মুদি মালামাল পাইকারী ও খুচরা বিক্রয় করা হয়।  
        আমরা আমাদের গ্রাহকদের সেরা মানের পণ্য এবং সঠিক দামে পৌঁছে দেওয়ার প্রতিশ্রুতি দিচ্ছি।
      </motion.p>

      <motion.p
        className="text-md text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        আমাদের লক্ষ্য হল গ্রাহকদের সেবা দেওয়া এবং বাজারের চাহিদা অনুযায়ী পণ্য সরবরাহ করা।  
        আপনার বিশ্বাসই আমাদের অনুপ্রেরণা।  
      </motion.p>
    </motion.section>
    </main>
  );
}
