"use client"

import { IsometricServers } from "@/components/isometric-servers"

export function AnimatedTechCubes() {
    return (
        <div className="relative w-full max-w-lg mx-auto h-[400px] select-none flex items-center justify-center">
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

            {/* 3D CSS Component Replacement */}
            <div className="scale-125 transform-gpu hover:scale-150 transition-transform duration-700">
                <IsometricServers />
            </div>

            {/* Drag hint removed as standard CSS hover/float is used */}
        </div>
    )
}

export default AnimatedTechCubes
