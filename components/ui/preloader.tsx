"use client"

import { useEffect, useState, useMemo } from "react"

const LOADING_STATUSES = [
    "INITIALIZING CORE...",
    "LOADING ASSETS...",
    "VIRTUALIZING UI...",
    "SYSTEM READY"
]

export function Preloader() {
    const [isVisible, setIsVisible] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)
    const [progress, setProgress] = useState(0)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [statusIndex, setStatusIndex] = useState(0)

    useEffect(() => {
        // High-end mouse tracking (optimized with RequestAnimationFrame style)
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 15,
                y: (e.clientY / window.innerHeight - 0.5) * 15
            })
        }
        window.addEventListener("mousemove", handleMouseMove)

        // Progress & Status Logic
        const startTime = Date.now()
        const duration = 2500 // 2.5s total load

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const newProgress = Math.min((elapsed / duration) * 100, 100)
            setProgress(newProgress)

            // Dynamic Status Scaling
            const currentStatus = Math.floor((newProgress / 100) * (LOADING_STATUSES.length - 1))
            setStatusIndex(currentStatus)

            if (newProgress >= 100) {
                clearInterval(interval)
                setTimeout(() => setIsVisible(false), 500)
            }
        }, 16)

        const removeTimer = setTimeout(() => setShouldRender(false), 4500)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            clearInterval(interval)
            clearTimeout(removeTimer)
        }
    }, [])

    const particles = useMemo(() => (
        [...Array(25)].map((_, i) => (
            <div
                key={i}
                className="absolute bg-white/10 rounded-full animate-pulse pointer-events-none"
                style={{
                    width: (Math.random() * 2 + 0.5) + 'px',
                    height: (Math.random() * 2 + 0.5) + 'px',
                    top: (Math.random() * 100) + '%',
                    left: (Math.random() * 100) + '%',
                    animationDelay: (Math.random() * 5) + 's',
                    animationDuration: (Math.random() * 3 + 2) + 's',
                }}
            />
        ))
    ), [])

    if (!shouldRender) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#020202] transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
                }`}
        >
            {/* 🌌 MAX LEVEL BACKGROUND ENVIRONMENT */}
            <div
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-1000 ease-out"
                style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
            >
                {/* Nebula Core */}
                <div className="absolute inset-0">
                    <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-ambient-500/5 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-[20%] right-[20%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '-3s' }} />
                </div>

                {/* Cyber Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

                {/* Floating Tech Debris / Particles */}
                {particles}

                {/* Grainy Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150 brightness-150" />
            </div>

            {/* 🏗️ CORE INTERFACE */}
            <div className="relative flex flex-col items-center">

                {/* LOGO HUD */}
                <div className="relative group p-8">
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-spin-slow opacity-20" />
                    <div className="absolute inset-2 border border-ambient-500/10 rounded-full animate-reverse-spin opacity-20" />

                    {/* Main Container */}
                    <div className="relative w-32 h-32 bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-luxury-entrance overflow-hidden">
                        {/* Scanning Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ambient-500/10 to-transparent h-1/2 w-full -translate-y-full animate-scan-slow pointer-events-none select-none" />

                        <img
                            src="/logo.png"
                            alt="Digiteria Logo"
                            className="w-16 h-16 object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    {/* Corner Brackets */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-ambient-500/30 rounded-tl-sm" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/10 rounded-tr-sm" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/10 rounded-bl-sm" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-ambient-500/30 rounded-br-sm" />
                </div>

                {/* BRAND REVEAL */}
                <div className="mt-10 flex flex-col items-center">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-ambient-500/50" />
                        <span className="text-[10px] font-mono tracking-[0.5em] text-ambient-500/80 animate-pulse">SYSTEM CORE</span>
                        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-ambient-500/50" />
                    </div>

                    {/* Staggered Letter Reveal */}
                    <h1 className="text-4xl font-black tracking-[0.25em] text-white flex items-center select-none">
                        {"DIGITERIA".split("").map((char, i) => (
                            <span
                                key={i}
                                className="animate-reveal inline-block opacity-0"
                                style={{ animationDelay: `${400 + (i * 60)}ms` }}
                            >
                                {char}
                            </span>
                        ))}
                    </h1>

                    {/* Dynamic Subtext */}
                    <div className="mt-4 flex flex-col items-center">
                        <div className="h-4 overflow-hidden">
                            <p className="text-[9px] font-mono text-ambient-400/40 tracking-[0.4em] uppercase animate-reveal opacity-0" style={{ animationDelay: "1200ms" }}>
                                {LOADING_STATUSES[statusIndex]}
                            </p>
                        </div>
                    </div>

                    {/* MAX LEVEL PROGRESS UNIT */}
                    <div className="mt-10 relative w-64">
                        {/* Progress Label */}
                        <div className="flex justify-between items-end mb-2 px-1">
                            <span className="text-[8px] font-mono text-white/20 tracking-tighter">DATA LINK STABLE</span>
                            <span className="text-[10px] font-mono text-ambient-400 leading-none">{Math.floor(progress)}%</span>
                        </div>

                        {/* Outer Track */}
                        <div className="h-[2px] w-full bg-white/[0.03] rounded-full overflow-hidden relative">
                            {/* Inner Lead */}
                            <div
                                className="absolute h-full left-0 bg-gradient-to-r from-ambient-600 via-ambient-400 to-white shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-200 ease-out"
                                style={{ width: `${progress}%` }}
                            >
                                {/* Glow Cap */}
                                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/40 blur-sm" />
                            </div>
                        </div>

                        {/* Binary Rain (Decoration) */}
                        <div className="mt-2 flex justify-center space-x-1 opacity-10 font-mono text-[7px] text-white">
                            <span>{Math.random() > 0.5 ? '1' : '0'}</span>
                            <span>{Math.random() > 0.5 ? '1' : '0'}</span>
                            <span>{Math.random() > 0.5 ? '1' : '0'}</span>
                            <span>{Math.random() > 0.5 ? '1' : '0'}</span>
                            <span>{Math.random() > 0.5 ? '1' : '0'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Aesthetic Borders */}
            <div className="fixed inset-8 border border-white/5 rounded-[3rem] pointer-events-none opacity-20" />
            <div className="fixed inset-[2.5rem] border border-white/[0.02] rounded-[3.5rem] pointer-events-none opacity-10" />
        </div>
    )
}
