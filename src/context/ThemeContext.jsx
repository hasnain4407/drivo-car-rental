import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useLocalStorage(
    'Drivo-dark',
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
