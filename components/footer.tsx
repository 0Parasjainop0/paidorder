import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Zap, MessageCircle, Globe, Shield } from "lucide-react"
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

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-border/10 shadow-sm">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Digiteria</span>
                <span className="text-xs text-ambient-400 -mt-1">Software</span>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              The ultimate marketplace for developers, creators, and digital product sellers. Built by creators,
              for creators.
            </p>
            <div className="flex space-x-4">
              <Button variant="link"
                size="sm"
                className="bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white"
                onClick={() => toast.success("Redirecting to Discord...")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discord
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
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
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-ambient-400 transition-colors text-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        toast.info(`Navigating to ${link.name}...`)
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 text-sm text-slate-400 mb-4 md:mb-0">
            <span>© 2026 Digiteria. All rights reserved.</span>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Secure Platform</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>Made with ❤️ for the Digiteria community</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
