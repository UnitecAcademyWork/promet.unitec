"use client"
import React, { useRef, useEffect } from "react";
import Image from "next/image";

const PartnerSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Lista de parceiros
  const partnerLogos = [
    { id: 1, name: "Tecso", image: "/images/tecso.png" },
    { id: 2, name: "Sab Comunicação e Media", image: "/images/sabcm.png" },
    { id: 3, name: "Zukuyuma", image: "/images/ZK.png" },
    { id: 5, name: "Prospectus Engenharia", image: "/images/proeng.png" },
    { id: 6, name: "Mio Reabilitação", image: "/images/mio.png" },
    { id: 7, name: "Empresa Nacional de Uniformes", image: "/images/ENU.png" },
    { id: 8, name: "EGIP", image: "/images/EGIP.png" },
    { id: 9, name: "Ebnezer Gráfica e Consultoria", image: "/images/egc.jpg" },
    { id: 10, name: "Building Mozambique Group", image: "/images/BMG1.png" },
    { id: 11, name: "Naturis", image: "/images/naturis.png" },
    { id: 12, name: "Xiphefu", image: "/images/XPF.png" },
    { id: 13, name: "PRI", image: "/images/PRI.png" },
    { id: 14, name: "TC", image: "/images/TC.png" },
  ];

  // Duplicar a lista para o efeito de loop infinito
  const logosLoop = [...partnerLogos, ...partnerLogos];

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.style.animationPlayState = "running";
  }, []);

  return (
    <section className="py-12 bg-gradient-to-tr from-brand-main-light/5 via-white to-brand-main-light/10 dark:from-gray-900 dark:via-gray-800 dark:to-brand-main/10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-brand-bgdark dark:text-white mb-8">
          Nossos{" "}
          <span className="text-brand-main dark:text-brand-lime">Parceiros</span>
        </h2>

        <div className="relative overflow-hidden">
          <div ref={sliderRef} className="flex animate-slide whitespace-nowrap">
            {logosLoop.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`} // ✅ chave estável
                className="flex items-center justify-center mx-6 w-40 h-24 shrink-0"
              >
                <div className="partner-logo bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-3 shadow-md hover:shadow-lg transition-all">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={128}
                    height={64}
                    className="object-contain rounded-lg w-32 h-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-slide {
            animation: slide 30s linear infinite;
          }

          .partner-logo {
            filter: grayscale(100%);
            opacity: 0.7;
            transition: all 0.3s ease;
          }

          .partner-logo:hover {
            filter: grayscale(0);
            opacity: 1;
            transform: scale(1.05);
          }
        `}</style>
      </div>
    </section>
  );
};

export default PartnerSlider;
