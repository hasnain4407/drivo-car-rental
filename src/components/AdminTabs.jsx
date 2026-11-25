import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/cars', label: 'Cars' },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/users', label: 'Users' },
]

const AdminTabs = () => (
  <div className="mb-6 flex flex-wrap gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
    {tabs.map((t) => (
      <NavLink
        key={t.to}
        to={t.to}
        end={t.end}
        className={({ isActive }) =>
          `rounded-lg px-4 py-2 text-sm font-medium ${isActive ? 'bg-emerald-700 text-white' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`
        }
      >
        {t.label}
      </NavLink>
    ))}
  </div>
)

export default AdminTabs
