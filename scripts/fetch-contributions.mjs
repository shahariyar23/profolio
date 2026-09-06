// =============================================================
// Build-time GitHub contribution calendar fetcher.
//
// WHAT IT DOES:
//   Runs at BUILD / DEPLOY time (not in the browser). Uses a
//   server-side GITHUB_TOKEN to query GitHub's GraphQL API for
//   your real contribution calendar, then writes the result to
//   src/data/contributions.json.
//
// WHY BUILD-TIME:
//   GitHub's contribution data is NOT available through the public
//   REST API — it requires an authenticated GraphQL call. Doing this
//   at build time means:
//     - your token NEVER ships to the browser
//     - the deployed site makes ZERO runtime requests to GitHub
//     - data is cached in static JSON and revalidated on each deploy
//
// USAGE:
//   GITHUB_TOKEN=ghp_xxx npm run fetch:contributions
//   (or: npm run build  ->  runs prebuild automatically)
//
// The token needs only the default public read scope (no scopes
// required for public contribution data). Create one at:
//   https://github.com/settings/tokens -> Generate new token (classic)
//   Do NOT tick any scopes for public data.
// =============================================================

// Load .env into process.env (no dependency, works on all Node versions)
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

function loadEnv() {
  try {
    const here = dirname(fileURLToPath(import.meta.url))
    const envPath = join(here, '..', '.env')
    const raw = readFileSync(envPath, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const val = trimmed.slice(eq + 1).trim()
      if (key && !(key in process.env)) process.env[key] = val
    }
  } catch {
    // .env missing — fall back to process.env
  }
}

loadEnv()

const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ''
const LOGIN = 'shahariyar23'
const API = 'https://api.github.com/graphql'
const OUT = 'src/data/contributions.json'

// Fetch a wide window covering 2024-01-01 -> 2026-12-31 so we can
// group by year for the year selector in a single request.
// GitHub's GraphQL API requires `from`/`to` span <= 1 year, so we query
// each year independently and combine the weeks.
const YEARS = [2024, 2025, 2026]

const QUERY = `
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    login
    name
    url
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        months {
          name
          firstDay
        }
        weeks {
          contributionDays {
            date
            weekday
            contributionCount
            color
            contributionLevel
          }
        }
      }
    }
  }
}
`

function groupByYear(weeks) {
  const years = {}
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      const year = day.date.slice(0, 4)
      if (!years[year]) years[year] = { weeks: {}, total: 0 }
      // key weeks by their first day so month-grouping is stable
      const wk = day.weekday === 0 ? day.date : null
      years[year].total += day.contributionCount
    }
  }
  // Rebuild per-year week arrays preserving order
  for (const year of Object.keys(years)) {
    const weekMap = {}
    for (const week of weeks) {
      const days = week.contributionDays.filter((d) => d.date.startsWith(year))
      if (!days.length) continue
      // group by ISO week start (Sunday)
      const key = (() => {
        const sunday = days.find((d) => d.weekday === 0)
        return sunday ? sunday.date : days[0].date
      })()
      if (!weekMap[key]) weekMap[key] = []
      weekMap[key].push(...days)
    }
    years[year].weeks = Object.values(weekMap)
  }
  return years
}

async function main() {
  const result = {
    login: LOGIN,
    profileUrl: `https://github.com/${LOGIN}`,
    fetchAt: new Date().toISOString(),
    years: {},
    error: null,
  }

  if (!TOKEN) {
    console.warn(
      '\n[fetch-contributions] No GITHUB_TOKEN set — writing empty data.\n' +
        'The component will show a graceful fallback with a link to your profile.\n' +
        'To populate real data, run: GITHUB_TOKEN=ghp_xxx npm run fetch:contributions\n',
    )
    result.error = 'no_token'
    write(result)
    return
  }

  try {
    // Fetch each year separately (API requires from/to span <= 1 year)
    let combinedWeeks = []
    let userInfo = null

    for (const year of YEARS) {
      const from = `${year}-01-01T00:00:00Z`
      const to = `${year}-12-31T23:59:59Z`

      const res = await fetch(API, {
        method: 'POST',
        headers: {
          Authorization: `bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: QUERY,
          variables: { login: LOGIN, from, to },
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`GitHub API HTTP ${res.status} for ${year}: ${text.slice(0, 200)}`)
      }

      const json = await res.json()

      if (json.errors) {
        throw new Error(`GraphQL errors for ${year}: ${JSON.stringify(json.errors).slice(0, 200)}`)
      }

      const user = json?.data?.user
      if (!user) throw new Error(`No user returned for ${year}`)

      const cal = user.contributionsCollection?.contributionCalendar
      if (!cal) throw new Error(`No contribution calendar returned for ${year}`)

      if (!userInfo) {
        userInfo = user
      }
      combinedWeeks = combinedWeeks.concat(cal.weeks)
    }

    if (!combinedWeeks.length) throw new Error('No contribution data returned across any year')

    result.login = userInfo.login
    result.profileName = userInfo.name || userInfo.login
    result.profileUrl = userInfo.url
    result.years = groupByYear(combinedWeeks)

    const yearCount = Object.keys(result.years).length
    const total = Object.values(result.years).reduce((s, y) => s + y.total, 0)
    const perYear = Object.entries(result.years)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([y, d]) => `${y}: ${d.total}`)
      .join(' · ')
    console.log(
      `\n[fetch-contributions] OK — ${total} contributions across ${yearCount} year(s) (${perYear}). Written to ${OUT}\n`,
    )
    write(result)
  } catch (err) {
    console.error(`\n[fetch-contributions] FAILED: ${err.message}`)
    console.warn('Writing empty data; component will show the fallback.\n')
    result.error = err.message
    write(result)
  }
}

function write(data) {
  import('node:fs').then((fs) => {
    fs.mkdirSync('src/data', { recursive: true })
    fs.writeFileSync(OUT, JSON.stringify(data, null, 2))
  })
}

main()
