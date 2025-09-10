"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import logo from "/public/images/prometlogo.png";
import Image from "next/image";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Tema
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

    // Verificar se existe sessão pelo cookie
    const hasAuthToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="));
    setIsLoggedIn(!!hasAuthToken);
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
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-brand-main dark:text-brand-lime flex items-center"
        >
          <Image src={logo} alt="PROMET" width={50} height={50} />
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link
            href="/"
            className="text-gray-600 hover:text-brand-main dark:hover:text-brand-lime transition"
          >
            Início
          </Link>
          <Link
            href="/#beneficios"
            className="text-gray-600 hover:text-brand-main dark:hover:text-brand-lime transition"
          >
            Benefícios
          </Link>
          <Link
            href="/#sobre"
            className="text-gray-600 hover:text-brand-main dark:hover:text-brand-lime transition"
          >
            Sobre
          </Link>
          <Link
            href="/#contacto"
            className="text-gray-600 hover:text-brand-main dark:hover:text-brand-lime transition"
          >
            Contacto
          </Link>
        </div>

        {/* Ações */}
        <div className="flex items-center space-x-4">
          {/* Só aparece se NÃO estiver logado */}
          {!isLoggedIn && (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg border dark:border-brand-lime dark:text-white border-brand-main text-brand-main font-medium hover:bg-brand-main hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/registro"
                className="px-4 py-2 rounded-lg bg-brand-main text-white font-medium hover:bg-brand-main/90 transition"
              >
                Registro
              </Link>
            </>
          )}
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
      </div>
    </nav>
  );
};

export default Navbar;
