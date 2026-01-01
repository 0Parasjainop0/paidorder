"use client"

import { useEffect, useState } from "react"

export function Preloader() {
    const [isVisible, setIsVisible] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)
    const [progress, setProgress] = useState(0)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            })
        }
        window.addEventListener("mousemove", handleMouseMove)

        // Handle progress increment
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + Math.random() * 2 // Organic progress
            })
        }, 30)

        // Start exit animation after 1.8s
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 1800)

        // Completely remove from DOM after 3s
        const removeTimer = setTimeout(() => {
            setShouldRender(false)
        }, 3000)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            clearInterval(interval)
            clearTimeout(timer)
            clearTimeout(removeTimer)
        }
    }, [])

    if (!shouldRender) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#020203] transition-all duration-1000 ease-in-out ${isVisible ? "opacity-100 visible" : "opacity-0 invisible scale-110 pointer-events-none"
                }`}
        >
            {/* Advanced Dynamic Environment */}
            <div
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-700 ease-out"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
            >
                {/* 1. Deep Space Mesh Gradient */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#3b82f615_0%,transparent_50%)]" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#a855f710_0%,transparent_50%)]" />
                </div>

                {/* 2. Interactive Grid System */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]"
                    style={{ transform: `perspective(1000px) rotateX(10deg)` }}
                />

                {/* 3. Nebula Glows */}
                <div className="absolute top-[-30%] left-[-20%] w-[100%] h-[100%] bg-ambient-600/10 rounded-full blur-[180px] animate-pulse-glow" />
                <div className="absolute bottom-[-30%] right-[-20%] w-[100%] h-[100%] bg-purple-600/10 rounded-full blur-[180px] animate-pulse-glow" style={{ animationDelay: '-2s' }} />

                {/* 4. Scanline / Grain Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150" />

                {/* 5. Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
            </div>

            {/* Center Logo Area */}
            <div className="relative flex flex-col items-center">
                {/* Animated Digitera Logo Container */}
                <div className="w-32 h-32 bg-white/5 backdrop-blur-3xl rounded-3xl flex items-center justify-center p-4 border border-white/10 shadow-2xl shadow-ambient-500/20 animate-luxury-entrance">
                    <img
                        src="/logo.png"
                        alt="Digiteria Logo"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    />
                </div>

                {/* Text Reveal */}
                <div className="mt-8 overflow-hidden flex flex-col items-center">
                    <h1 className="text-3xl font-bold tracking-[0.2em] text-white animate-reveal opacity-0" style={{ animationDelay: "200ms" }}>
                        DIGITERIA
                    </h1>
                    <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-ambient-500/50 to-transparent mt-2 animate-reveal opacity-0" style={{ animationDelay: "400ms" }} />
                    <p className="text-[10px] text-ambient-400 tracking-[0.4em] uppercase mt-3 text-center animate-reveal opacity-0" style={{ animationDelay: "600ms" }}>
                        Software Solutions
                    </p>

                    {/* Progress Bar Container */}
                    <div className="mt-10 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative animate-reveal opacity-0" style={{ animationDelay: "800ms" }}>
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-ambient-600 to-ambient-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300 ease-out"
                            style={{ width: `${Math.floor(progress)}%` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                    </div>

                    {/* Percentage Counter */}
                    <div className="mt-3 text-[10px] font-mono text-ambient-500/70 animate-reveal opacity-0 tracking-[0.3em] uppercase" style={{ animationDelay: "900ms" }}>
                        {Math.floor(progress)}% Loading
                    </div>
                </div>
            </div>
        </div>
    )
}
