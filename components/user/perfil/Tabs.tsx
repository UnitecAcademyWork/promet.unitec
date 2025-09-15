"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";

type TabsProps = {
  tabs: string[];
  showCount?: boolean;
  counts?: Record<string, number>;
  renderTabContent: (tab: string) => ReactNode;
};

export default function Tabs({
  tabs,
  showCount = false,
  counts = {},
  renderTabContent,
}: TabsProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [openTabs, setOpenTabs] = useState<string[]>([]); // 🔑 agora é array

  // Detecta tamanho da tela
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTab = (tab: string) => {
    setOpenTabs((prev) =>
      prev.includes(tab)
        ? prev.filter((t) => t !== tab) // fecha se já estiver aberto
        : [...prev, tab] // abre junto com os outros
    );
  };

  return (
    <div className={`flex flex-col w-full ${isMobile ? "space-y-2" : "space-y-3"}`}>
      {tabs.map((tab) => {
        const isActive = openTabs.includes(tab);

        return (
          <div
            key={tab}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            {/* Cabeçalho do Accordion */}
            <button
              onClick={() => toggleTab(tab)}
              className={`w-full flex justify-between items-center px-5 py-3 font-medium text-left transition-all duration-300 ${
                isActive
                  ? "bg-brand-main text-white"
                  : "bg-white text-brand-main dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab}
                {showCount && counts[tab] > 0 && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    {counts[tab]}
                  </span>
                )}
              </span>

              <motion.span
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2"
              >
                ▶
              </motion.span>
            </button>

            {/* Conteúdo expansível */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-white dark:bg-gray-900"
                >
                  {renderTabContent(tab)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
