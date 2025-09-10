"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const PartnerSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Configurar a animação
    const logoCount = 11; // Número de logos
    const duration = logoCount * 3; // 3 segundos por logo
    slider.style.animationDuration = `${duration}s`;

    // Configurar os event listeners para os logos
    const handleMouseEnter = () => {
      slider.style.animationPlayState = 'paused';
    };
    
    const handleMouseLeave = () => {
      slider.style.animationPlayState = 'running';
    };

    // Adicionar event listeners apenas após montagem
    const logos = logoRefs.current.filter(Boolean) as HTMLDivElement[];
    logos.forEach(logo => {
      logo.addEventListener('mouseenter', handleMouseEnter);
      logo.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      logos.forEach(logo => {
        logo.removeEventListener('mouseenter', handleMouseEnter);
        logo.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Função para adicionar refs aos logos
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !logoRefs.current.includes(el)) {
      logoRefs.current[index] = el;
    }
  };

  // Dados dos parceiros com as imagens reais
  const partnerLogos = [
    { id: 1, name: "Tecso", image: "/images/tecso.png" },
    { id: 2, name: "Sab Comunição e Media", image: "/images/sabcm.jpg" },
    { id: 3, name: "Zukuyuma", image: "/images/ZK.png" },
    // { id: 4, name: "Sabores no Ponto", image: "/images/snp.png" },
    { id: 5, name: "Prospectus Engenharia", image: "/images/proeng.jpg" },
    { id: 6, name: "Mio Reabilitação", image: "/images/mio.jpg" },
    { id: 7, name: "Empresa Nacional de Uniformes", image: "/images/ENU.png" },
    { id: 8, name: "EGIP", image: "/images/EGIP.png" },
    { id: 9, name: "Ebnezer Gráfica e Consultoria", image: "/images/egc.jpg" },
    { id: 10, name: "Building Mozambique Group", image: "/images/BMG.png" },
    { id: 11, name: "naturis", image: "/images/naturis.png" }
  ];

  return (
    <section className="py-12 bg-gradient-to-tr from-brand-main-light/5 via-white to-brand-main-light/10 dark:from-gray-900 dark:via-gray-800 dark:to-brand-main/10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-brand-bgdark dark:text-white mb-8">
          Nossos <span className="text-brand-main dark:text-brand-lime">Parceiros</span>
        </h2>
        
        <div className="relative overflow-hidden group">
          <div ref={sliderRef} className="flex animate-slide">
            {/* Duplicar os logos para criar efeito de loop infinito */}
            {[1, 2].map((set) => (
              <div key={set} className="flex shrink-0">
                {partnerLogos.map((partner, index) => {
                  const refIndex = (set - 1) * partnerLogos.length + index;
                  return (
                    <div key={`${set}-${partner.id}`} className="flex items-center justify-center mx-4 w-40 h-24">
                      <div 
                        ref={el => addToRefs(el, refIndex)}
                        className="partner-logo max-h-full max-w-full bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-3 shadow-md hover:shadow-lg transition-all"
                      >
                        <div className="w-32 h-16 flex rounded-full items-center justify-center">
                          <Image
                            src={partner.image}
                            alt={partner.name}
                            width={128}
                            height={64}
                            className="object-contain rounded-lg w-full h-full"
                            onError={(e) => {
                              // Fallback em caso de erro no carregamento da imagem
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextSibling && ((target.nextSibling as HTMLElement).style.display = 'flex');
                            }}
                          />
                          {/* Fallback caso a imagem não carregue */}
                          <div className="hidden items-center justify-center text-gray-400 w-full h-full">
                            <div className="bg-gray-200 dark:bg-gray-600 w-full h-full flex items-center justify-center rounded">
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-300 text-center px-1">
                                {partner.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
            animation: slide 33s linear infinite;
          }
          
          .group:hover .animate-slide {
            animation-play-state: paused;
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