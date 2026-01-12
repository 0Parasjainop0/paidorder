"use client"

import { useEffect, useRef } from "react"

interface GlowingOrbsProps {
    orbCount?: number
    className?: string
}

export function GlowingOrbs({ orbCount = 3, className = "" }: GlowingOrbsProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {Array.from({ length: orbCount }).map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full animate-float-orb"
                    style={{
                        width: `${200 + i * 100}px`,
                        height: `${200 + i * 100}px`,
                        background: `radial-gradient(circle, rgba(59, 130, 246, ${0.15 - i * 0.03}) 0%, transparent 70%)`,
                        left: `${(i * 30) + 10}%`,
                        top: `${(i * 20) + 10}%`,
                        animationDelay: `${i * 2}s`,
                        animationDuration: `${15 + i * 5}s`,
                        filter: "blur(40px)"
                    }}
                />
            ))}
            {Array.from({ length: orbCount }).map((_, i) => (
                <div
                    key={`purple-${i}`}
                    className="absolute rounded-full animate-float-orb-reverse"
                    style={{
                        width: `${150 + i * 80}px`,
                        height: `${150 + i * 80}px`,
                        background: `radial-gradient(circle, rgba(139, 92, 246, ${0.12 - i * 0.02}) 0%, transparent 70%)`,
                        right: `${(i * 25) + 5}%`,
                        bottom: `${(i * 15) + 5}%`,
                        animationDelay: `${i * 3}s`,
                        animationDuration: `${18 + i * 4}s`,
                        filter: "blur(50px)"
                    }}
                />
            ))}
        </div>
    )
}

export function GridPattern({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px"
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
                    backgroundSize: "120px 120px"
                }}
            />
        </div>
    )
}

export function FloatingShapes({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Floating geometric shapes */}
            <div
                className="absolute w-32 h-32 border border-ambient-500/10 rounded-3xl animate-spin-slow"
                style={{ top: "10%", left: "5%", animationDuration: "25s" }}
            />
            <div
                className="absolute w-24 h-24 border border-purple-500/10 rounded-2xl animate-spin-slow-reverse"
                style={{ top: "60%", right: "8%", animationDuration: "30s" }}
            />
            <div
                className="absolute w-16 h-16 bg-gradient-to-br from-ambient-500/5 to-transparent rounded-xl animate-float"
                style={{ top: "30%", right: "15%", animationDuration: "8s" }}
            />
            <div
                className="absolute w-20 h-20 border border-ambient-400/10 rotate-45 animate-float"
                style={{ bottom: "20%", left: "10%", animationDelay: "2s", animationDuration: "10s" }}
            />

            {/* Glowing dots */}
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-ambient-400 rounded-full animate-pulse-glow"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animationDelay: `${i * 0.5}s`,
                        boxShadow: "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)"
                    }}
                />
            ))}
        </div>
    )
}

export function AuroraBackground({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <div className="absolute inset-0 opacity-30">
                <div
                    className="absolute w-full h-1/2 animate-aurora-1"
                    style={{
                        background: "linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                        filter: "blur(100px)",
                        transform: "translateY(-50%)"
                    }}
                />
                <div
                    className="absolute w-full h-1/2 animate-aurora-2"
                    style={{
                        background: "linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.08), transparent)",
                        filter: "blur(120px)",
                        transform: "translateY(-30%)"
                    }}
                />
                <div
                    className="absolute w-full h-1/3 animate-aurora-3"
                    style={{
                        background: "linear-gradient(180deg, transparent, rgba(16, 185, 129, 0.06), transparent)",
                        filter: "blur(80px)",
                        transform: "translateY(-20%)"
                    }}
                />
            </div>
        </div>
    )
}

export function SparkleEffect({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-sparkle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                    }}
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" className="text-ambient-400/50">
                        <path
                            d="M5 0L5.5 4.5L10 5L5.5 5.5L5 10L4.5 5.5L0 5L4.5 4.5L5 0Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            ))}
        </div>
    )
}

export function CyberGrid({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Perspective grid */}
            <div
                className="absolute inset-x-0 bottom-0 h-[40vh] opacity-20"
                style={{
                    background: `
            linear-gradient(transparent 0%, rgba(59, 130, 246, 0.1) 100%),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(59, 130, 246, 0.3) 60px),
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(59, 130, 246, 0.3) 60px)
          `,
                    backgroundSize: "100% 100%, 60px 60px, 60px 60px",
                    transform: "perspective(500px) rotateX(60deg)",
                    transformOrigin: "bottom"
                }}
            />

            {/* Scan line effect */}
            <div className="absolute inset-0 animate-scan-line opacity-5">
                <div
                    className="w-full h-px bg-gradient-to-r from-transparent via-ambient-400 to-transparent"
                />
            </div>
        </div>
    )
}
