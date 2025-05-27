"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { type Repository, githubAPI } from "@/lib/github-api"
import { projectCache } from "@/lib/project-cache"

export interface ProjectUpdateStatus {
  isLoading: boolean
  isUpdating: boolean
  lastUpdated: string | null
  error: string | null
  hasChanges: boolean
  changedProjects: string[]
  updateCount: number
}

export interface UseRealTimeProjectsReturn {
  repositories: Repository[]
  status: ProjectUpdateStatus
  forceUpdate: () => Promise<void>
  clearCache: () => void
}

export function useRealTimeProjects(): UseRealTimeProjectsReturn {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [status, setStatus] = useState<ProjectUpdateStatus>({
    isLoading: true,
    isUpdating: false,
    lastUpdated: null,
    error: null,
    hasChanges: false,
    changedProjects: [],
    updateCount: 0,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isComponentMounted = useRef(true)

  const updateStatus = useCallback((updates: Partial<ProjectUpdateStatus>) => {
    if (!isComponentMounted.current) return
    setStatus((prev) => ({ ...prev, ...updates }))
  }, [])

  const fetchProjects = useCallback(
    async (isManualUpdate = false) => {
      if (!isComponentMounted.current) return

      try {
        updateStatus({
          isUpdating: true,
          error: null,
          ...(isManualUpdate && { isLoading: false }),
        })

        const response = await githubAPI.fetchRepositories()

        if (!isComponentMounted.current) return

        const { updatedProjects, hasChanges, changedProjects } = projectCache.updateProjects(response.repositories)

        setRepositories(updatedProjects.slice(0, 6)) // Show top 6 projects

        updateStatus({
          isLoading: false,
          isUpdating: false,
          lastUpdated: response.lastUpdated,
          hasChanges,
          changedProjects,
          updateCount: (prev) => prev + 1,
        })

        // Log changes for debugging
        if (hasChanges && changedProjects.length > 0) {
          console.log("🔄 Projects updated:", changedProjects)
        }
      } catch (error) {
        if (!isComponentMounted.current) return

        console.error("Error fetching projects:", error)

        // Try to load from cache on error
        const cachedProjects = projectCache.getCachedProjects()
        if (cachedProjects.length > 0) {
          setRepositories(cachedProjects.slice(0, 6))
        }

        updateStatus({
          isLoading: false,
          isUpdating: false,
          error: error instanceof Error ? error.message : "Failed to fetch projects",
        })
      }
    },
    [updateStatus],
  )

  const forceUpdate = useCallback(async () => {
    await fetchProjects(true)
  }, [fetchProjects])

  const clearCache = useCallback(() => {
    projectCache.clearCache()
    setRepositories([])
    updateStatus({
      lastUpdated: null,
      hasChanges: false,
      changedProjects: [],
      updateCount: 0,
    })
    fetchProjects()
  }, [fetchProjects, updateStatus])

  // Initial load
  useEffect(() => {
    // Load cached projects immediately
    const cachedProjects = projectCache.getCachedProjects()
    if (cachedProjects.length > 0) {
      setRepositories(cachedProjects.slice(0, 6))
      updateStatus({ isLoading: false })
    }

    // Then fetch fresh data
    fetchProjects()
  }, [fetchProjects, updateStatus])

  // Set up real-time polling
  useEffect(() => {
    const pollInterval = 30000 // 30 seconds

    intervalRef.current = setInterval(() => {
      if (!document.hidden) {
        // Only update when tab is visible
        fetchProjects()
      }
    }, pollInterval)

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden && isComponentMounted.current) {
        fetchProjects()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [fetchProjects])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isComponentMounted.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    repositories,
    status,
    forceUpdate,
    clearCache,
  }
}
