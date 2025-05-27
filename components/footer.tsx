"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Github, Youtube, MessageSquare, ArrowUp } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/mtctx",
    icon: Github,
  },
  {
    name: "Email",
    url: "mailto:me@mtctx.dev",
    icon: Mail,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@mtctx",
    icon: Youtube,
  },
  {
    name: "Discord",
    url: "https://discord.com/users/504014438383222804",
    icon: MessageSquare,
  },
]

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]



export function Footer() {
  const getCopyrightYears = () => {
    const currentYear = new Date().getFullYear()

    if (currentYear != 2025) return `2025 - ${currentYear}`
    else return currentYear
  }

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-lg font-bold bg-primary-custom text-white px-3 py-2 rounded-lg">mtctx</div>
            </div>
            <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary-custom pl-4 leading-relaxed">
              "Privacy is not about something to hide, but something to protect."
            </blockquote>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-high-contrast text-sm">Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-sm text-muted-foreground hover:text-primary-custom transition-colors py-1"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Social & Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-high-contrast text-sm">Connect</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-primary-custom transition-all duration-300"
                  title={link.name}
                >
                  <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="w-full hover:bg-primary-custom hover:text-white hover:border-primary-custom"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Top
            </Button>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-border"
        >
          <div className="text-center text-xs text-muted-foreground">
            © {getCopyrightYears()} mtctx. All rights reserved. • Zero tracking
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
