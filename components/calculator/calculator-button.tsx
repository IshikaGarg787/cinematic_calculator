"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"

interface CalculatorButtonProps {
  label: string
  onClick: (value: string) => void
  theme: "ghost" | "hanuman"
  variant?: "number" | "operator" | "action" | "equal"
  wide?: boolean
}

export function CalculatorButton({
  label,
  onClick,
  theme,
  variant = "number",
  wide = false,
}: CalculatorButtonProps) {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = { id: Date.now(), x, y }
      setRipples((prev) => [...prev, newRipple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)

      onClick(label)
    },
    [label, onClick]
  )

  const getStyles = () => {
    if (theme === "ghost") {
      switch (variant) {
        case "operator":
          return {
            background: "rgba(56,189,248,0.2)",
            border: "1px solid rgba(56,189,248,0.35)",
            color: "#7dd3fc",
            hoverShadow: "0 0 20px rgba(56,189,248,0.4)",
          }
        case "action":
          return {
            background: "rgba(148,163,184,0.15)",
            border: "1px solid rgba(148,163,184,0.25)",
            color: "#cbd5e1",
            hoverShadow: "0 0 15px rgba(148,163,184,0.3)",
          }
        case "equal":
          return {
            background: "linear-gradient(135deg, rgba(56,189,248,0.4), rgba(59,130,246,0.4))",
            border: "1px solid rgba(56,189,248,0.5)",
            color: "#ffffff",
            hoverShadow: "0 0 25px rgba(56,189,248,0.5)",
          }
        default:
          return {
            background: "rgba(15,23,42,0.4)",
            border: "1px solid rgba(186,230,253,0.15)",
            color: "#e0f2fe",
            hoverShadow: "0 0 15px rgba(56,189,248,0.25)",
          }
      }
    } else {
      // Hanuman Divine Power Mode - gold/saffron palette
      switch (variant) {
        case "operator":
          return {
            background: "linear-gradient(135deg, rgba(245,158,11,0.25), rgba(217,119,6,0.2))",
            border: "1px solid rgba(255,215,0,0.35)",
            color: "#fcd34d",
            hoverShadow: "0 0 20px rgba(255,215,0,0.4)",
          }
        case "action":
          return {
            background: "rgba(120,53,9,0.25)",
            border: "1px solid rgba(217,119,6,0.25)",
            color: "#fde68a",
            hoverShadow: "0 0 15px rgba(255,215,0,0.3)",
          }
        case "equal":
          return {
            background: "linear-gradient(135deg, rgba(245,158,11,0.5), rgba(217,119,6,0.5))",
            border: "1px solid rgba(255,215,0,0.5)",
            color: "#ffffff",
            hoverShadow: "0 0 25px rgba(255,215,0,0.5)",
          }
        default:
          return {
            background: "rgba(40,20,0,0.4)",
            border: "1px solid rgba(255,215,0,0.12)",
            color: "#fef3c7",
            hoverShadow: "0 0 15px rgba(255,215,0,0.25)",
          }
      }
    }
  }

  const styles = getStyles()

  return (
    <motion.button
      onClick={handleClick}
      className={`relative overflow-hidden rounded-xl font-semibold text-lg transition-colors duration-300 ${
        wide ? "col-span-2" : ""
      }`}
      style={{
        background: styles.background,
        border: styles.border,
        color: styles.color,
        backdropFilter: "blur(8px)",
        height: "clamp(48px, 8vh, 64px)",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: styles.hoverShadow,
      }}
      whileTap={{
        scale: 0.92,
        y: 2,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <span className="relative z-10 font-mono">{label}</span>

      {/* Hover shimmer effect for hanuman theme */}
      {theme === "hanuman" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.08), transparent)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - 30,
            top: ripple.y - 30,
            width: 60,
            height: 60,
            background:
              theme === "ghost"
                ? "rgba(56,189,248,0.35)"
                : "rgba(255,215,0,0.35)",
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  )
}
