"use client"
import React, { useEffect, useRef } from "react";

const PartnerSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Configurar a animação
    const logoCount = 8; // Número de logos
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

  // Dados dos parceiros
  const partnerLogos = Array(8).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Empresa ${i + 1}`
  }));

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
                    <div key={`${set}-${partner.id}`} className="flex items-center justify-center mx-4 w-32 h-20">
                      <div 
                        ref={el => addToRefs(el, refIndex)}
                        className="partner-logo max-h-full max-w-full object-contain bg-transparent dark:bg-gray-700 rounded-lg flex items-center justify-center p-3"
                      >
                        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-0.5m-9 0H9m0 0h0.5M4 21H2m2 0v-0.5M4 21v-0.5" />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Overlays de gradiente para melhor UX */}
          {/* <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div> */}
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