"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Github, Youtube, MessageSquare } from "lucide-react"

const socialLinks = [
  {
    name: "Email",
    url: "mailto:me@mtctx.dev",
    icon: Mail,
    color: "text-red-600",
    description: "Send me a direct message",
  },
  {
    name: "GitHub",
    url: "https://github.com/mtctx",
    icon: Github,
    color: "text-primary-custom",
    description: "Check out my repositories",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@mtctx",
    icon: Youtube,
    color: "text-red-600",
    description: "Watch my technical content",
  },
  {
    name: "Discord",
    url: "https://discord.com/users/504014438383222804",
    icon: MessageSquare,
    color: "text-indigo-600",
    description: "Connect on Discord",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-high-contrast">Get In Touch</h2>
          <p className="text-lg text-muted-accessible max-w-2xl mx-auto leading-relaxed font-medium">
            Let's discuss privacy-first solutions and secure system architectures
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary-custom bg-card-custom">
                  <CardContent className="p-6 text-center">
                    <link.icon
                      className={`h-12 w-12 mx-auto mb-4 ${link.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                    <h3 className="font-bold mb-2 text-high-contrast">{link.name}</h3>
                    <p className="text-sm text-muted-accessible mb-3 leading-relaxed font-medium">{link.description}</p>
                    <div className="text-xs text-muted-accessible truncate font-medium">{link.url}</div>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
