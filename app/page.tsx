"use client";
import type { Metadata } from "next";
import React, { useState, useEffect } from "react";
import Hero from "../components/Landing/Hero/HeroSection";
import Hero2 from "../components/Landing/Hero2/HeroSection";
import WhatIsPromet from "../components/Landing/Sobre/sobre";
import TrainingAreas from "../components/Landing/Areas/areasdeFormacao";
import PartnersSection from "../components/Landing/Partners/Partnes";
import HowItWorks from "../components/Landing/ComoFunciona/comoFunciona";
import HowItWorksButton from "../components/Landing/ComoFunciona/comoFuncionaButton";
import Beneficios from "../components/Landing/Beneficios/beneficio";

// export const metadata: Metadata = {
//   title: "Promet",
//   description: "",
// };

export default function Home() {
  const slides = [<Hero2 key="hero2" />, <Hero key="hero1" />];
  const [current, setCurrent] = useState(0);

  // troca automática a cada 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      {/* Slider */}
      <div className="relative w-full h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide}
          </div>
        ))}

        {/* Botões de navegação */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-blue-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Outras seções */}
      <div>
        <WhatIsPromet />
      </div>
      <div>
        <TrainingAreas />
      </div>
      <div>
        <PartnersSection />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div>
        <HowItWorksButton />
      </div>
      <div>
        <Beneficios />
      </div>
    </div>
  );
}
