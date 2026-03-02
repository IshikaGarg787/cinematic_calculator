"use client"

import { motion, AnimatePresence } from "framer-motion"

interface CalculatorDisplayProps {
  expression: string
  result: string
  theme: "ghost" | "hanuman"
}

export function CalculatorDisplay({
  expression,
  result,
  theme,
}: CalculatorDisplayProps) {
  const glowColor =
    theme === "ghost"
      ? "0 0 20px rgba(56,189,248,0.4), 0 0 40px rgba(56,189,248,0.15)"
      : "0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.15)"

  const textColor = theme === "ghost" ? "text-sky-100" : "text-amber-100"
  const subTextColor = theme === "ghost" ? "text-sky-300/70" : "text-amber-300/70"

  return (
    <motion.div
      className="relative rounded-2xl p-5 mb-4 overflow-hidden"
      style={{
        background:
          theme === "ghost"
            ? "linear-gradient(135deg, rgba(15,23,42,0.6), rgba(30,58,138,0.3))"
            : "linear-gradient(135deg, rgba(40,20,0,0.6), rgba(120,53,9,0.3))",
        border:
          theme === "ghost"
            ? "1px solid rgba(56,189,248,0.25)"
            : "1px solid rgba(255,215,0,0.25)",
        boxShadow: glowColor,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Glass reflection overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle glowing flicker for hanuman theme */}
      {theme === "hanuman" && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{
            opacity: [0, 0.06, 0, 0.04, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
          style={{ background: "rgba(255,215,0,0.15)" }}
        />
      )}

      <div className="relative z-10 text-right min-h-[80px] flex flex-col justify-end">
        {/* Expression line */}
        <div
          className={`${subTextColor} text-sm font-mono min-h-[24px] transition-colors duration-300 truncate`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={expression}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              {expression || "\u00A0"}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Result line */}
        <div className={`${textColor} text-4xl font-bold font-mono mt-1 transition-colors duration-300`}>
          <AnimatePresence mode="wait">
            <motion.span
              key={result}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="block truncate"
              style={{
                textShadow:
                  theme === "ghost"
                    ? "0 0 20px rgba(56,189,248,0.5), 0 0 40px rgba(56,189,248,0.2)"
                    : "0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,165,0,0.3)",
              }}
            >
              {result || "0"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
