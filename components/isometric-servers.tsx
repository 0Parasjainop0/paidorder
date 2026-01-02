"use client"

import React from "react"

export function IsometricServers() {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative perspective-container">
            <style jsx global>{`
        .perspective-container {
          perspective: 1000px;
        }
        .isometric-scene {
          transform: rotateX(60deg) rotateZ(-45deg);
          transform-style: preserve-3d;
        }
        .cube {
          transform-style: preserve-3d;
          position: absolute;
        }
        .face {
          position: absolute;
          backface-visibility: hidden;
        }
        
        /* Server Cube Dimensions: 60x60x100 (w,d,h) for example */
        .server-cube {
          width: 80px;
          height: 80px;
        }
        .server-face-front { transform: rotateY(0deg) translateZ(40px); width: 80px; height: 120px; }
        .server-face-back  { transform: rotateY(180deg) translateZ(40px); width: 80px; height: 120px; }
        .server-face-right { transform: rotateY(90deg) translateZ(40px); width: 80px; height: 120px; }
        .server-face-left  { transform: rotateY(-90deg) translateZ(40px); width: 80px; height: 120px; }
        .server-face-top   { transform: rotateX(90deg) translateZ(60px); width: 80px; height: 80px; }
        .server-face-bottom{ transform: rotateX(-90deg) translateZ(60px); width: 80px; height: 80px; }

        /* Small Cube Dimensions: 60x60x60 */
        .small-cube {
          width: 60px;
          height: 60px;
        }
        .small-face-front { transform: rotateY(0deg) translateZ(30px); width: 60px; height: 60px; }
        .small-face-back  { transform: rotateY(180deg) translateZ(30px); width: 60px; height: 60px; }
        .small-face-right { transform: rotateY(90deg) translateZ(30px); width: 60px; height: 60px; }
        .small-face-left  { transform: rotateY(-90deg) translateZ(30px); width: 60px; height: 60px; }
        .small-face-top   { transform: rotateX(90deg) translateZ(30px); width: 60px; height: 60px; }

        .neon-glow {
          box-shadow: 0 0 10px rgba(6,182,212,0.5), inset 0 0 20px rgba(6,182,212,0.2);
        }
        
        @keyframes float {
          0%, 100% { transform: translateZ(0px); }
          50% { transform: translateZ(10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

            {/* Scene Container */}
            <div className="isometric-scene relative w-[300px] h-[300px]">
                {/* Base Platform */}
                <div className="absolute inset-0 bg-gray-900/90 border-2 border-cyan-500 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.3)] transform translate-z-[-10px]"
                    style={{ transform: 'translateZ(-20px)', borderRadius: '40px' }}>
                    <div className="absolute inset-2 border border-cyan-500/30 rounded-[32px]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-[40px]" />
                </div>

                {/* Server 1 (Back) */}
                <div className="cube server-cube absolute top-10 left-10 animate-float" style={{ animationDelay: '0s' }}>
                    <ServerCube color="purple" />
                </div>

                {/* Server 2 (Right) */}
                <div className="cube server-cube absolute top-10 right-10 animate-float" style={{ animationDelay: '1s' }}>
                    <ServerCube color="purple" />
                </div>

                {/* Server 3 (Left) */}
                <div className="cube server-cube absolute bottom-10 left-10 animate-float" style={{ animationDelay: '2s' }}>
                    <ServerCube color="purple" />
                </div>

                {/* Center Power Cube */}
                <div className="cube small-cube absolute bottom-10 right-10 z-10 animate-float" style={{ animationDelay: '0.5s', transform: 'translate3d(0,0,20px)' }}>
                    <PowerCube />
                </div>
            </div>
        </div>
    )
}

function ServerCube({ color }: { color: string }) {
    // Gradients matching the reference image's purple/pink/cyan aesthetic
    const sideGradient = "bg-gradient-to-b from-[#A855F7] to-[#7C3AED]" // Lighter to Darker Purple
    const topGradient = "bg-[#C084FC]" // Top face lighter
    const glow = "shadow-[0_0_20px_rgba(168,85,247,0.4)]"

    return (
        <>
            <div className={`face server-face-front ${sideGradient} border border-white/10 ${glow} flex flex-col items-center justify-center gap-2 p-2`}>
                {/* Server Racks / Lights */}
                <div className="w-full h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                <div className="w-full h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.8)] opacity-50" />
                <div className="w-3/4 h-1 bg-yellow-400 rounded-full shadow-[0_0_5px_rgba(250,204,21,0.8)] self-start" />
                <div className="flex gap-1 w-full mt-4">
                    <div className="w-1 h-8 bg-black/20 rounded-full" />
                    <div className="w-1 h-8 bg-black/20 rounded-full" />
                    <div className="w-1 h-8 bg-black/20 rounded-full" />
                </div>
            </div>
            <div className={`face server-face-back ${sideGradient}`} />
            <div className={`face server-face-right ${sideGradient} brightness-90 border-l border-white/10 flex flex-col pt-4 px-3 gap-3`}>
                {/* Side details */}
                <div className="w-full h-2 bg-black/20 rounded-full" />
                <div className="w-2/3 h-2 bg-black/20 rounded-full" />
                <div className="grid grid-cols-2 gap-2 mt-auto mb-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]" />
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]" />
                </div>
            </div>
            <div className={`face server-face-left ${sideGradient} brightness-110`} />
            <div className={`face server-face-top ${topGradient} border border-white/20 grid place-items-center`}>
                <div className="w-12 h-12 bg-cyan-300/20 rounded-lg shadow-[inset_0_0_10px_rgba(34,211,238,0.5)] box-border border border-cyan-200/50" />
            </div>
            <div className={`face server-face-bottom ${sideGradient}`} />
        </>
    )
}

function PowerCube() {
    const baseBlack = "bg-[#111827]"
    const border = "border border-cyan-500/50"
    const glow = "shadow-[0_0_30px_rgba(6,182,212,0.4)]"

    return (
        <>
            <div className={`face small-face-front ${baseBlack} ${border} ${glow} flex items-center justify-center`}>
                <BoltIcon />
            </div>
            <div className={`face small-face-back ${baseBlack}`} />
            <div className={`face small-face-right ${baseBlack} ${border} flex items-center justify-center`}>
                <BoltIcon />
            </div>
            <div className={`face small-face-left ${baseBlack}`} />
            <div className={`face small-face-top ${baseBlack} ${border} flex items-center justify-center`}>
                <BoltIcon />
            </div>
        </>
    )
}

function BoltIcon() {
    return (
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,1)]">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
            </svg>
        </div>
    )
}
