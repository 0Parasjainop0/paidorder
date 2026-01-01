"use client"

import { useEffect, useState, useMemo } from "react"

const LOADING_STATUSES = [
    "SYNCING NEURAL LINK...",
    "DECRYPTING CORE ASSETS...",
    "VIRTUALIZING ENVIRONMENT...",
    "BYPASSING FIREWALL...",
    "SYSTEM BREACH SUCCESSFUL"
]

export function Preloader() {
    const [isVisible, setIsVisible] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)
    const [progress, setProgress] = useState(0)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [statusIndex, setStatusIndex] = useState(0)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Smoothly interpolate the target position
            requestAnimationFrame(() => {
                setMousePos({
                    x: (e.clientX / window.innerWidth - 0.5) * 30,
                    y: (e.clientY / window.innerHeight - 0.5) * 30
                })
            })
        }
        window.addEventListener("mousemove", handleMouseMove)

        const startTime = Date.now()
        const duration = 2800 // Slightly longer for the new effects

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const newProgress = Math.min((elapsed / duration) * 100, 100)
            setProgress(newProgress)

            const currentStatus = Math.floor((newProgress / 100) * (LOADING_STATUSES.length - 1))
            setStatusIndex(currentStatus)

            if (newProgress >= 100) {
                clearInterval(interval)
                setTimeout(() => setIsVisible(false), 800)
            }
        }, 16)

        const removeTimer = setTimeout(() => setShouldRender(false), 5000)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            clearInterval(interval)
            clearTimeout(removeTimer)
        }
    }, [])

    // Memoize layers for performance
    const bgElements = useMemo(() => (
        <>
            {/* Deep Space Stars - Deep Layer (Slowest) */}
            <div className="absolute inset-0">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={`star-d-${i}`}
                        className="absolute bg-white/10 rounded-full animate-pulse"
                        style={{
                            width: '1px',
                            height: '1px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDuration: (Math.random() * 3 + 2) + 's',
                            animationDelay: Math.random() * 5 + 's'
                        }}
                    />
                ))}
            </div>

            {/* Glowing Tech Nodes - Mid Layer */}
            <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`node-${i}`}
                        className="absolute w-1 h-1 bg-ambient-500/20 rounded-full blur-[2px] animate-float"
                        style={{
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDelay: i * 0.5 + 's',
                            animationDuration: '6s'
                        }}
                    >
                        <div className="absolute inset-0 bg-ambient-400 rounded-full animate-ping opacity-40" />
                    </div>
                ))}
            </div>
        </>
    ), [])

    if (!shouldRender) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#010102] transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? "opacity-100" : "opacity-0 invisible pointer-events-none"
                }`}
        >
            {/* 🌌 ULTIMATE PARALLAX BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                {/* Layer 1: Deep Nebula (Slow Parallax) */}
                <div
                    className="absolute inset-[-10%] transition-transform duration-1000 ease-out opacity-40"
                    style={{ transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0) scale(1.1)` }}
                >
                    <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,#3b82f608_0%,transparent_70%)] blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,#a855f705_0%,transparent_70%)] blur-[120px]" />
                </div>

                {/* Layer 2: Starfield & Grid (Medium Parallax) */}
                <div
                    className="absolute inset-[-5%] transition-transform duration-700 ease-out"
                    style={{ transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)` }}
                >
                    {bgElements}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,#000_30%,transparent_100%)] opacity-40" />
                </div>

                {/* Layer 3: Interactive Lens Flares (Fast Parallax) */}
                <div
                    className="absolute inset-0 transition-transform duration-500 ease-out"
                    style={{ transform: `translate3d(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px, 0)` }}
                >
                    <div className="absolute top-[30%] left-[20%] w-px h-64 bg-gradient-to-b from-transparent via-ambient-500/10 to-transparent rotate-[30deg] blur-md" />
                    <div className="absolute bottom-[20%] right-[30%] w-px h-64 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent rotate-[30deg] blur-md" />
                </div>

                {/* Layer 4: Floating "Data Streams" */}
                <div className="absolute inset-0 opacity-20">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={`stream-${i}`}
                            className="absolute h-px w-full bg-gradient-to-r from-transparent via-ambient-500/20 to-transparent animate-shimmer"
                            style={{ top: (25 + i * 25) + '%', animationDuration: (3 + i) + 's' }}
                        />
                    ))}
                </div>

                {/* Post-Processing */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] contrast-150 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,1,2,0.9)_100%)]" />
            </div>

            {/* 🏗️ MAIN INTERFACE UNIT */}
            <div
                className="relative flex flex-col items-center transition-transform duration-500"
                style={{ transform: `perspective(1000px) rotateX(${mousePos.y * -0.1}deg) rotateY(${mousePos.x * 0.1}deg)` }}
            >

                {/* HUD LOGO CONTAINER */}
                <div className="relative group p-10">
                    {/* Multi-Ring Tech System */}
                    <div className="absolute inset-0 border-[0.5px] border-white/5 rounded-full animate-spin-slow opacity-10" />
                    <div className="absolute inset-4 border border-ambient-500/10 rounded-full animate-reverse-spin opacity-20" />
                    <div className="absolute inset-8 border border-white/5 rounded-full animate-spin-slow opacity-10" style={{ animationDuration: '15s' }} />

                    {/* Glowing Core */}
                    <div className="absolute inset-0 bg-ambient-500/5 rounded-full blur-3xl animate-pulse" />

                    <div className="relative w-36 h-36 bg-[#030304]/80 backdrop-blur-3xl rounded-[2.75rem] flex items-center justify-center border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] animate-luxury-entrance overflow-hidden">
                        {/* Vertical Scanning Pulse */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ambient-400/20 to-transparent h-1/3 w-full -translate-y-full animate-scan-slow" />

                        <img
                            src="/logo.png"
                            alt="Digiteria Logo"
                            className="w-16 h-16 object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]"
                        />
                    </div>

                    {/* Cybernetic Accents */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-ambient-500/40 rounded-tl-lg" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-ambient-500/40 rounded-br-lg" />
                </div>

                {/* BRAND ARCHITECTURE */}
                <div className="mt-8 flex flex-col items-center">
                    <div className="flex items-center space-x-3 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-ambient-500 animate-ping" />
                        <span className="text-[9px] font-mono tracking-[0.6em] text-ambient-400/80 font-bold">DIGITAL CORE ONLINE</span>
                    </div>

                    <h1 className="text-5xl font-black tracking-[0.3em] text-white flex items-center select-none drop-shadow-2xl">
                        {"DIGITERIA".split("").map((char, i) => (
                            <span
                                key={i}
                                className="animate-reveal inline-block opacity-0"
                                style={{ animationDelay: `${500 + (i * 70)}ms` }}
                            >
                                {char}
                            </span>
                        ))}
                    </h1>

                    {/* HUD Status Bar */}
                    <div className="mt-6 flex flex-col items-center w-full max-w-[280px]">
                        <div className="flex justify-between w-full text-[8px] font-mono text-white/30 uppercase tracking-[0.2em] mb-3">
                            <span>Status: {LOADING_STATUSES[statusIndex]}</span>
                            <span>{Math.floor(progress)}%</span>
                        </div>

                        {/* High-Precision Progress Bar */}
                        <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden relative">
                            <div
                                className="absolute h-full left-0 bg-gradient-to-r from-ambient-600 via-ambient-400 to-white shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Decorative HUD Metrics */}
                        <div className="mt-4 flex justify-between w-full opacity-20 font-mono text-[7px] text-white">
                            <div className="flex space-x-2">
                                <span>SEC_LINK: ACTIVE</span>
                                <span>LATENCY: 12ms</span>
                            </div>
                            <div className="animate-pulse">BOOTING...</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ambient Perimeter HUD */}
            <div className="fixed inset-6 border border-white/5 rounded-[4rem] pointer-events-none opacity-20 border-dashed" />
            <div className="fixed inset-4 border border-white/[0.02] rounded-[4.5rem] pointer-events-none opacity-10" />
        </div>
    )
}
