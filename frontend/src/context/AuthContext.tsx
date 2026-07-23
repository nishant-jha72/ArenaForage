import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { tokenStorage } from '../api/client'
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  type LoginPayload,
  type RegisterPayload,
} from '../api/auth'
import type { User } from '../types/user'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      // Restore session if either token is present. Expired access tokens are
      // refreshed automatically by the axios 401 interceptor using refreshToken.
      if (!tokenStorage.getAccessToken() && !tokenStorage.getRefreshToken()) {
        setIsLoading(false)
        return
      }
      try {
        const me = await getCurrentUser()
        if (!cancelled) setUser(me)
      } catch {
        tokenStorage.clearTokens()
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  async function login(payload: LoginPayload) {
    const response = await loginUser(payload)
    tokenStorage.setTokens(
      response.data.tokens.accessToken,
      response.data.tokens.refreshToken,
    )
    setUser(response.data.user)
  }

  async function register(payload: RegisterPayload) {
    // /auth/register only creates the account (per the API), so log in right after.
    await registerUser(payload)
    await login({ email: payload.email, password: payload.password })
  }

  async function logout() {
    const refreshToken = tokenStorage.getRefreshToken()
    try {
      if (refreshToken) await logoutUser(refreshToken)
    } catch {
      // Clear the local session even if the server call fails.
    } finally {
      tokenStorage.clearTokens()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
