"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

interface Testimonial {
    id: number
    name: string
    role: string
    avatar: string
    content: string
    rating: number
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Alex Thompson",
        role: "Full-stack Developer",
        avatar: "https://i.pravatar.cc/150?u=alex",
        content: "Digiteria has completely transformed how I license my software. The automated delivery system is flawless and the analytics insights help me optimize my pricing perfectly.",
        rating: 5
    },
    {
        id: 2,
        name: "Sarah Chen",
        role: "UI/UX Designer",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        content: "The marketplace reach is incredible. I uploaded my design system and saw sales within the first 24 hours. The platform fee is very fair compared to other competitors.",
        rating: 5
    },
    {
        id: 3,
        name: "Marcus Miller",
        role: "Indie Hacker",
        avatar: "https://i.pravatar.cc/150?u=marcus",
        content: "Everything about this platform feels premium. From the dashboard UI to the customer support, it's clear they care about creators. Highly recommend for any digital asset seller.",
        rating: 5
    },
    {
        id: 4,
        name: "Elena Rodriguez",
        role: "Software Architect",
        avatar: "https://i.pravatar.cc/150?u=elena",
        content: "Implementing the API for license verification was a breeze. It's rare to find a marketplace that actually understands the technical needs of software developers.",
        rating: 4
    },
    {
        id: 5,
        name: "James Wilson",
        role: "Content Creator",
        avatar: "https://i.pravatar.cc/150?u=james",
        content: "The best part is the community. I've connected with so many other developers and even collaborated on a few plugins. It's more than just a marketplace.",
        rating: 5
    },
    {
        id: 6,
        name: "Priya Sharma",
        role: "Backend Engineer",
        avatar: "https://i.pravatar.cc/150?u=priya",
        content: "Secure, reliable, and fast. My customers appreciate how easy it is to access their purchases and invoices. It professionalizes my side business instantly.",
        rating: 5
    },
    {
        id: 7,
        name: "David Park",
        role: "Technical Lead",
        avatar: "https://i.pravatar.cc/150?u=david",
        content: "I've tried every digital goods platform out there, and Digiteria is the only one that doesn't feel like it's stuck in 2010. The modern tech stack shows through.",
        rating: 5
    }
]

export function TestimonialCarousel() {
    // Duplicate the array to create a seamless loop
    const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS]

    return (
        <div className="py-24 bg-gradient-to-b from-transparent to-ambient-50/20 dark:to-ambient-950/10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-ambient-100/50 dark:bg-ambient-900/30 px-3 py-1 rounded-full border border-ambient-200/50 dark:border-ambient-800/30">
                        <Quote className="w-3 h-3 text-ambient-600 dark:text-ambient-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-ambient-700 dark:text-ambient-400">Wall of Love</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Trusted by hundreds of <span className="gradient-text">creators</span></h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Join the community of developers and designers who are building their future on Digiteria.
                    </p>
                </div>
            </div>

            {/* Infinite Scroll Container */}
            <div className="relative">
                {/* Left/Right Fades for seamless transition */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <div className="flex space-x-6 animate-scroll whitespace-nowrap px-6">
                    {doubledTestimonials.map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            className="group inline-block w-[400px] shrink-0 whitespace-normal"
                        >
                            <div className="h-full p-8 rounded-3xl bg-background/50 backdrop-blur-xl border border-border/50 hover:border-ambient-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-ambient-500/10 relative overflow-hidden">
                                {/* Decorative glow */}
                                <div className="absolute -top-12 -right-12 w-24 h-24 bg-ambient-500/5 rounded-full blur-2xl group-hover:bg-ambient-500/10 transition-colors" />

                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-muted-foreground text-base mb-8 leading-relaxed italic">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <Avatar className="h-12 w-12 border-2 border-border group-hover:border-ambient-400/50 transition-colors">
                                            <AvatarImage src={testimonial.avatar} />
                                            <AvatarFallback className="bg-ambient-100 text-ambient-700">
                                                {testimonial.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-ambient-600 rounded-full border-2 border-background flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-sm">{testimonial.name}</h4>
                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
