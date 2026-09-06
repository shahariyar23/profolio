// Type declarations for the Vite config (node built-ins used in plugins).
declare module 'node:fs' {
  export function readFileSync(path: string, encoding: string): string
  export function existsSync(path: string): boolean
}
declare module 'node:path' {
  export function resolve(...paths: string[]): string
  export function dirname(path: string): string
}
declare module 'node:url' {
  export interface URL {
    href: string
  }
}
