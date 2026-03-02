"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Golden floating particles
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 5 + 2,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 3,
}))

// Light rays configuration
const rays = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  rotation: i * 30,
  delay: i * 0.2,
}))

// Temple silhouette SVG inline
function TempleSilhouette() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full opacity-20"
      viewBox="0 0 1200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Main temple center */}
      <path
        d="M500 300 L500 120 L520 100 L540 60 L560 30 L580 10 L600 0 L620 10 L640 30 L660 60 L680 100 L700 120 L700 300Z"
        fill="rgba(120,60,0,0.4)"
      />
      {/* Center dome */}
      <ellipse cx="600" cy="50" rx="30" ry="25" fill="rgba(180,120,0,0.3)" />
      {/* Kalash on top */}
      <path d="M595 25 L600 5 L605 25" fill="rgba(218,165,32,0.5)" />
      {/* Left temple */}
      <path
        d="M200 300 L200 180 L220 160 L240 130 L260 110 L280 100 L300 110 L320 130 L340 160 L360 180 L360 300Z"
        fill="rgba(120,60,0,0.3)"
      />
      <ellipse cx="280" cy="115" rx="20" ry="18" fill="rgba(180,120,0,0.2)" />
      {/* Right temple */}
      <path
        d="M840 300 L840 180 L860 160 L880 130 L900 110 L920 100 L940 110 L960 130 L980 160 L1000 180 L1000 300Z"
        fill="rgba(120,60,0,0.3)"
      />
      <ellipse cx="920" cy="115" rx="20" ry="18" fill="rgba(180,120,0,0.2)" />
      {/* Steps/base */}
      <rect x="0" y="280" width="1200" height="20" fill="rgba(100,50,0,0.3)" />
      <rect x="100" y="270" width="1000" height="10" fill="rgba(100,50,0,0.2)" />
      {/* Small pillars left */}
      <rect x="420" y="160" width="12" height="140" fill="rgba(120,60,0,0.35)" />
      <rect x="460" y="140" width="12" height="160" fill="rgba(120,60,0,0.35)" />
      {/* Small pillars right */}
      <rect x="728" y="160" width="12" height="140" fill="rgba(120,60,0,0.35)" />
      <rect x="768" y="140" width="12" height="160" fill="rgba(120,60,0,0.35)" />
    </svg>
  )
}

export function HanumanBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Golden-orange to deep saffron gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #f59e0b, #d97706, #b45309, #78350f, #451a03)",
        }}
      />

      {/* Radiating light rays from center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {rays.map((ray) => (
          <motion.div
            key={ray.id}
            className="absolute w-[2px] origin-bottom"
            style={{
              height: "60vh",
              transform: `rotate(${ray.rotation}deg)`,
              background:
                "linear-gradient(to top, rgba(255,215,0,0.15), rgba(255,215,0,0.02), transparent)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: ray.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hanuman divine illustration with blur */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Image
            src="/images/hanuman.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              filter: "blur(2px) brightness(0.6) saturate(1.3)",
              mixBlendMode: "luminosity",
              opacity: 0.35,
            }}
            priority
          />
        </motion.div>

        {/* Glowing divine aura behind image */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "45vh",
            height: "45vh",
            background:
              "radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,165,0,0.15) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Temple silhouette layer */}
      <TempleSilhouette />

      {/* Floating golden light particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, rgba(255,215,0,0.9), rgba(255,165,0,0.5))",
            boxShadow: `0 0 ${p.size * 3}px rgba(255,215,0,0.4)`,
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.6, 1],
            y: [0, -40, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Fog / haze overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center 60%, rgba(255,200,50,0.08) 0%, transparent 60%)",
        }}
      />
    </div>
  )
}
