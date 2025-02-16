"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-7xl font-bold text-gray-800 dark:text-white sm:text-9xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-4 text-lg text-gray-600 dark:text-gray-300 sm:text-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        Oops! The page you are looking for doesn't exist.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        className="mt-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
      >
        <Link href="/">
          <Button className="px-6 py-2 text-lg">Go Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}
