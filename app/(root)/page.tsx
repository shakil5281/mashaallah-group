"use client";

import Header from "@/components/layout/Header";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

export default function Home() {

  const { userId } = useAuth();

  if (userId) {
    redirect("/dashboard");
  }
  
  return (
    <>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center h-screen text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Welcome to MashaAllah Traders
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl"
          >
            Your trusted trading partner for quality products and services.
          </motion.p>
          <motion.a
            href="#about"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg font-semibold hover:bg-gray-200 transition"
          >
            Learn More
          </motion.a>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-6 text-center bg-white">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-blue-600"
          >
            About Us
          </motion.h2>
          <p className="mt-4 text-lg text-gray-700">
            MashaAllah Traders is dedicated to providing high-quality products and exceptional customer service in the trading industry.
          </p>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 px-6 bg-gray-50 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-blue-600"
          >
            Our Services
          </motion.h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Product Trading", "Wholesale Supply", "Logistics Support"].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-white rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-blue-600">{service}</h3>
                <p className="mt-2 text-gray-600">High-quality and reliable {service.toLowerCase()} solutions.</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-6 bg-white text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-blue-600"
          >
            Contact Us
          </motion.h2>
          <p className="mt-4 text-lg text-gray-700">Reach out to us for business inquiries.</p>
          <motion.a
            href="mailto:contact@mashaallahtraders.com"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg font-semibold hover:bg-blue-700 transition"
          >
            Email Us
          </motion.a>
        </section>

        {/* Footer */}
        <footer className="py-6 text-center bg-gray-800 text-gray-300">
          &copy; {new Date().getFullYear()} MashaAllah Traders. All rights reserved.
        </footer>
      </main>
    </>
  );
}
