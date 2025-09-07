"use client";
import { motion } from "framer-motion";

type TabsProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showCount?: boolean;
  counts?: Record<string, number>;
};

export default function Tabs({ tabs, activeTab, setActiveTab, showCount = false, counts = {} }: TabsProps) {
  return (
    <div className="flex space-x-6 border-b border-gray-200 dark:border-gray-700 pb-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative py-3 px-2 font-medium transition-all duration-300 group ${
            activeTab === tab
              ? "text-brand-main dark:text-brand-lime"
              : "text-gray-500 dark:text-gray-400 hover:text-brand-main dark:hover:text-brand-lime"
          }`}
        >
          <span className="flex items-center gap-2">
            {tab}
            {showCount && counts[tab] > 0 && (
              <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
                activeTab === tab
                  ? "bg-brand-main/10 text-brand-main"
                  : "bg-gray-100 dark:bg-gray-800 group-hover:bg-brand-main/10"
              }`}>
                {counts[tab]}
              </span>
            )}
          </span>
          
          {activeTab === tab && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 bottom-0 h-1 bg-brand-lime rounded-t-full"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}