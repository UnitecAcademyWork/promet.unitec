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
    <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative py-3 px-5 font-medium transition-all duration-300 group rounded-md ${
            activeTab === tab
              ? "text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2 relative z-10">
            {tab}
            {showCount && counts[tab] > 0 && (
              <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
                activeTab === tab
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
              }`}>
                {counts[tab]}
              </span>
            )}
          </span>
          
          {activeTab === tab && (
            <motion.div
              layoutId="underline"
              className="absolute inset-0 bg-brand-main rounded-md shadow-sm z-0"
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