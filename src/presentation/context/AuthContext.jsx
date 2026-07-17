import { createContext, useEffect, useState } from 'react'
import { container } from '../../core/container'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    container.authRepository.getCurrentUser().then((current) => {
      setUser(current)
      setLoading(false)
    })
  }, [])

  async function login(email, password) {
    setError(null)
    try {
      const loggedUser = await container.loginUseCase.execute(email, password)
      setUser(loggedUser)
      return loggedUser
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function logout() {
    await container.logoutUseCase.execute()
    setUser(null)
  }

  const value = { user, loading, error, login, logout, isAuthenticated: !!user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
