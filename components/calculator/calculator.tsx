"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock } from "lucide-react"
import { GhostBackground } from "./ghost-background"
import { HanumanBackground } from "./hanuman-background"
import { ThemeToggle } from "./theme-toggle"
import { CalculatorDisplay } from "./calculator-display"
import { CalculatorButton } from "./calculator-button"
import { HistoryPanel } from "./history-panel"

interface HistoryEntry {
  id: number
  expression: string
  result: string
}

const HISTORY_KEY = "cinematic-calc-history"

const buttons: {
  label: string
  variant: "number" | "operator" | "action" | "equal"
  wide?: boolean
}[] = [
  { label: "AC", variant: "action" },
  { label: "DEL", variant: "action" },
  { label: "%", variant: "operator" },
  { label: "\u00F7", variant: "operator" },
  { label: "7", variant: "number" },
  { label: "8", variant: "number" },
  { label: "9", variant: "number" },
  { label: "\u00D7", variant: "operator" },
  { label: "4", variant: "number" },
  { label: "5", variant: "number" },
  { label: "6", variant: "number" },
  { label: "\u2212", variant: "operator" },
  { label: "1", variant: "number" },
  { label: "2", variant: "number" },
  { label: "3", variant: "number" },
  { label: "+", variant: "operator" },
  { label: "0", variant: "number", wide: true },
  { label: ".", variant: "number" },
  { label: "=", variant: "equal" },
]

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [expression, setExpression] = useState("")
  const [previousValue, setPreviousValue] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [theme, setTheme] = useState<"ghost" | "hanuman">("ghost")
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [historyOpen, setHistoryOpen] = useState(false)

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setHistory(parsed)
        }
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    } catch {
      // ignore write errors
    }
  }, [history])

  const addToHistory = useCallback(
    (expr: string, res: string) => {
      const entry: HistoryEntry = {
        id: Date.now(),
        expression: expr,
        result: res,
      }
      setHistory((prev) => [entry, ...prev])
    },
    []
  )

  const clearHistory = useCallback(() => {
    setHistory([])
    try {
      localStorage.removeItem(HISTORY_KEY)
    } catch {
      // ignore
    }
  }, [])

  const calculate = useCallback(
    (a: string, b: string, op: string): string => {
      const numA = parseFloat(a)
      const numB = parseFloat(b)

      if (isNaN(numA) || isNaN(numB)) return "Error"

      let result: number
      switch (op) {
        case "+":
          result = numA + numB
          break
        case "\u2212":
          result = numA - numB
          break
        case "\u00D7":
          result = numA * numB
          break
        case "\u00F7":
          if (numB === 0) return "Error"
          result = numA / numB
          break
        case "%":
          result = numA % numB
          break
        default:
          return "Error"
      }

      const rounded = parseFloat(result.toPrecision(12))
      return String(rounded)
    },
    []
  )

  const handleButtonClick = useCallback(
    (value: string) => {
      if (value === "AC") {
        setDisplay("0")
        setExpression("")
        setPreviousValue(null)
        setOperator(null)
        setWaitingForOperand(false)
        return
      }

      if (value === "DEL") {
        if (waitingForOperand) return
        setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))
        return
      }

      if (
        ["+", "\u2212", "\u00D7", "\u00F7", "%"].includes(value)
      ) {
        if (previousValue && operator && !waitingForOperand) {
          const result = calculate(previousValue, display, operator)
          setDisplay(result)
          setPreviousValue(result)
          setExpression(`${result} ${value}`)
        } else {
          setPreviousValue(display)
          setExpression(`${display} ${value}`)
        }
        setOperator(value)
        setWaitingForOperand(true)
        return
      }

      if (value === "=") {
        if (previousValue && operator) {
          const fullExpression = `${previousValue} ${operator} ${display}`
          const result = calculate(previousValue, display, operator)
          addToHistory(fullExpression, result)
          setDisplay(result)
          setExpression(`${fullExpression} =`)
          setPreviousValue(null)
          setOperator(null)
          setWaitingForOperand(false)
        }
        return
      }

      if (value === ".") {
        if (waitingForOperand) {
          setDisplay("0.")
          setWaitingForOperand(false)
          return
        }
        if (display.includes(".")) return
        setDisplay((prev) => prev + ".")
        return
      }

      if (waitingForOperand) {
        setDisplay(value)
        setWaitingForOperand(false)
      } else {
        setDisplay((prev) => (prev === "0" ? value : prev + value))
      }
    },
    [display, previousValue, operator, waitingForOperand, calculate, addToHistory]
  )

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "ghost" ? "hanuman" : "ghost"))
  }, [])

  const neonGlow =
    theme === "ghost"
      ? "0 0 30px rgba(56,189,248,0.25), 0 0 60px rgba(56,189,248,0.1)"
      : "0 0 30px rgba(255,215,0,0.25), 0 0 60px rgba(255,215,0,0.1)"

  const borderGlow =
    theme === "ghost"
      ? "1px solid rgba(56,189,248,0.3)"
      : "1px solid rgba(255,215,0,0.4)"

  const historyBtnColor =
    theme === "ghost"
      ? { bg: "rgba(56,189,248,0.2)", border: "rgba(56,189,248,0.4)", text: "#7dd3fc" }
      : { bg: "rgba(255,215,0,0.2)", border: "rgba(255,215,0,0.4)", text: "#fcd34d" }

  return (
    <main className="relative h-dvh flex flex-col items-center justify-center overflow-hidden">
      {/* Animated backgrounds */}
      <AnimatePresence mode="wait">
        {theme === "ghost" ? (
          <motion.div
            key="ghost"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GhostBackground />
          </motion.div>
        ) : (
          <motion.div
            key="hanuman"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HanumanBackground />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar: theme toggle left, history button right */}
      <motion.div
        className="relative z-20 w-full max-w-sm px-4 flex items-center justify-between mb-3 md:mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ThemeToggle theme={theme} onToggle={toggleTheme} />

        {/* History button */}
        <motion.button
          onClick={() => setHistoryOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          style={{
            background: historyBtnColor.bg,
            border: `1px solid ${historyBtnColor.border}`,
            color: historyBtnColor.text,
            backdropFilter: "blur(8px)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open calculation history"
        >
          <Clock className="w-4 h-4" />
          <span className="hidden sm:inline">History</span>
          {history.length > 0 && (
            <span
              className="ml-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs font-bold"
              style={{
                background: theme === "ghost" ? "rgba(56,189,248,0.35)" : "rgba(255,215,0,0.35)",
                color: theme === "ghost" ? "#e0f2fe" : "#fef3c7",
              }}
            >
              {history.length}
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Calculator card */}
      <motion.div
        className="relative z-10 w-[90%] max-w-sm"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Golden glowing border + aura pulse for hanuman theme */}
        {theme === "hanuman" && (
          <motion.div
            className="absolute -inset-1 rounded-[28px] pointer-events-none"
            style={{
              border: "1.5px solid rgba(255,215,0,0.35)",
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255,215,0,0.2), 0 0 40px rgba(255,165,0,0.1)",
                "0 0 40px rgba(255,215,0,0.4), 0 0 80px rgba(255,165,0,0.2)",
                "0 0 20px rgba(255,215,0,0.2), 0 0 40px rgba(255,165,0,0.1)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Glass card */}
        <motion.div
          className="rounded-3xl p-4 md:p-5"
          style={{
            background:
              theme === "ghost"
                ? "rgba(15,23,42,0.5)"
                : "rgba(40,20,0,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: borderGlow,
            boxShadow: neonGlow,
          }}
          animate={{
            boxShadow: neonGlow,
            border: borderGlow,
          }}
          transition={{ duration: 0.6 }}
        >
          {/* Glass reflection shimmer */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
            style={{
              background:
                "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Display */}
          <CalculatorDisplay
            expression={expression}
            result={display}
            theme={theme}
          />

          {/* Button grid */}
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {buttons.map((btn) => (
              <CalculatorButton
                key={btn.label}
                label={btn.label}
                onClick={handleButtonClick}
                theme={theme}
                variant={btn.variant}
                wide={btn.wide}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* History slide-in panel (overlay) */}
      <HistoryPanel
        history={history}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onClear={clearHistory}
        theme={theme}
      />
    </main>
  )
}
