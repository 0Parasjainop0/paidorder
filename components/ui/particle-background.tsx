"use client"

import { useEffect, useRef } from "react"

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    opacity: number
    color: string
}

interface ParticleBackgroundProps {
    particleCount?: number
    color?: string
    minSize?: number
    maxSize?: number
    speed?: number
    className?: string
    connectParticles?: boolean
    connectionDistance?: number
}

export function ParticleBackground({
    particleCount = 50,
    color = "59, 130, 246",
    minSize = 1,
    maxSize = 3,
    speed = 0.5,
    className = "",
    connectParticles = true,
    connectionDistance = 150
}: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationRef = useRef<number | undefined>(undefined)
    const mouseRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        const initParticles = () => {
            particlesRef.current = []
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * (maxSize - minSize) + minSize,
                    speedX: (Math.random() - 0.5) * speed,
                    speedY: (Math.random() - 0.5) * speed,
                    opacity: Math.random() * 0.5 + 0.2,
                    color: color
                })
            }
        }

        const drawParticle = (particle: Particle) => {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`
            ctx.fill()

            // Add glow effect
            ctx.shadowBlur = 15
            ctx.shadowColor = `rgba(${particle.color}, 0.5)`
        }

        const connectNearbyParticles = () => {
            if (!connectParticles) return

            const particles = particlesRef.current
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.15
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(${color}, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }
        }

        const updateParticle = (particle: Particle) => {
            particle.x += particle.speedX
            particle.y += particle.speedY

            // Mouse interaction
            const dx = mouseRef.current.x - particle.x
            const dy = mouseRef.current.y - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
                const force = (100 - distance) / 100
                particle.x -= dx * force * 0.02
                particle.y -= dy * force * 0.02
            }

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width
            if (particle.x > canvas.width) particle.x = 0
            if (particle.y < 0) particle.y = canvas.height
            if (particle.y > canvas.height) particle.y = 0
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.shadowBlur = 0

            particlesRef.current.forEach(particle => {
                updateParticle(particle)
                drawParticle(particle)
            })

            connectNearbyParticles()

            animationRef.current = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        resizeCanvas()
        initParticles()
        animate()

        window.addEventListener("resize", () => {
            resizeCanvas()
            initParticles()
        })
        canvas.addEventListener("mousemove", handleMouseMove)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            window.removeEventListener("resize", resizeCanvas)
            canvas.removeEventListener("mousemove", handleMouseMove)
        }
    }, [particleCount, color, minSize, maxSize, speed, connectParticles, connectionDistance])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ width: "100%", height: "100%" }}
        />
    )
}
