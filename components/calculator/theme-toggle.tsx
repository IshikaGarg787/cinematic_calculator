"use client"

import { motion } from "framer-motion"

interface ThemeToggleProps {
  theme: "ghost" | "hanuman"
  onToggle: () => void
}

// Small Om symbol SVG
function OmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="18" fontSize="16" fontWeight="bold" fill="white" fontFamily="serif">
        {"Om"}
      </text>
    </svg>
  )
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          theme === "ghost" ? "text-sky-200" : "text-amber-400/50"
        }`}
      >
        Ghost
      </span>

      <button
        onClick={onToggle}
        className="relative w-16 h-8 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        style={{
          background:
            theme === "ghost"
              ? "linear-gradient(135deg, rgba(56,189,248,0.4), rgba(59,130,246,0.4))"
              : "linear-gradient(135deg, rgba(245,158,11,0.4), rgba(180,83,9,0.4))",
          boxShadow:
            theme === "ghost"
              ? "0 0 20px rgba(56,189,248,0.3), inset 0 0 10px rgba(56,189,248,0.2)"
              : "0 0 20px rgba(255,215,0,0.3), inset 0 0 10px rgba(255,215,0,0.2)",
          border:
            theme === "ghost"
              ? "1px solid rgba(186,230,253,0.3)"
              : "1px solid rgba(255,215,0,0.3)",
        }}
        aria-label={`Switch to ${theme === "ghost" ? "Hanuman Divine" : "Ghost"} theme`}
      >
        <motion.div
          className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center"
          animate={{
            left: theme === "ghost" ? 4 : 34,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            background:
              theme === "ghost"
                ? "linear-gradient(135deg, #38bdf8, #3b82f6)"
                : "linear-gradient(135deg, #f59e0b, #d97706)",
            boxShadow:
              theme === "ghost"
                ? "0 0 12px rgba(56,189,248,0.6)"
                : "0 0 12px rgba(255,215,0,0.6)",
          }}
        >
          {theme === "ghost" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <OmIcon />
          )}
        </motion.div>
      </button>

      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          theme === "hanuman" ? "text-amber-300" : "text-sky-300/50"
        }`}
      >
        Hanuman
      </span>
    </motion.div>
  )
}
