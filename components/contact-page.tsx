"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Bug } from "lucide-react"
import { mockDb } from "@/lib/mock-db"

interface ContactPageProps {
  onNavigate: (page: string) => void
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    mockDb.addMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      category: formData.category,
      message: formData.message
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    })

    setLoading(false)
    alert("Message sent successfully! We'll get back to you soon.")
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "hello@digitera.com",
      action: "mailto:hello@digitera.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 8am to 5pm",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "123 Innovation Street, Tech City, TC 12345",
      action: "#",
    },
    {
      icon: Clock,
      title: "Working Hours",
      description: "Our team is available",
      value: "Monday - Friday: 8:00 AM - 5:00 PM PST",
      action: "#",
    },
  ]

  const supportCategories = [
    {
      icon: MessageCircle,
      title: "General Inquiry",
      description: "Questions about our services",
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Need help with our products",
    },
    {
      icon: Bug,
      title: "Bug Report",
      description: "Found an issue? Let us know",
    },
  ]

  return (
    <div className="min-h-screen py-8">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ambient-50/30 via-transparent to-ambient-100/20 dark:from-ambient-950/20 dark:via-transparent dark:to-ambient-900/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about Digiteria? We're here to help. Reach out to our team and we'll get back to you as soon
            as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Digiteria"
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="digitera@example.com"
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                      placeholder="What's this about?"
                      required
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us more about your inquiry..."
                      required
                      className="rounded-xl min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl py-6 text-lg"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-ambient-100 dark:bg-ambient-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-ambient-600 dark:text-ambient-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{info.title}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{info.description}</p>
                      {info.action.startsWith("http") ||
                        info.action.startsWith("mailto") ||
                        info.action.startsWith("tel") ? (
                        <a
                          href={info.action}
                          className="text-sm text-ambient-600 dark:text-ambient-400 hover:underline"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Support Categories */}
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle>How can we help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {supportCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <category.icon className="w-5 h-5 text-ambient-600 dark:text-ambient-400" />
                    <div>
                      <h4 className="font-medium text-sm">{category.title}</h4>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-xl"
                  onClick={() => onNavigate("marketplace")}
                >
                  Browse Marketplace
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-xl"
                  onClick={() => onNavigate("landing")}
                >
                  About Digiteria
                </Button>
                <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                  <a href="mailto:support@digitera.com">Technical Support</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <p className="text-muted-foreground">Find quick answers to common questions about Digiteria</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">What is Digiteria?</h4>
                    <p className="text-sm text-muted-foreground">
                      Digiteria is a software company that creates innovative solutions and provides a marketplace for
                      digital products and services.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">How do I get started?</h4>
                    <p className="text-sm text-muted-foreground">
                      Simply create an account and explore our marketplace. You can start as a buyer or apply to become
                      a creator.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Do you offer technical support?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! We provide comprehensive technical support for all our products and services. Contact us
                      anytime.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">How can I become a creator?</h4>
                    <p className="text-sm text-muted-foreground">
                      Apply through your profile settings. We review all applications and approve qualified creators.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
