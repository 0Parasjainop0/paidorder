"use client"

import React from "react"

export function IsometricServers() {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative perspective-container select-none pointer-events-none">
            <style jsx global>{`
        .perspective-container {
          perspective: 1000px;
        }
        .isometric-scene {
          transform: rotateX(60deg) rotateZ(45deg);
          transform-style: preserve-3d;
        }
        
        /* 3D Space Setup */
        .cube-container {
            transform-style: preserve-3d;
            position: absolute;
            transition: transform 0.3s ease;
        }

        /* Server Dimensions: 70px x 70px Width, 100px Height */
        
        .face {
            position: absolute;
            transform-origin: center;
            backface-visibility: hidden;
            /* Use a tiny border to prevent sub-pixel gaps */
            outline: 1px solid transparent; 
        }

        /* -- Server Faces -- */
        .s-face { width: 70px; }
        
        /* Side Faces (Vertical), 70x100 */
        .s-side {
            height: 100px;
            top: -50px; /* Center vert */
            left: -35px; /* Center horz */
        }
        
        /* Top/Bottom Faces (Horizontal), 70x70 */
        .s-cap {
            height: 70px;
            top: -35px;
            left: -35px;
        }

        /* Transforms */
        /* Z-translate = Half dimension */
        .s-f-front { transform: rotateY(0deg) translateZ(35px); }
        .s-f-back  { transform: rotateY(180deg) translateZ(35px); }
        .s-f-right { transform: rotateY(90deg) translateZ(35px); }
        .s-f-left  { transform: rotateY(-90deg) translateZ(35px); }
        .s-f-top   { transform: rotateX(90deg) translateZ(50px); } /* Half height */
        .s-f-bottom{ transform: rotateX(-90deg) translateZ(50px); }

        /* -- Power Cube Faces -- */
        /* 50x50x50 */
        .p-face { width: 50px; height: 50px; top: -25px; left: -25px; }
        
        .p-f-front { transform: rotateY(0deg) translateZ(25px); }
        .p-f-back  { transform: rotateY(180deg) translateZ(25px); }
        .p-f-right { transform: rotateY(90deg) translateZ(25px); }
        .p-f-left  { transform: rotateY(-90deg) translateZ(25px); }
        .p-f-top   { transform: rotateX(90deg) translateZ(25px); }
        .p-f-bottom{ transform: rotateX(-90deg) translateZ(25px); }

        /* Animation */
        @keyframes float-server {
          0%, 100% { transform: translateZ(0px); }
          50% { transform: translateZ(10px); }
        }
        .animate-float-s { animation: float-server 4s ease-in-out infinite; }
      `}</style>

            {/* Main Scene Container */}
            <div className="isometric-scene relative w-0 h-0">

                {/* 1. Base Platform */}
                <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) translateZ(-40px)' }}>
                    <div className="w-[260px] h-[260px] bg-[#050b14] rounded-[50px] border-4 border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.15)] relative overflow-hidden">
                        {/* Inner detail */}
                        <div className="absolute inset-4 border border-cyan-500/20 rounded-[40px] opacity-50" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-cyan-500/10" />
                        {/* Glow Center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 blur-[50px] rounded-full" />
                    </div>
                </div>

                {/* Back Server */}
                <div className="cube-container animate-float-s" style={{ top: '-60px', left: '-60px', zIndex: 10 }}>
                    <ServerCube />
                </div>

                {/* Right Server */}
                <div className="cube-container animate-float-s" style={{ top: '-60px', left: '60px', zIndex: 20, animationDelay: '1s' }}>
                    <ServerCube />
                </div>

                {/* Left Server */}
                <div className="cube-container animate-float-s" style={{ top: '60px', left: '-60px', zIndex: 20, animationDelay: '1.5s' }}>
                    <ServerCube />
                </div>

                {/* Power Cube (Front) */}
                <div className="cube-container animate-float-s" style={{ top: '60px', left: '60px', zIndex: 30, animationDelay: '0.5s' }}>
                    <PowerCube />
                </div>

            </div>
        </div>
    )
}

function ServerCube() {
    return (
        <>
            <div className="face s-face s-side s-f-front bg-[#8B5CF6] border-2 border-[#7C3AED]/50 flex flex-col items-center justify-center p-3 gap-3 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
                {/* Details */}
                <div className="w-full h-1 bg-cyan-300 rounded-full shadow-[0_0_8px_cyan]" />
                <div className="w-2/3 self-start h-1 bg-purple-300 rounded-full opacity-50" />
                <div className="mt-auto w-full grid grid-cols-3 gap-1">
                    <div className="h-6 w-full bg-black/20 rounded" />
                    <div className="h-6 w-full bg-black/20 rounded" />
                    <div className="h-6 w-full bg-black/20 rounded" />
                </div>
            </div>

            <div className="face s-face s-side s-f-back bg-[#5B21B6]" />

            <div className="face s-face s-side s-f-right bg-[#6D28D9] border-l border-black/20 flex flex-col p-4 gap-2">
                <div className="w-full h-1.5 bg-black/30 rounded-full" />
                <div className="w-3/4 h-1.5 bg-black/30 rounded-full" />
                <div className="w-1/2 h-1.5 bg-black/30 rounded-full" />
            </div>

            <div className="face s-face s-side s-f-left bg-[#7C3AED]" />

            <div className="face s-face s-cap s-f-top bg-[#A78BFA] border border-white/20 flex items-center justify-center">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/20 border border-cyan-300/40 shadow-[inset_0_0_10px_rgba(34,211,238,0.5)]" />
            </div>

            <div className="face s-face s-cap s-f-bottom bg-[#4C1D95] shadow-xl" />
        </>
    )
}

function PowerCube() {
    return (
        <>
            <div className="face p-face p-f-front bg-slate-900 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <BoltIcon mini />
            </div>
            <div className="face p-face p-f-back bg-slate-900" />

            <div className="face p-face p-f-right bg-slate-900 border-l border-cyan-500/50 flex items-center justify-center">
                <BoltIcon mini />
            </div>

            <div className="face p-face p-f-left bg-slate-900" />

            <div className="face p-face p-f-top bg-slate-900 border border-cyan-500/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                <BoltIcon />
            </div>

            <div className="face p-face p-f-bottom bg-slate-900 shadow-xl" />
        </>
    )
}

function BoltIcon({ mini }: { mini?: boolean }) {
    const size = mini ? "w-4 h-4" : "w-6 h-6"
    return (
        <div className={`${mini ? 'p-1' : 'p-1.5'} rounded-full border border-cyan-400/50 flex items-center justify-center bg-cyan-400/10`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${size} text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,1)]`}>
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
            </svg>
        </div>
    )
}
