import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Zap, MessageCircle, Globe, Shield, Twitter, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react"
import { toast } from "sonner"

export function Footer() {

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Browse Marketplace", href: "#" },
        { name: "List Your Product", href: "#" },
        { name: "Creator Guidelines", href: "#" },
        { name: "Quality Standards", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Support", href: "#" },
        { name: "Report Issues", href: "#" },
        { name: "Feature Requests", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Refund Policy", href: "#" },
        { name: "License Agreement", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ambient-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shadow-lg shadow-ambient-500/20 group-hover:shadow-ambient-500/40 transition-all duration-500 group-hover:scale-105">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-ambient-400 to-ambient-600 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Digiteria</span>
                <span className="text-xs text-ambient-400 -mt-0.5 font-medium">Software Solutions</span>
              </div>
            </div>
            <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
              The ultimate marketplace for developers, creators, and digital product sellers. Built by creators,
              for creators.
            </p>
            <div className="flex space-x-3">
              <Button
                size="sm"
                className="group bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white rounded-xl shadow-lg shadow-ambient-500/25 hover:shadow-ambient-500/40 transition-all duration-300 hover:scale-105"
                onClick={() => toast.success("Redirecting to Discord...")}
              >
                <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Join Discord
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 rounded-xl transition-all duration-300 hover:scale-105"
                onClick={() => toast.info("Opening Community Hub...")}
              >
                <Globe className="w-4 h-4 mr-2" />
                Community
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="group flex items-center text-slate-400 hover:text-ambient-400 transition-all duration-300 text-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        toast.info(`Navigating to ${link.name}...`)
                      }}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-slate-800/50" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6 text-sm text-slate-500">
            <span>© 2026 Digiteria. All rights reserved.</span>
            <div className="flex items-center space-x-1.5 text-green-400/80">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-xs">All systems operational</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <button
                key={social.name}
                onClick={() => toast.info(`Opening ${social.name}...`)}
                className="group w-10 h-10 rounded-xl bg-slate-800/50 hover:bg-gradient-to-br hover:from-ambient-500/20 hover:to-ambient-600/10 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700/50 hover:border-ambient-500/30"
              >
                <social.icon className="w-4 h-4 text-slate-400 group-hover:text-ambient-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-8 text-sm text-slate-600">
          Made with <span className="text-red-400">❤️</span> for the Digiteria community
        </div>
      </div>
    </footer>
  )
}
