"use client"

import { PublicLayout } from "@/components/layouts/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, FileText, Lock, Eye, AlertCircle, Mail } from "lucide-react"

export default function TermsPage() {
    return (
        <PublicLayout>
            <div className="min-h-screen pt-20 pb-12 bg-background relative overflow-hidden">
                {/* Ambient Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.03),transparent_50%)]" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-ambient-500 to-ambient-600 text-white mb-6 shadow-xl shadow-ambient-500/25">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Privacy Policy</h1>
                        <p className="text-muted-foreground text-lg">
                            Last updated: January 2, 2026
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Terms of Service */}
                        <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-xl bg-ambient-100 dark:bg-ambient-900/50">
                                        <Shield className="w-6 h-6 text-ambient-600 dark:text-ambient-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Terms of Service</h2>
                                </div>

                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        Welcome to Digiteria. By accessing or using our platform, you agree to be bound by these Terms of Service.
                                    </p>

                                    <h3 className="text-lg font-semibold text-foreground mt-6">1. Account Registration</h3>
                                    <p>
                                        You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
                                    </p>

                                    <h3 className="text-lg font-semibold text-foreground mt-6">2. Seller Terms</h3>
                                    <p>
                                        Sellers must ensure all products comply with our content guidelines. You retain ownership of your digital products but grant Digiteria a license to display and distribute them on our platform. Commission rates and payment terms are detailed in your seller agreement.
                                    </p>

                                    <h3 className="text-lg font-semibold text-foreground mt-6">3. Buyer Terms</h3>
                                    <p>
                                        All purchases are final unless otherwise stated. Digital products are licensed for personal or commercial use as specified by the seller. Redistribution or resale of purchased products is prohibited without explicit permission.
                                    </p>

                                    <h3 className="text-lg font-semibold text-foreground mt-6">4. Prohibited Content</h3>
                                    <p>
                                        Users may not upload, sell, or distribute content that is illegal, infringes on intellectual property rights, contains malware, or violates our community guidelines.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Privacy Policy */}
                        <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50">
                                        <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Privacy Policy</h2>
                                </div>

                                <div className="space-y-4 text-muted-foreground">
                                    <h3 className="text-lg font-semibold text-foreground">Information We Collect</h3>
                                    <p>
                                        We collect information you provide directly, including name, email address, payment information, and any content you upload. We also collect usage data such as browsing patterns, device information, and IP addresses.
                                    </p>

                                    <h3 className="text-lg font-semibold text-foreground mt-6">How We Use Your Information</h3>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>To provide and improve our services</li>
                                        <li>To process transactions and send related information</li>
                                        <li>To communicate with you about updates, promotions, and support</li>
                                        <li>To detect and prevent fraud or abuse</li>
                                        <li>To comply with legal obligations</li>
                                    </ul>

                                    <h3 className="text-lg font-semibold text-foreground mt-6">Data Security</h3>
                                    <p>
                                        We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology and processed through secure payment providers.
                                    </p>

                                    <h3 className="text-lg font-semibold text-foreground mt-6">Your Rights</h3>
                                    <p>
                                        You have the right to access, correct, or delete your personal information. You can manage your privacy settings in your account dashboard or contact us directly for assistance.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Cookie Policy */}
                        <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/50">
                                        <Eye className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Cookie Policy</h2>
                                </div>

                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can manage cookie preferences through your browser settings.
                                    </p>

                                    <h3 className="text-lg font-semibold text-foreground mt-6">Types of Cookies</h3>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
                                        <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                                        <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                                        <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact */}
                        <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50">
                                        <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Contact Us</h2>
                                </div>

                                <div className="text-muted-foreground">
                                    <p>
                                        If you have any questions about these terms or our privacy practices, please contact us at:
                                    </p>
                                    <p className="mt-4 font-medium text-foreground">
                                        Email: legal@digiteria.com<br />
                                        Address: 123 Digital Street, Tech City, TC 12345
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}
