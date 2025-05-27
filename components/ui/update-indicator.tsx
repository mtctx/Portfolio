"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertCircle, RefreshCw, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UpdateIndicatorProps {
  isUpdating: boolean
  hasChanges: boolean
  lastUpdated: string | null
  error: string | null
  changedProjects: string[]
}

export function UpdateIndicator({ isUpdating, hasChanges, lastUpdated, error, changedProjects }: UpdateIndicatorProps) {
  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffMinutes = Math.ceil(diffTime / (1000 * 60))

    if (diffMinutes < 1) return "just now"
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    const diffHours = Math.ceil(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.ceil(diffHours / 24)
    return `${diffDays}d ago`
  }

  return (
    <div className="flex items-center justify-center space-x-3 text-sm">
      <AnimatePresence mode="wait">
        {isUpdating ? (
          <motion.div
            key="updating"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4 animate-spin text-primary-custom" />
            <span className="text-muted-accessible font-medium">Checking for updates...</span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2"
          >
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-red-500 font-medium">Update failed</span>
          </motion.div>
        ) : (
          <motion.div
            key="updated"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center space-x-2"
          >
            <Clock className="h-4 w-4 text-muted-accessible" />
            <span className="text-muted-accessible font-medium">
              {lastUpdated ? `Updated ${getTimeSince(lastUpdated)}` : "Never updated"}
            </span>
            {hasChanges && changedProjects.length > 0 && (
              <Badge
                variant="outline"
                className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {changedProjects.length} updated
              </Badge>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
