import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock environment variables
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
process.env.TURSO_CONNECTION_URL = 'sqlite::memory:'
process.env.TURSO_AUTH_TOKEN = 'test-token'
process.env.BETTER_AUTH_SECRET = 'test-secret'
