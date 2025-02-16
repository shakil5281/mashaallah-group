"use client";

import { motion } from "framer-motion";
import { FaBoxOpen, FaTruck, FaShoppingCart } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaBoxOpen className="text-4xl text-blue-500" />,
    title: "পাইকারি বিক্রয়",
    description: "সকল প্রকার মুদি মালামাল পাইকারী দামে পাওয়া যায়।",
  },
  {
    id: 2,
    icon: <FaShoppingCart className="text-4xl text-green-500" />,
    title: "খুচরা বিক্রয়",
    description: "সেরা দামে খুচরা মুদি মালামাল বিক্রয় করা হয়।",
  },
  {
    id: 3,
    icon: <FaTruck className="text-4xl text-red-500" />,
    title: "ডেলিভারি সার্ভিস",
    description: "স্থানীয় এলাকায় দ্রুত ডেলিভারি সুবিধা।",
  },
];

const Service = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">


      <motion.section
        className="max-w-5xl mx-auto px-6 py-12 text-center bg-white shadow-lg rounded-lg border"
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
          আমাদের সেবাসমূহ
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="p-6 bg-gray-50 rounded-lg shadow-md flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-700 mt-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Service;
