"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      {/* Animated Error Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-center w-24 h-24 bg-red-500 rounded-full"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="text-5xl font-bold text-white"
        >
          !
        </motion.span>
      </motion.div>

      {/* Error Message */}
      <motion.h1
        className="mt-4 text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        Something went wrong
      </motion.h1>

      <motion.p
        className="mt-2 text-lg text-gray-600 dark:text-gray-300 sm:text-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      >
        Please try again later.
      </motion.p>

      {/* Animated Retry Button */}
      <motion.div
        className="mt-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
      >
        <Button onClick={() => reset()} className="px-6 py-2 text-lg">
          Try Again
        </Button>
      </motion.div>
    </div>
  );
}
