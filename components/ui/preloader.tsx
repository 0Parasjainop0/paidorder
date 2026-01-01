"use client"

import { useEffect, useState } from "react"

export function Preloader() {
    const [isVisible, setIsVisible] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Handle progress increment
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 1
            })
        }, 12) // Approx 100 steps over 1.2s

        // Start exit animation after 1.5s
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 1500)

        // Completely remove from DOM after 2.5s (timer + transition)
        const removeTimer = setTimeout(() => {
            setShouldRender(false)
        }, 2500)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
            clearTimeout(removeTimer)
        }
    }, [])

    if (!shouldRender) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303] transition-all duration-1000 ease-in-out ${isVisible ? "opacity-100 visible" : "opacity-0 invisible scale-110 pointer-events-none"
                }`}
        >
            {/* Background Grid & Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-ambient-500/10 rounded-full blur-[120px] animate-float-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-float" />
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
                            style={{ width: `${progress}%` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                    </div>

                    {/* Percentage Counter */}
                    <div className="mt-3 text-[10px] font-mono text-ambient-500/70 animate-reveal opacity-0 tracking-[0.3em] uppercase" style={{ animationDelay: "900ms" }}>
                        {progress}% Loading
                    </div>
                </div>
            </div>
        </div>
    )
}
