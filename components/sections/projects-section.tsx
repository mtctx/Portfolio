"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, Calendar, RefreshCw, Settings } from "lucide-react"
import { useRealTimeProjects } from "@/hooks/use-real-time-projects"
import { UpdateIndicator } from "@/components/ui/update-indicator"
import { useState } from "react"

export function ProjectsSection() {
  const { repositories, status, forceUpdate, clearCache } = useRealTimeProjects()
  const [showDebug, setShowDebug] = useState(false)

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
    return `${Math.ceil(diffDays / 365)} years ago`
  }

  if (status.isLoading && repositories.length === 0) {
    return (
      <section id="projects" className="py-20 bg-muted-custom">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-custom mx-auto"></div>
            <p className="mt-4 text-muted-accessible font-medium">Loading latest projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 bg-muted-custom">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-high-contrast">Featured Projects</h2>
          <p className="text-lg text-muted-accessible max-w-2xl mx-auto leading-relaxed font-medium">
            Latest open source projects and contributions, automatically updated in real-time
          </p>

          {/* Real-time Update Status */}
          <div className="mt-6">
            <UpdateIndicator
              isUpdating={status.isUpdating}
              hasChanges={status.hasChanges}
              lastUpdated={status.lastUpdated}
              error={status.error}
              changedProjects={status.changedProjects}
            />
          </div>

          {/* Debug Information */}
          {showDebug && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-card-custom rounded-lg border text-left text-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-high-contrast mb-2">System Status</h4>
                  <ul className="space-y-1 text-muted-accessible">
                    <li>Updates: {status.updateCount}</li>
                    <li>
                      Last check: {status.lastUpdated ? new Date(status.lastUpdated).toLocaleTimeString() : "Never"}
                    </li>
                    <li>Projects loaded: {repositories.length}</li>
                    <li>Auto-refresh: Every 30s</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-high-contrast mb-2">Recent Changes</h4>
                  {status.changedProjects.length > 0 ? (
                    <ul className="space-y-1 text-muted-accessible">
                      {status.changedProjects.slice(0, 3).map((project, index) => (
                        <li key={index} className="truncate">
                          • {project}
                        </li>
                      ))}
                      {status.changedProjects.length > 3 && (
                        <li className="text-primary-custom">+{status.changedProjects.length - 3} more</li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-muted-accessible">No recent changes</p>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCache}
                  className="hover:bg-red-500 hover:text-white hover:border-red-500"
                >
                  Clear Cache
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo, index) => (
            <motion.div
              key={`${repo.id}-${repo.updated_at}`} // Include updated_at for re-animation on changes
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              layout // Enable layout animations for smooth updates
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary-custom group bg-card-custom">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span className="truncate flex-1 group-hover:text-primary-custom transition-colors text-high-contrast font-bold">
                      {repo.name}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-muted-accessible flex-shrink-0">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span className="font-medium">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-4 w-4" />
                        <span className="font-medium">{repo.forks_count}</span>
                      </div>
                    </div>
                  </CardTitle>
                  <div className="flex items-center text-xs text-muted-accessible">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="font-medium">Updated {getTimeSince(repo.pushed_at || repo.updated_at)}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-accessible text-sm line-clamp-3 leading-relaxed font-medium">
                    {repo.description || "No description available"}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary-custom/10 text-primary-custom border-primary-custom/20 font-semibold"
                      >
                        {repo.language}
                      </Badge>
                    )}
                    {repo.topics.slice(0, 2).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs border-muted-accessible/30 font-medium">
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 2 && (
                      <Badge variant="outline" className="text-xs border-muted-accessible/30 font-medium">
                        +{repo.topics.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 hover:bg-primary-custom hover:text-white hover:border-primary-custom font-semibold"
                    >
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1 hover:bg-secondary-custom hover:text-white hover:border-secondary-custom font-semibold"
                      >
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            asChild
            className="hover:bg-primary-custom hover:text-white hover:border-primary-custom px-8 py-3 font-semibold"
          >
            <a href="https://github.com/mtctx" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View All Projects
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
