"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import heroBg from "./../../../public/images/hero9.png";
import { motion, AnimatePresence } from "framer-motion";

const Hero2 = () => {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animação para o título principal - CORRIGIDO
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  // Animação para as palavras individuais - CORRIGIDO
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Efeito parallax para os SVGs de fundo
  const parallaxStyle = (factor: number) => ({
    transform: `translateY(${scrollY * factor}px)`
  });

  return (
    <section className="relative flex items-center justify-center w-full h-screen overflow-hidden ">
      {/* SVGs de fundo com efeito parallax */}
      <motion.div 
        className="absolute top-0 left-0 w-[28rem] h-[28rem] text-brand-main/30 dark:text-brand-main/40 blur-xl"
        style={parallaxStyle(0.2)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M40.3,-66.9C52.8,-59.8,65.1,-52.1,72.5,-40.6C79.9,-29.2,82.4,-14.6,80.1,-0.9C77.8,12.7,70.8,25.3,62.5,37.1C54.2,48.8,44.7,59.7,32.6,66.4C20.5,73.1,5.8,75.7,-8.7,77.2C-23.1,78.7,-46.2,79.2,-59.7,68.4C-73.2,57.6,-77.1,35.6,-77.8,15.6C-78.6,-4.3,-76.2,-22.4,-66.5,-35.2C-56.8,-48,-39.7,-55.5,-24.2,-62.9C-8.6,-70.4,5.4,-77.9,18.9,-77.2C32.4,-76.6,45.6,-67.9,40.3,-66.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      <motion.div 
        className="absolute bottom-0 right-0 w-[32rem] h-[32rem] text-brand-bgdark/20 dark:text-brand-main/30 blur-xl"
        style={parallaxStyle(0.1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M38.9,-67.4C50.6,-58.2,61.1,-49.4,69.7,-37.9C78.4,-26.5,85.3,-13.2,84.9,-0.3C84.5,12.5,76.9,25.1,68.3,36.8C59.7,48.5,50.2,59.2,38.2,67.7C26.2,76.3,13.1,82.6,-0.9,83.9C-14.8,85.3,-29.7,81.7,-43.4,73.1C-57.1,64.5,-69.7,50.8,-75.6,34.5C-81.4,18.2,-80.5,-0.6,-75.3,-17.4C-70.1,-34.2,-60.6,-48.9,-47.3,-57.8C-34.1,-66.7,-17,-69.9,-1.1,-68.2C14.8,-66.6,29.6,-60.2,38.9,-67.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Conteúdo principal */}
      <div className="text-center px-6 max-w-3xl relative z-10">
        <motion.h1 
          className="text-5xl sm:text-5xl font-extrabold tracking-tight text-brand-main dark:text-white leading-tight"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
                }
              }
            }} 
            className="inline-block"
          >
            Amplie,
          </motion.span>{' '}
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
                }
              }
            }} 
            className="text-transparent bg-clip-text bg-brand-lime inline-block"
            whileHover={{ scale: 1.05, rotate: [0, -2, 0, 2, 0] }}
            transition={{ duration: 0.5 }}
          >
            Desenvolva
          </motion.span>
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
                }
              }
            }} 
            className="inline-block"
          >
            , Conquiste
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-xs sm:text-xl leading-8 text-gray-500 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          Programa de Melhoria de Empregabilidade e Trabalho
        </motion.p>
        
        <motion.div 
          className="mt-10 flex justify-center relative"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut"
          }}
        >
          <motion.button
            onClick={() => setOpen(!open)}
            className="relative rounded-xl bg-brand-main px-8 py-3.5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-purple-700 hover:to-indigo-800 flex items-center justify-center space-x-2"
            
          >
            <span>Quero Participar</span>
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </motion.svg>
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div 
                className="absolute top-full mt-3 w-86 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-20"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="p-2 flex flex-row justify-center items-center w-full">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/formulario/parceiro"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 rounded-lg transition-all duration-200 group"
                    >
                      <svg className="w-5 h-5 mr-3 text-purple-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      <span>Parceiro</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/registro"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-purple-50 rounded-lg transition-all duration-200 group"
                    >
                      <svg className="w-5 h-5 mr-3 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      <span>Candidatura</span>
                    </Link>
                  </motion.div>
                </div>
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-500">
                  Selecione uma opção para continuar
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="mt-6 flex justify-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          <div className="h-1 w-32 rounded-full bg-brand-main"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero2;