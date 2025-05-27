export interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  created_at: string
  pushed_at: string
  full_name: string
  private: boolean
  archived: boolean
  disabled: boolean
}

export interface GitHubApiResponse {
  repositories: Repository[]
  lastUpdated: string
  rateLimit: {
    remaining: number
    resetTime: number
  }
}

class GitHubAPI {
  private readonly baseUrl = "https://api.github.com"
  private readonly username = "mtctx"
  private readonly maxRetries = 3
  private readonly retryDelay = 1000

  async fetchRepositories(): Promise<GitHubApiResponse> {
    const url = `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=10`

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "Portfolio-Website",
          },
        })

        if (!response.ok) {
          if (response.status === 403) {
            // Rate limit exceeded
            const resetTime = Number.parseInt(response.headers.get("X-RateLimit-Reset") || "0") * 1000
            throw new Error(`Rate limit exceeded. Reset at: ${new Date(resetTime).toISOString()}`)
          }
          throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
        }

        const data: Repository[] = await response.json()

        // Filter and sort repositories
        const filteredRepos = data
          .filter((repo) => !repo.name.includes(this.username) && !repo.private && !repo.archived && !repo.disabled)
          .sort(
            (a, b) => new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime(),
          )

        return {
          repositories: filteredRepos,
          lastUpdated: new Date().toISOString(),
          rateLimit: {
            remaining: Number.parseInt(response.headers.get("X-RateLimit-Remaining") || "0"),
            resetTime: Number.parseInt(response.headers.get("X-RateLimit-Reset") || "0") * 1000,
          },
        }
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error)

        if (attempt === this.maxRetries) {
          throw error
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay * attempt))
      }
    }

    throw new Error("All retry attempts failed")
  }

  async fetchRepositoryDetails(repoName: string): Promise<Repository> {
    const url = `${this.baseUrl}/repos/${this.username}/${repoName}`

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-Website",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch repository details: ${response.status}`)
    }

    return response.json()
  }
}

export const githubAPI = new GitHubAPI()
