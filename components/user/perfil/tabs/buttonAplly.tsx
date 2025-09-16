"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface ApplyButtonProps {
  isEnabled: boolean;
  href: string;
  onClick?: () => void;

}

export default function ApplyButton({ isEnabled, href }: ApplyButtonProps) {
  return (
    <Link href={href} className="w-full md:w-auto">
      <motion.button
        type="button"
        disabled={!isEnabled}
        whileHover={{ scale: isEnabled ? 1.03 : 1 }}
        whileTap={{ scale: isEnabled ? 0.97 : 1 }}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all w-full md:w-auto ${
          isEnabled
            ? "bg-brand-lime hover:bg-brand-lime/90"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        <Plus className="w-4 h-4" />
        Candidatar-se
      </motion.button>
    </Link>
  );
}
