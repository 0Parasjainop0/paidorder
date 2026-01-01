"use client"

import { useState, useRef } from 'react'

// 3D Isometric Server Illustration with interactive tilt
// Click + drag to rotate the image in 3D space

export function AnimatedTechCubes() {
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = () => {
        setIsDragging(true)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        // Smoothly reset rotation
        setRotation({ x: 0, y: 0 })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate rotation based on mouse position relative to center
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 25 // Max 25deg
        const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 15 // Max 15deg

        setRotation({ x: rotateX, y: rotateY })
    }

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false)
            setRotation({ x: 0, y: 0 })
        }
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-lg mx-auto h-[400px] select-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Ambient background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-gradient-to-br from-purple-500/20 via-cyan-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
            </div>

            {/* Platform glow at bottom */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-20 bg-gradient-to-t from-cyan-500/30 via-cyan-400/15 to-transparent blur-2xl animate-pulse pointer-events-none" style={{ animationDuration: '2.5s' }} />

            {/* Floating particles */}
            <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-cyan-400/70 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
            <div className="absolute top-[20%] right-[20%] w-2 h-2 bg-cyan-300/50 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            <div className="absolute top-[45%] left-[8%] w-1 h-1 bg-white/60 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            <div className="absolute top-[30%] right-[10%] w-1 h-1 bg-purple-400/60 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '3.5s', animationDelay: '2s' }} />
            <div className="absolute bottom-[35%] left-[12%] w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
            <div className="absolute bottom-[40%] right-[15%] w-1 h-1 bg-white/50 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '2.8s', animationDelay: '0.8s' }} />

            {/* Main floating image with 3D tilt */}
            <div
                className={`absolute inset-0 flex items-center justify-center ${isDragging ? '' : 'animate-float'}`}
                style={{
                    animationDuration: '4s',
                    perspective: '1000px'
                }}
            >
                <img
                    src="/hero-servers.png"
                    alt="Digital Platform Technology"
                    className={`w-full max-w-md h-auto cursor-grab active:cursor-grabbing hover:scale-110 ${isDragging ? '' : 'transition-transform duration-500'}`}
                    style={{
                        filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.3)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.2))',
                        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isDragging ? 'scale(1.05)' : ''}`,
                        transition: isDragging ? 'none' : 'transform 0.5s ease-out'
                    }}
                    draggable={false}
                />
            </div>

            {/* Drag hint */}
            {!isDragging && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/50 pointer-events-none">
                    Click & drag to rotate
                </div>
            )}
        </div>
    )
}

export default AnimatedTechCubes
