"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, Clock } from "lucide-react"

interface HistoryEntry {
  id: number
  expression: string
  result: string
}

interface HistoryPanelProps {
  history: HistoryEntry[]
  isOpen: boolean
  onClose: () => void
  onClear: () => void
  theme: "ghost" | "hanuman"
}

export function HistoryPanel({
  history,
  isOpen,
  onClose,
  onClear,
  theme,
}: HistoryPanelProps) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const borderColor =
    theme === "ghost"
      ? "rgba(56,189,248,0.3)"
      : "rgba(255,215,0,0.3)"

  const glowColor =
    theme === "ghost"
      ? "0 0 30px rgba(56,189,248,0.2)"
      : "0 0 30px rgba(255,215,0,0.2)"

  const accentColor = theme === "ghost" ? "#38bdf8" : "#fbbf24"

  // Animation variants based on viewport
  const panelVariants = isDesktop
    ? {
        initial: { x: "100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0 },
      }
    : {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel: bottom sheet on mobile, right side on desktop */}
          <motion.div
            className="fixed z-50 flex flex-col
              bottom-0 left-0 right-0 max-h-[70vh] rounded-t-2xl
              md:top-0 md:bottom-0 md:right-0 md:left-auto md:max-h-full md:w-[380px] md:rounded-t-none md:rounded-l-2xl"
            style={{
              background:
                theme === "ghost"
                  ? "rgba(15,23,42,0.9)"
                  : "rgba(40,20,0,0.9)",
              borderLeft: `1px solid ${borderColor}`,
              borderTop: `1px solid ${borderColor}`,
              boxShadow: glowColor,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 shrink-0"
              style={{ borderBottom: `1px solid ${borderColor}` }}
            >
              <div className="flex items-center gap-2" style={{ color: accentColor }}>
                <Clock className="w-5 h-5" />
                <span className="text-base font-semibold">
                  History ({history.length})
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                style={{ color: accentColor }}
                aria-label="Close history panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Clock
                    className="w-10 h-10"
                    style={{
                      color:
                        theme === "ghost"
                          ? "rgba(186,230,253,0.2)"
                          : "rgba(255,215,0,0.2)",
                    }}
                  />
                  <p
                    className="text-sm"
                    style={{
                      color:
                        theme === "ghost"
                          ? "rgba(186,230,253,0.4)"
                          : "rgba(255,215,0,0.4)",
                    }}
                  >
                    No calculations yet
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.2 }}
                      className="flex flex-col py-3 px-3 rounded-xl"
                      style={{
                        background:
                          theme === "ghost"
                            ? "rgba(56,189,248,0.08)"
                            : "rgba(255,215,0,0.08)",
                        border: `1px solid ${
                          theme === "ghost"
                            ? "rgba(56,189,248,0.12)"
                            : "rgba(255,215,0,0.12)"
                        }`,
                      }}
                    >
                      <span
                        className="text-sm font-mono truncate"
                        style={{
                          color:
                            theme === "ghost"
                              ? "rgba(186,230,253,0.7)"
                              : "rgba(253,230,138,0.7)",
                        }}
                      >
                        {entry.expression}
                      </span>
                      <span
                        className="text-lg font-mono font-bold mt-0.5"
                        style={{ color: accentColor }}
                      >
                        = {entry.result}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Clear button at bottom */}
            {history.length > 0 && (
              <div className="p-4 shrink-0" style={{ borderTop: `1px solid ${borderColor}` }}>
                <motion.button
                  onClick={onClear}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  style={{
                    background: "rgba(239,68,68,0.15)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    color: "#fca5a5",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
