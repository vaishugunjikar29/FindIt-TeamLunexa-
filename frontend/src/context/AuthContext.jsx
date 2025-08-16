import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('findit_user')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  function login({ email }) {
    const u = { name: email.split('@')[0], email }
    setUser(u)
    localStorage.setItem('findit_user', JSON.stringify(u))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('findit_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
