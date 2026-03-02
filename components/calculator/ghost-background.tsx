"use client"

import { motion } from "framer-motion"

// Large detailed ghost SVG
function LargeGhostSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main body */}
      <path
        d="M100 10C55 10 20 50 20 95v120c0 8 4 15 12 15s12-8 16-15c4-8 8-15 16-15s12 8 16 15c4 8 8 15 16 15s12-8 16-15c4-8 8-15 16-15s12 8 16 15c4 8 8 15 16 15s12-8 12-15V95c0-45-35-85-82-85z"
        fill="rgba(186,230,253,0.55)"
        stroke="rgba(186,230,253,0.8)"
        strokeWidth="2"
      />
      {/* Inner glow */}
      <path
        d="M100 25C62 25 35 58 35 95v105c0 5 2 10 8 10s8-5 12-10c4-6 8-12 14-12s10 6 14 12c4 6 6 10 12 10s8-5 12-10c4-6 8-12 14-12s10 6 14 12c4 6 6 10 12 10s8-5 8-10V95c0-37-27-70-65-70z"
        fill="rgba(186,230,253,0.15)"
      />
      {/* Left eye */}
      <ellipse cx="75" cy="85" rx="14" ry="18" fill="rgba(15,23,42,0.7)" />
      <ellipse cx="75" cy="82" rx="9" ry="11" fill="rgba(56,189,248,0.6)" />
      <circle cx="72" cy="79" r="4" fill="rgba(255,255,255,0.8)" />
      {/* Right eye */}
      <ellipse cx="125" cy="85" rx="14" ry="18" fill="rgba(15,23,42,0.7)" />
      <ellipse cx="125" cy="82" rx="9" ry="11" fill="rgba(56,189,248,0.6)" />
      <circle cx="122" cy="79" r="4" fill="rgba(255,255,255,0.8)" />
      {/* Mouth */}
      <ellipse cx="100" cy="120" rx="12" ry="8" fill="rgba(15,23,42,0.5)" />
      <ellipse cx="100" cy="118" rx="8" ry="5" fill="rgba(56,189,248,0.2)" />
      {/* Cheek blush */}
      <ellipse cx="60" cy="100" rx="10" ry="6" fill="rgba(147,197,253,0.25)" />
      <ellipse cx="140" cy="100" rx="10" ry="6" fill="rgba(147,197,253,0.25)" />
    </svg>
  )
}

// Smaller ghost for depth
function SmallGhostSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 6C33 6 12 30 12 57v72c0 5 2.5 9 7 9s7-5 10-9c3-5 5-9 10-9s7 5 10 9c3 5 5 9 10 9s7-5 10-9c3-5 5-9 10-9s7 5 10 9c3 5 5 9 10 9s7-5 7-9V57C108 30 87 6 60 6z"
        fill="rgba(186,230,253,0.4)"
        stroke="rgba(186,230,253,0.65)"
        strokeWidth="1.5"
      />
      <ellipse cx="44" cy="52" rx="8" ry="11" fill="rgba(15,23,42,0.6)" />
      <ellipse cx="44" cy="50" rx="5" ry="7" fill="rgba(56,189,248,0.5)" />
      <circle cx="42" cy="48" r="2.5" fill="rgba(255,255,255,0.7)" />
      <ellipse cx="76" cy="52" rx="8" ry="11" fill="rgba(15,23,42,0.6)" />
      <ellipse cx="76" cy="50" rx="5" ry="7" fill="rgba(56,189,248,0.5)" />
      <circle cx="74" cy="48" r="2.5" fill="rgba(255,255,255,0.7)" />
      <ellipse cx="60" cy="72" rx="7" ry="5" fill="rgba(15,23,42,0.4)" />
    </svg>
  )
}

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 3,
}))

export function GhostBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Sky blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-600 to-blue-950" />

      {/* Moon glow */}
      <motion.div
        className="absolute"
        style={{
          top: "6%",
          right: "12%",
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(186,230,253,0.5) 35%, transparent 70%)",
          boxShadow: "0 0 80px rgba(186,230,253,0.6), 0 0 160px rgba(186,230,253,0.25)",
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ---- Large Ghost LEFT: sharp focus, near, clearly visible ---- */}
      <motion.div
        className="absolute z-[2]"
        style={{
          left: "-2%",
          bottom: "8%",
          width: "clamp(180px, 28vw, 320px)",
          height: "auto",
        }}
        animate={{
          y: [0, -18, 0, -10, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div style={{ filter: "drop-shadow(0 0 30px rgba(56,189,248,0.4)) drop-shadow(0 0 60px rgba(56,189,248,0.2))" }}>
          <LargeGhostSVG />
        </div>
      </motion.div>

      {/* ---- Large Ghost RIGHT: sharp focus, near, clearly visible ---- */}
      <motion.div
        className="absolute z-[2]"
        style={{
          right: "-2%",
          bottom: "12%",
          width: "clamp(160px, 25vw, 280px)",
          height: "auto",
        }}
        animate={{
          y: [0, -14, 0, -20, 0],
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div style={{ filter: "drop-shadow(0 0 30px rgba(56,189,248,0.4)) drop-shadow(0 0 60px rgba(56,189,248,0.2))" }}>
          <LargeGhostSVG style={{ transform: "scaleX(-1)" }} />
        </div>
      </motion.div>

      {/* ---- Medium Ghost TOP-CENTER: slightly blurred, far depth ---- */}
      <motion.div
        className="absolute z-[1]"
        style={{
          left: "50%",
          top: "5%",
          transform: "translateX(-50%)",
          width: "clamp(100px, 15vw, 180px)",
          height: "auto",
          filter: "blur(2px)",
          opacity: 0.55,
        }}
        animate={{
          y: [0, -12, 0],
          x: ["-50%", "-47%", "-53%", "-50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div style={{ filter: "drop-shadow(0 0 40px rgba(56,189,248,0.3))" }}>
          <SmallGhostSVG />
        </div>
      </motion.div>

      {/* ---- Small Ghost FAR LEFT-TOP: blurred, background depth ---- */}
      <motion.div
        className="absolute z-[1]"
        style={{
          left: "18%",
          top: "20%",
          width: "clamp(70px, 10vw, 130px)",
          height: "auto",
          filter: "blur(3px)",
          opacity: 0.35,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <div style={{ filter: "drop-shadow(0 0 25px rgba(56,189,248,0.2))" }}>
          <SmallGhostSVG />
        </div>
      </motion.div>

      {/* ---- Small Ghost FAR RIGHT-TOP: blurred, background depth ---- */}
      <motion.div
        className="absolute z-[1]"
        style={{
          right: "15%",
          top: "25%",
          width: "clamp(60px, 9vw, 110px)",
          height: "auto",
          filter: "blur(4px)",
          opacity: 0.3,
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [2, -4, 2],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        <div style={{ filter: "drop-shadow(0 0 20px rgba(56,189,248,0.15))" }}>
          <SmallGhostSVG style={{ transform: "scaleX(-1)" }} />
        </div>
      </motion.div>

      {/* Fog / mist at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{
          background: "linear-gradient(to top, rgba(15,23,42,0.5), transparent)",
        }}
      />

      {/* Glowing blue particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-sky-300"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
            boxShadow: `0 0 ${p.size * 3}px rgba(56,189,248,0.5)`,
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.5, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
