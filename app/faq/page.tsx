"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
    MessageCircle,
    Search,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    CreditCard,
    Shield,
    Rocket,
    Users,
    Download,
    Mail
} from "lucide-react"
import Link from "next/link"

const faqCategories = [
    {
        id: "getting-started",
        name: "Getting Started",
        icon: Rocket,
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: "selling",
        name: "Selling",
        icon: Users,
        color: "from-purple-500 to-pink-500"
    },
    {
        id: "payments",
        name: "Payments & Payouts",
        icon: CreditCard,
        color: "from-green-500 to-emerald-500"
    },
    {
        id: "security",
        name: "Security & Protection",
        icon: Shield,
        color: "from-amber-500 to-orange-500"
    },
    {
        id: "downloads",
        name: "Downloads & Delivery",
        icon: Download,
        color: "from-red-500 to-rose-500"
    }
]

const faqs = [
    {
        category: "getting-started",
        question: "How do I create an account on Digiteria?",
        answer: "Creating an account is simple! Click the 'Sign Up' button in the top navigation, enter your email and create a password, or sign up with Google for instant access. Once registered, you can start browsing products immediately."
    },
    {
        category: "getting-started",
        question: "Is it free to join Digiteria?",
        answer: "Yes! Creating a buyer account is completely free. For sellers, there are no monthly fees or subscription costs. We only take a small commission when you make a sale, so you only pay when you earn."
    },
    {
        category: "getting-started",
        question: "How do I become a seller?",
        answer: "To become a seller, log into your account and click 'Start Selling' or submit a seller application from your dashboard. We review applications within 24-48 hours. Once approved, you can start uploading and selling your digital products right away."
    },
    {
        category: "getting-started",
        question: "What types of products can I sell?",
        answer: "You can sell a wide variety of digital products including: templates, UI kits, design assets, software, scripts, plugins, courses, ebooks, music, presets, and more. Physical products are not supported at this time."
    },
    {
        category: "selling",
        question: "How do I upload my first product?",
        answer: "After becoming an approved seller, go to your Dashboard and click 'Create Product'. Fill in the product details like title, description, and price. Upload your product files (ZIP, PDF, etc.) and add eye-catching thumbnail images. Hit publish and you're live!"
    },
    {
        category: "selling",
        question: "What file formats are supported?",
        answer: "We support most common file formats including ZIP, RAR, PDF, PSD, AI, FIGMA, SKETCH, MP4, MP3, and many more. Maximum file size is 5GB per product. For larger files, contact our support team."
    },
    {
        category: "selling",
        question: "Can I offer discounts or coupons?",
        answer: "Yes! You can create discount codes for your products from your seller dashboard. Set percentage or fixed discounts, expiration dates, and usage limits. This is a great way to run promotions and boost sales."
    },
    {
        category: "selling",
        question: "How do I promote my products?",
        answer: "We provide several tools to help you succeed: featured product placement, social sharing buttons, affiliate program, and analytics to track your performance. We also regularly feature top products on our homepage and newsletters."
    },
    {
        category: "payments",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, and various local payment methods depending on your region. All payments are processed securely through Stripe."
    },
    {
        category: "payments",
        question: "How do payouts work for sellers?",
        answer: "Payouts are processed automatically once you reach the minimum threshold of $50. You can receive funds via bank transfer (direct deposit) or PayPal. Payouts are processed within 3-5 business days after request."
    },
    {
        category: "payments",
        question: "What are the seller fees?",
        answer: "We charge a 10% commission on each sale. There are no monthly fees, listing fees, or hidden charges. Payment processing fees (typically 2.9% + $0.30) are included in our commission, so you keep 90% of every sale."
    },
    {
        category: "payments",
        question: "Can I get a refund as a buyer?",
        answer: "Refund policies are set by individual sellers. Most sellers offer a 30-day money-back guarantee. If you have an issue, first contact the seller directly. If unresolved, our support team can help mediate."
    },
    {
        category: "security",
        question: "How is my payment information protected?",
        answer: "All payment processing is handled by Stripe, a PCI-DSS Level 1 certified payment processor. We never store your credit card details on our servers. All connections are encrypted with 256-bit SSL."
    },
    {
        category: "security",
        question: "How are seller products protected from piracy?",
        answer: "We use secure file delivery with unique download links that expire after a set time or number of downloads. We also offer license key generation and watermarking options for additional protection."
    },
    {
        category: "security",
        question: "What happens if someone shares my product illegally?",
        answer: "We take content protection seriously. Report any unauthorized distribution to our support team with evidence. We issue DMCA takedowns and can ban offending accounts. Repeated offenders face permanent bans."
    },
    {
        category: "downloads",
        question: "How do I access my purchased products?",
        answer: "After purchase, you'll receive an email with download links. You can also access all your purchases anytime from the 'My Purchases' section in your dashboard. Download links are valid for 30 days with up to 5 downloads per product."
    },
    {
        category: "downloads",
        question: "What if my download link expires?",
        answer: "No worries! Simply log into your account and go to 'My Purchases'. You can regenerate download links for any of your past purchases at no extra cost. Links never expire as long as you have an active account."
    },
    {
        category: "downloads",
        question: "Can I download on multiple devices?",
        answer: "Yes! You can download your purchases on any device as long as you're logged into your account. Each product typically allows 5 downloads, but you can request additional downloads from your purchase history if needed."
    }
]

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !activeCategory || faq.category === activeCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="py-20 pt-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-ambient-50/50 via-background to-background dark:from-ambient-950/30" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Badge className="bg-gradient-to-r from-ambient-600 to-purple-600 text-white mb-6 border-0 px-4 py-1.5 text-sm font-medium shadow-lg shadow-ambient-500/25">
                        <HelpCircle className="w-3.5 h-3.5 mr-1.5 inline" />
                        Help Center
                    </Badge>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-ambient-500 via-purple-500 to-ambient-500 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Find answers to common questions about buying, selling, payments, and more.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-4 py-6 text-lg rounded-2xl border-ambient-200/50 dark:border-ambient-800/30 bg-white/80 dark:bg-ambient-950/50 backdrop-blur-sm focus:ring-2 focus:ring-ambient-500/50 transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-8 border-b border-ambient-200/30 dark:border-ambient-800/20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            variant={activeCategory === null ? "default" : "outline"}
                            onClick={() => setActiveCategory(null)}
                            className={`rounded-xl ${activeCategory === null ? "bg-gradient-to-r from-ambient-500 to-ambient-600 text-white" : ""}`}
                        >
                            All Topics
                        </Button>
                        {faqCategories.map((category) => (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.id ? "default" : "outline"}
                                onClick={() => setActiveCategory(category.id)}
                                className={`rounded-xl gap-2 ${activeCategory === category.id ? `bg-gradient-to-r ${category.color} text-white border-0` : ""}`}
                            >
                                <category.icon className="w-4 h-4" />
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No results found</h3>
                            <p className="text-muted-foreground">Try a different search term or browse by category.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => {
                                const category = faqCategories.find(c => c.id === faq.category)
                                const isExpanded = expandedFaq === index

                                return (
                                    <Card
                                        key={index}
                                        className={`group bg-white/80 dark:bg-ambient-950/50 border-ambient-200/50 dark:border-ambient-800/30 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-ambient-500/10 ${isExpanded ? "ring-2 ring-ambient-500/50" : ""}`}
                                        onClick={() => setExpandedFaq(isExpanded ? null : index)}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${category?.color || "from-gray-500 to-gray-600"} flex items-center justify-center shadow-lg`}>
                                                    {category && <category.icon className="w-5 h-5 text-white" />}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-lg font-semibold pr-4 group-hover:text-ambient-600 dark:group-hover:text-ambient-400 transition-colors">
                                                            {faq.question}
                                                        </h3>
                                                        <div className="flex-shrink-0">
                                                            {isExpanded ? (
                                                                <ChevronUp className="w-5 h-5 text-ambient-500" />
                                                            ) : (
                                                                <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-ambient-500 transition-colors" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {isExpanded && (
                                                        <p className="mt-4 text-muted-foreground leading-relaxed animate-fade-in">
                                                            {faq.answer}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-ambient-600 via-purple-600 to-ambient-600" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)]" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Mail className="w-12 h-12 mx-auto text-white/80 mb-4" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Still have questions?
                    </h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <Link href="/contact">
                        <Button
                            size="lg"
                            className="bg-white text-ambient-600 hover:bg-white/90 rounded-xl px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            Contact Support
                            <MessageCircle className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
