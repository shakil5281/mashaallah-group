"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        MashaAllah Traders
                    </Link>
                </motion.div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex flex-row justify-center items-center space-x-6">
                    {["Home", "About", "Services", "Contact"].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-gray-700 hover:text-blue-600 transition font-medium"
                            >
                                {item}
                            </Link>
                        </motion.div>
                    ))}
                    <Link href='/sign-in'>
                        <Button>
                            Login
                        </Button>
                    </Link>
                </nav>


                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-white shadow-md absolute w-full left-0 top-full h-screen"
                >
                    <nav className="flex flex-col items-center space-y-4 py-4 px-8">
                        {["Home", "About", "Services", "Contact"].map((item, index) => (
                            <Link
                                key={index}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-gray-700 hover:text-blue-600 transition font-medium w-full text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    <Link className="w-full" href='/sign-in'>
                        <Button className="w-full">
                            Login
                        </Button>
                    </Link>
                    </nav>
                </motion.div>
            )}
        </header>
    );
}
