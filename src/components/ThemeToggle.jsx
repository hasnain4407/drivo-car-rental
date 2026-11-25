import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { dark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="cursor-pointer rounded-lg p-2 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle
