import { useEffect, useState } from 'react'
import { profile, curatedRepos } from '../data/portfolio'

export type GithubRepo = {
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  pushed_at: string
}

export type GithubUser = {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  bio: string | null
  created_at: string
}

export type GithubData = {
  user: GithubUser | null
  repos: GithubRepo[]
  totalStars: number
  topLanguages: { name: string; count: number }[]
  activityByMonth: { month: string; count: number }[]
}

const fallbackUser: GithubUser = {
  login: profile.github.username,
  name: profile.name,
  avatar_url: `https://avatars.githubusercontent.com/u/191502851?v=4`,
  html_url: profile.github.url,
  public_repos: 34,
  followers: 1,
  following: 0,
  bio: profile.shortBio,
  created_at: '2024-12-12T16:49:59Z',
}

function buildActivity(repos: GithubRepo[]): { month: string; count: number }[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const counts = new Array(12).fill(0)
  for (const r of repos) {
    if (!r.pushed_at) continue
    const d = new Date(r.pushed_at)
    counts[d.getMonth()] += 1
  }
  return months.map((m, i) => ({ month: m, count: counts[i] }))
}

function buildTopLanguages(repos: GithubRepo[]): { name: string; count: number }[] {
  const map = new Map<string, number>()
  for (const r of repos) {
    if (!r.language) continue
    map.set(r.language, (map.get(r.language) || 0) + 1)
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
}

export function useGithubData() {
  const [data, setData] = useState<GithubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const username = profile.github.username

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const user: GithubUser = await userRes.json()
        const repos: GithubRepo[] = await reposRes.json()
        const sorted = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)
        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)

        if (!cancelled) {
          setData({
            user,
            repos: sorted,
            totalStars,
            topLanguages: buildTopLanguages(repos),
            activityByMonth: buildActivity(repos),
          })
        }
      } catch {
        if (!cancelled) {
          setError(true)
          setData({
            user: fallbackUser,
            repos: [],
            totalStars: 0,
            topLanguages: [],
            activityByMonth: [],
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error, curatedRepos }
}
