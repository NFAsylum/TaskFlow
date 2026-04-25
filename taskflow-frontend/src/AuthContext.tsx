import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  token: string | null
  userName: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function getNameFromToken(token: string) {
  return JSON.parse(atob(token.split('.')[1])).name
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  )

  const [userName, setUserName] = useState<string | null>(
    token ? getNameFromToken(token) : null,
  )

  function login(newToken: string) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUserName(getNameFromToken(newToken))
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUserName(null)
  }

  return (
    <AuthContext.Provider value={{ token, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
