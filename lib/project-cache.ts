import type { Repository } from "./github-api"

export interface CachedProject {
  repository: Repository
  lastChecked: string
  hash: string
}

export interface ProjectCache {
  projects: Record<string, CachedProject>
  lastGlobalUpdate: string
  version: number
}

class ProjectCacheManager {
  private readonly storageKey = "portfolio-project-cache"
  private readonly cacheVersion = 1

  private generateHash(repo: Repository): string {
    const hashData = {
      name: repo.name,
      description: repo.description,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics.sort(),
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
    }

    return btoa(JSON.stringify(hashData))
  }

  getCache(): ProjectCache | null {
    try {
      const cached = localStorage.getItem(this.storageKey)
      if (!cached) return null

      const cache: ProjectCache = JSON.parse(cached)

      // Check cache version compatibility
      if (cache.version !== this.cacheVersion) {
        this.clearCache()
        return null
      }

      return cache
    } catch (error) {
      console.error("Error reading cache:", error)
      this.clearCache()
      return null
    }
  }

  setCache(cache: ProjectCache): void {
    try {
      cache.version = this.cacheVersion
      localStorage.setItem(this.storageKey, JSON.stringify(cache))
    } catch (error) {
      console.error("Error writing cache:", error)
    }
  }

  updateProjects(repositories: Repository[]): {
    updatedProjects: Repository[]
    hasChanges: boolean
    changedProjects: string[]
  } {
    const cache = this.getCache() || {
      projects: {},
      lastGlobalUpdate: new Date().toISOString(),
      version: this.cacheVersion,
    }

    const updatedProjects: Repository[] = []
    const changedProjects: string[] = []
    let hasChanges = false

    for (const repo of repositories) {
      const newHash = this.generateHash(repo)
      const cached = cache.projects[repo.name]

      if (!cached || cached.hash !== newHash) {
        // Project is new or has changes
        hasChanges = true
        changedProjects.push(repo.name)

        cache.projects[repo.name] = {
          repository: repo,
          lastChecked: new Date().toISOString(),
          hash: newHash,
        }
      }

      updatedProjects.push(repo)
    }

    // Remove projects that no longer exist
    const currentRepoNames = new Set(repositories.map((r) => r.name))
    for (const cachedName of Object.keys(cache.projects)) {
      if (!currentRepoNames.has(cachedName)) {
        delete cache.projects[cachedName]
        hasChanges = true
        changedProjects.push(`${cachedName} (removed)`)
      }
    }

    if (hasChanges) {
      cache.lastGlobalUpdate = new Date().toISOString()
      this.setCache(cache)
    }

    return {
      updatedProjects,
      hasChanges,
      changedProjects,
    }
  }

  clearCache(): void {
    try {
      localStorage.removeItem(this.storageKey)
    } catch (error) {
      console.error("Error clearing cache:", error)
    }
  }

  getCachedProjects(): Repository[] {
    const cache = this.getCache()
    if (!cache) return []

    return Object.values(cache.projects)
      .map((cached) => cached.repository)
      .sort((a, b) => new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime())
  }
}

export const projectCache = new ProjectCacheManager()
