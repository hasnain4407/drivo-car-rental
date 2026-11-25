import { useMemo, useState } from 'react'
import { Search, Trash2 } from 'lucide-react'
import AdminTabs from '../../components/AdminTabs'
import { useData } from '../../context/DataContext'

const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

const ManageBookings = () => {
  const { bookings, updateBookingStatus, deleteBooking } = useData()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase()
    return bookings.filter(
      (b) => (statusFilter === 'All' || b.status === statusFilter) &&
        (!q || `${b.name} ${b.carName} ${b.phone} ${b.email}`.toLowerCase().includes(q))
    )
  }, [bookings, search, statusFilter])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">Manage bookings</h1>
      <AdminTabs />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="relative sm:col-span-2">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by customer, car, phone or email" aria-label="Search bookings" className="input pl-9" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status" className="input">
          <option>All</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {shown.length === 0 ? (
        <p className="card p-6 text-sm text-zinc-500">No bookings found.</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
              <tr>
                <th className="p-3 font-medium">Customer</th>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium">Dates</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {shown.map((b) => (
                <tr key={b.id}>
                  <td className="p-3"><p className="font-semibold">{b.name}</p><p className="text-xs text-zinc-500">{b.phone}</p></td>
                  <td className="p-3">{b.carName}</td>
                  <td className="p-3">{b.startDate} to {b.endDate}</td>
                  <td className="p-3">${b.total}</td>
                  <td className="p-3">
                    <select value={b.status} onChange={(e) => updateBookingStatus(b.id, e.target.value)} className="input !w-auto !py-1.5" aria-label={`Status for ${b.name}`}>
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => window.confirm('Delete this booking?') && deleteBooking(b.id)} aria-label="Delete booking" className="cursor-pointer rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageBookings
