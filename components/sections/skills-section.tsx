"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const skillCategories = [
  {
    title: "Languages",
    icon: "🔧",
    description: "Core programming languages for backend development",
    skills: [
      {
        name: "Java",
        level: 80,
        icon: "https://skillicons.dev/icons?i=java&theme=dark",
        description: "Enterprise backend systems, Spring ecosystem",
      },
      {
        name: "Kotlin",
        level: 65,
        icon: "https://skillicons.dev/icons?i=kotlin&theme=dark",
        description: "Modern JVM development, Android backends",
      },
      {
        name: "TypeScript",
        level: 70,
        icon: "https://skillicons.dev/icons?i=ts&theme=dark",
        description: "Type-safe JavaScript for scalable applications",
      },
    ],
  },
  {
    title: "Runtimes",
    icon: "⚡",
    description: "High-performance runtime environments",
    skills: [
      {
        name: "Node.js",
        level: 60,
        icon: "https://skillicons.dev/icons?i=nodejs&theme=dark",
        description: "Server-side JavaScript runtime",
      },
      {
        name: "Bun",
        level: 60,
        icon: "https://skillicons.dev/icons?i=bun&theme=dark",
        description: "Fast all-in-one JavaScript runtime",
      },
    ],
  },
  {
    title: "Databases",
    icon: "💾",
    description: "Data persistence and management solutions",
    skills: [
      {
        name: "PostgreSQL",
        level: 70,
        icon: "https://skillicons.dev/icons?i=postgres&theme=dark",
        description: "Advanced open source relational database",
      },
      {
        name: "MySQL",
        level: 70,
        icon: "https://skillicons.dev/icons?i=mysql&theme=dark",
        description: "Popular relational database management system",
      },
    ],
  },
  {
    title: "Tools",
    icon: "🛠️",
    description: "Development and deployment tools",
    skills: [
      {
        name: "Git",
        level: 20,
        icon: "https://skillicons.dev/icons?i=git&theme=dark",
        description: "Distributed version control system",
      },
      {
        name: "Linux",
        level: 60,
        icon: "https://skillicons.dev/icons?i=linux&theme=dark",
        description: "Unix-like operating system",
      },
      {
        name: "Docker",
        level: 20,
        icon: "https://skillicons.dev/icons?i=docker&theme=dark",
        description: "Containerization platform",
      },
    ],
  },
]

const totalSkills = skillCategories.reduce((acc, category) => acc + category.skills.length, 0)
const averageProficiency = Math.round(
  skillCategories.reduce((acc, category) => {
    const categoryAvg = category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length
    return acc + categoryAvg
  }, 0) / skillCategories.length,
)

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-high-contrast">Tech Stack</h2>
          <p className="text-lg text-muted-accessible max-w-2xl mx-auto leading-relaxed font-medium">
            Technologies and tools I use to build privacy-first backend systems and secure architectures
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <Accordion type="multiple" className="w-full space-y-4">
            {skillCategories.map((category, categoryIndex) => (
              <AccordionItem
                key={category.title}
                value={`item-${categoryIndex}`}
                className="border border-border rounded-lg px-6 bg-card-custom"
              >
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary-custom transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="text-left">
                      <div className="text-high-contrast">{category.title}</div>
                      <div className="text-sm text-muted-accessible font-medium">{category.description}</div>
                    </div>
                    <Badge
                      variant="outline"
                      className="ml-auto border-primary-custom text-primary-custom font-semibold"
                    >
                      {category.skills.length} skills
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary-custom bg-card-custom">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <img
                                src={skill.icon || "/placeholder.svg"}
                                alt={skill.name}
                                className="w-12 h-12 transition-transform group-hover:scale-110 duration-300"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-bold text-high-contrast">{skill.name}</h4>
                                  <Badge
                                    variant={
                                      skill.level >= 70 ? "default" : skill.level >= 50 ? "secondary" : "outline"
                                    }
                                    className="text-xs font-semibold"
                                  >
                                    {skill.level}%
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-accessible mb-3 leading-relaxed font-medium">
                                  {skill.description}
                                </p>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                    viewport={{ once: true }}
                                    className="h-2 rounded-full gradient-progress"
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto bg-card-custom">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6 text-high-contrast">Focus Areas & Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <h4 className="font-bold mb-2 text-high-contrast">Privacy Engineering</h4>
                  <p className="text-sm text-muted-accessible leading-relaxed font-medium">
                    Zero-trust architectures and data minimization patterns
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-bold mb-2 text-high-contrast">Backend Systems</h4>
                  <p className="text-sm text-muted-accessible leading-relaxed font-medium">
                    High-performance server-side applications and APIs
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <h4 className="font-bold mb-2 text-high-contrast">Security</h4>
                  <p className="text-sm text-muted-accessible leading-relaxed font-medium">
                    Secure protocols and encryption-first development
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-custom">4</div>
                    <div className="text-sm text-muted-accessible font-medium">Categories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-custom">{totalSkills}</div>
                    <div className="text-sm text-muted-accessible font-medium">Technologies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-custom">{averageProficiency}%</div>
                    <div className="text-sm text-muted-accessible font-medium">Avg Proficiency</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-custom">Java</div>
                    <div className="text-sm text-muted-accessible font-medium">Primary Language</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
