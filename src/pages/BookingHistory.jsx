import { Link } from 'react-router-dom'
import { CalendarX } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'

export const statusStyle = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-400/15 dark:text-yellow-300',
  Confirmed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  Completed: 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300',
  Cancelled: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300',
}

const BookingHistory = () => {
  const { bookings, updateBookingStatus } = useData()
  const { user } = useAuth()
  const mine = bookings.filter((b) => b.userEmail === (user?.email || 'guest'))

  const cancel = (id) => {
    if (window.confirm('Cancel this booking?')) updateBookingStatus(id, 'Cancelled')
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">My bookings</h1>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">Bookings you made on this device{user ? ' with this account.' : ' (log in to keep them under your account).'}</p>

      {mine.length === 0 ? (
        <div className="card mt-6 py-16 text-center">
          <CalendarX size={40} className="mx-auto text-zinc-400" />
          <p className="mt-3 font-semibold">No bookings yet</p>
          <p className="text-sm text-zinc-500">When you book a car, it will show up here.</p>
          <Link to="/cars" className="btn-primary mt-5">Browse cars</Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {mine.map((b) => (
            <li key={b.id} className="card flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="text-lg font-bold">{b.carName}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {b.startDate} to {b.endDate} · {b.days} {b.days === 1 ? 'day' : 'days'}
                </p>
                <p className="text-xs text-zinc-500">Ref #{String(b.id).slice(-6)}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-display text-xl font-bold">${b.total}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[b.status]}`}>{b.status}</span>
                {b.status === 'Pending' && (
                  <button onClick={() => cancel(b.id)} className="btn-outline !px-3 !py-1.5">Cancel</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookingHistory
