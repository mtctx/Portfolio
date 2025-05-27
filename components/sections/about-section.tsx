"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, Server } from "lucide-react"

const principles = [
  {
    icon: Shield,
    title: "Data Minimization",
    description: "Default state of collecting only what's absolutely necessary",
    color: "text-primary-custom",
  },
  {
    icon: Lock,
    title: "Encryption First",
    description: "End-to-end encryption as a fundamental requirement",
    color: "text-secondary-custom",
  },
  {
    icon: Eye,
    title: "No Telemetry",
    description: "Zero tracking pipelines and surveillance mechanisms",
    color: "text-accent-custom",
  },
  {
    icon: Server,
    title: "Protocol-Level Privacy",
    description: "Privacy built into the core architecture and protocols",
    color: "text-primary-custom",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted-custom">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-high-contrast">About Me</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-accessible">
            <p className="leading-relaxed font-medium">
              I design backend systems where privacy isn't an afterthought — it's the foundation. My work focuses on
              zero-trust architectures, and eliminating data collection anti-patterns.
            </p>
            <p className="font-bold text-primary-custom text-xl">Code speaks louder than credentials.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-high-contrast">Core Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary-custom bg-card-custom group">
                  <CardContent className="p-6 text-center">
                    <principle.icon
                      className={`h-12 w-12 mx-auto mb-4 ${principle.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                    <h4 className="font-bold mb-3 text-high-contrast">{principle.title}</h4>
                    <p className="text-sm text-muted-accessible leading-relaxed font-medium">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
