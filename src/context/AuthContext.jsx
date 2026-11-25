import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// Demo auth only: accounts live in this browser's localStorage (no backend), so passwords are not secure.
const AuthContext = createContext()

const ADMIN = { id: 'admin-1', name: 'Admin', email: 'admin@Drivo.com', password: 'admin123', role: 'admin', blocked: false }
const publicUser = ({ password, ...rest }) => rest

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage('Drivo-users', [ADMIN])
  const [currentId, setCurrentId] = useLocalStorage('Drivo-current-user', null)

  const found = users.find((u) => u.id === currentId && !u.blocked)
  const user = found ? publicUser(found) : null

  const signup = ({ name, email, password }) => {
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase()))
      throw new Error('An account with this email already exists.')
    const newUser = { id: String(Date.now()), name: name.trim(), email: email.trim().toLowerCase(), password, role: 'user', blocked: false }
    setUsers((p) => [...p, newUser])
    setCurrentId(newUser.id)
  }

  const login = ({ email, password }) => {
    const u = users.find((x) => x.email === email.trim().toLowerCase() && x.password === password)
    if (!u) throw new Error('Email or password is incorrect.')
    if (u.blocked) throw new Error('Your account has been blocked.')
    setCurrentId(u.id)
  }

  const logout = () => setCurrentId(null)

  // Admin tools
  const setRole = (id, role) => setUsers((p) => p.map((u) => (u.id === id ? { ...u, role } : u)))
  const toggleBlock = (id) => setUsers((p) => p.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u)))

  return (
    <AuthContext.Provider value={{ user, loading: false, users: users.map(publicUser), signup, login, logout, setRole, toggleBlock }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
