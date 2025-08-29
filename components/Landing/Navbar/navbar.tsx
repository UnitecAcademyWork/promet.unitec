"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <Link href="/" className="text-2xl font-bold text-brand-main dark:text-brand-lime">
          PROMET
        </Link>
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="hover:text-brand-main dark:hover:text-brand-lime transition">
            Início
          </Link>
          <Link href="/#beneficios" className="hover:text-brand-main dark:hover:text-brand-lime transition">
            Beneficios
          </Link>
          <Link href="/#sobre" className="hover:text-brand-main dark:hover:text-brand-lime transition">
            Sobre
          </Link>
          <Link href="/#contacto" className="hover:text-brand-main dark:hover:text-brand-lime transition">
            Contacto
          </Link>
        </div>

        {/* Botão Dark/Light Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
