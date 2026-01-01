"use client"

import { useEffect, useState, useMemo } from "react"

export function Preloader() {
    const [isVisible, setIsVisible] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Organic progress increment with fewer updates (opt for performance)
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                const increment = Math.random() * 5 + 2 // Faster increments, fewer renders
                return Math.min(prev + increment, 100)
            })
        }, 80) // Reduced frequency for smoother UI thread

        const timer = setTimeout(() => setIsVisible(false), 2200)
        const removeTimer = setTimeout(() => setShouldRender(false), 3500)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
            clearTimeout(removeTimer)
        }
    }, [])

    // Memoize particles so they don't re-render/re-randomize on every progress tick
    const particles = useMemo(() => (
        [...Array(12)].map((_, i) => (
            <div
                key={i}
                className="absolute bg-white/20 rounded-full animate-float pointer-events-none"
                style={{
                    width: (Math.random() * 2 + 1) + 'px',
                    height: (Math.random() * 2 + 1) + 'px',
                    top: (Math.random() * 100) + '%',
                    left: (Math.random() * 100) + '%',
                    animationDelay: (Math.random() * 5) + 's',
                    animationDuration: (Math.random() * 10 + 10) + 's',
                    willChange: 'transform'
                }}
            />
        ))
    ), [])

    if (!shouldRender) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#020202] transition-all duration-1000 ease-linear ${isVisible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}
            style={{ willChange: 'opacity, visibility' }}
        >
            {/* Optimized Background Environment */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* 1. Static Mesh Gradient (Optimized Blurs) */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#3b82f610_0%,transparent_40%)] blur-[80px]" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#a855f708_0%,transparent_40%)] blur-[80px]" />
                </div>

                {/* 2. Low-cost Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />

                {/* 3. Static Particles */}
                {particles}

                {/* 4. Nebula Glows (Reduced Blur size for perf) */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ambient-500/5 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '-2s' }} />

                {/* 5. Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
            </div>

            {/* Center Logo Area */}
            <div className="relative flex flex-col items-center">
                {/* Animated Digitera Logo Container */}
                <div className="w-32 h-32 bg-white/[0.03] backdrop-blur-2xl rounded-3xl flex items-center justify-center p-4 border border-white/10 shadow-2xl shadow-ambient-500/10 animate-luxury-entrance">
                    <img
                        src="/logo.png"
                        alt="Digiteria Logo"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                        style={{ transform: 'translateZ(0)' }}
                    />
                </div>

                {/* Text Reveal */}
                <div className="mt-8 flex flex-col items-center">
                    <h1 className="text-3xl font-bold tracking-[0.2em] text-white animate-reveal opacity-0" style={{ animationDelay: "200ms" }}>
                        DIGITERIA
                    </h1>
                    <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-ambient-500/30 to-transparent mt-3 animate-reveal opacity-0" style={{ animationDelay: "400ms" }} />
                    <p className="text-[10px] text-ambient-400/60 tracking-[0.4em] uppercase mt-4 text-center animate-reveal opacity-0" style={{ animationDelay: "600ms" }}>
                        Software Solutions
                    </p>

                    {/* Highly Optimized Progress Bar */}
                    <div className="mt-12 w-48 h-[1px] bg-white/5 rounded-full overflow-hidden relative animate-reveal opacity-0" style={{ animationDelay: "800ms" }}>
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-ambient-600 to-ambient-400 transition-all duration-300 ease-out"
                            style={{ width: `${Math.floor(progress)}%`, willChange: 'width' }}
                        />
                    </div>

                    {/* Percentage Counter */}
                    <div className="mt-4 text-[9px] font-mono text-ambient-500/40 animate-reveal opacity-0 tracking-[0.3em] uppercase" style={{ animationDelay: "900ms" }}>
                        {Math.floor(progress)}%
                    </div>
                </div>
            </div>
        </div>
    )
}
