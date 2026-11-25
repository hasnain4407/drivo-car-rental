import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Car, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/cars', label: 'Cars' },
    { to: '/history', label: 'My bookings' },
  ]
  if (user?.role === 'admin') links.push({ to: '/admin', label: 'Admin' })

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-emerald-700/10 text-emerald-800 dark:text-emerald-300'
        : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'
    }`

  const handleLogout = async () => {
    await logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-display flex items-center gap-2 text-xl font-bold" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-700 text-white">
            <Car size={18} />
          </span>
          Drivo
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="btn-outline !py-2">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline !py-2">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary !py-2">
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="cursor-pointer rounded-lg p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="space-y-1 border-t border-zinc-200 px-4 py-3 md:hidden dark:border-zinc-800">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={(s) => `block ${linkClass(s)}`}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex gap-2 pt-2">
            {user ? (
              <button onClick={handleLogout} className="btn-outline flex-1">
                Log out ({user.name.split(' ')[0]})
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn-outline flex-1">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary flex-1">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
