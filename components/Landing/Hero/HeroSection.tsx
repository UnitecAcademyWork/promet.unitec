import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-gradient-to-br from-brand-main-light/10 via-white to-brand-main-light/5 dark:from-gray-900 dark:via-gray-800 dark:to-brand-main/20">
      <div className="text-center px-6 max-w-3xl">
        
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-brand-bgdark dark:text-white leading-tight">
          PROMET{" "}
          <span className="text-transparent bg-clip-text bg-brand-main">
            PROMET 
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600 dark:text-gray-300">
          PROMET
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contacto"
            className="relative rounded-lg bg-brand-main px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl "
          >
            COMEÇAR AGORA
          </Link>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="h-1 w-32 rounded-full bg-brand-main"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
