import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Globe, Twitter, Github, Linkedin, Instagram, ArrowUpRight, Sparkles } from "lucide-react"
import { toast } from "sonner"

export function Footer() {

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Browse Marketplace", href: "/marketplace" },
        { name: "List Your Product", href: "/dashboard" },
        { name: "Creator Guidelines", href: "#" },
        { name: "Quality Standards", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Support", href: "/contact" },
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
    <footer className="relative bg-slate-100 dark:bg-zinc-950 text-foreground overflow-hidden border-t border-border">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
      </div>

      {/* Top Ambient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ambient-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-8 group cursor-pointer">
              <div className="relative">
                <div className="w-14 h-14 bg-white dark:bg-zinc-900/80 rounded-2xl flex items-center justify-center overflow-hidden border border-border shadow-xl group-hover:shadow-ambient-500/20 transition-all duration-500 group-hover:scale-105">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-1.5" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-ambient-400/20 to-ambient-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 -z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground group-hover:text-ambient-500 transition-colors">Digiteria</span>
                <span className="text-[9px] text-ambient-600 dark:text-ambient-500/50 font-mono tracking-[0.2em] uppercase">Software Solutions</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-10 max-w-md leading-relaxed text-sm">
              The ultimate marketplace for developers, creators, and digital product sellers. Built by creators,
              for creators.
            </p>
            <div className="flex space-x-3">
              <Button
                size="sm"
                className="group bg-gradient-to-r from-ambient-600 to-ambient-700 hover:from-ambient-500 hover:to-ambient-600 text-white rounded-xl shadow-xl shadow-ambient-500/20 hover:shadow-ambient-500/30 transition-all duration-300 hover:scale-105 border border-ambient-500/30"
                onClick={() => toast.success("Redirecting to Discord...")}
              >
                <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Join Discord
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-border text-muted-foreground hover:bg-muted hover:text-foreground rounded-xl transition-all duration-300 hover:scale-105"
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
              <h3 className="font-mono text-[10px] text-muted-foreground mb-6 uppercase tracking-[0.3em]">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className="group flex items-center text-muted-foreground hover:text-ambient-500 transition-all duration-300 text-sm"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-ambient-500" />
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="group flex items-center text-muted-foreground hover:text-ambient-500 transition-all duration-300 text-sm"
                        onClick={(e) => {
                          e.preventDefault()
                          toast.info(`Navigating to ${link.name}...`)
                        }}
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                        <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-ambient-500" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-border" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span className="font-mono text-[10px] tracking-[0.1em]">© 2026 DIGITERIA</span>
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400/70">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
              <span className="text-[10px] font-mono tracking-wider">SYSTEMS ONLINE</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
              <button
                key={social.name}
                onClick={() => toast.info(`Opening ${social.name}...`)}
                className="group w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-all duration-300 hover:scale-110 border border-border hover:border-ambient-500/30"
              >
                <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-ambient-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-12 text-[10px] text-muted-foreground font-mono tracking-[0.2em] flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-ambient-500/50" />
          <span>CRAFTED FOR THE DIGITERIA COMMUNITY</span>
          <Sparkles className="w-3 h-3 text-ambient-500/50" />
        </div>
      </div>
    </footer>
  )
}
