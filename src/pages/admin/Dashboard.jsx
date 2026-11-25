import { motion } from 'framer-motion'
import AdminTabs from '../../components/AdminTabs'
import CountUp from '../../components/CountUp'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
import { statusStyle } from '../BookingHistory'

const barColor = { Pending: 'bg-yellow-400', Confirmed: 'bg-emerald-600', Completed: 'bg-sky-500', Cancelled: 'bg-zinc-400' }

const Dashboard = () => {
  const { cars, bookings } = useData()
  const { users } = useAuth()

  const byStatus = { Pending: 0, Confirmed: 0, Completed: 0, Cancelled: 0 }
  bookings.forEach((b) => { byStatus[b.status] += 1 })
  const stats = {
    cars: cars.length,
    availableCars: cars.filter((c) => c.available).length,
    users: users.length,
    bookings: bookings.length,
    byStatus,
    revenue: bookings.filter((b) => b.status !== 'Cancelled').reduce((sum, b) => sum + b.total, 0),
    recent: bookings.slice(0, 5),
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">Admin dashboard</h1>
      <AdminTabs />
      {(
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              ['Total cars', stats.cars],
              ['Available cars', stats.availableCars],
              ['Users', stats.users],
              ['Bookings', stats.bookings],
              ['Pending', stats.byStatus.Pending],
              ['Booking value', stats.revenue, '$'],
            ].map(([label, value, prefix]) => (
              <div key={label} className="card p-4">
                <p className="text-sm text-zinc-500">{label}</p>
                <p className="font-display mt-1 text-2xl font-bold"><CountUp value={value} prefix={prefix} /></p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="card p-5">
              <h2 className="mb-4 text-lg font-bold">Bookings by status</h2>
              {stats.bookings === 0 ? <p className="text-sm text-zinc-500">No bookings yet.</p> : (
                <ul className="space-y-3">
                  {Object.entries(stats.byStatus).map(([status, count]) => (
                    <li key={status}>
                      <div className="mb-1 flex justify-between text-sm"><span>{status}</span><span className="font-semibold">{count}</span></div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <motion.div
                          className={`h-full rounded-full ${barColor[status]}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / stats.bookings) * 100}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="card p-5">
              <h2 className="mb-4 text-lg font-bold">Recent bookings</h2>
              {stats.recent.length === 0 ? <p className="text-sm text-zinc-500">New requests will appear here.</p> : (
                <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {stats.recent.map((b) => (
                    <li key={b.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                      <span><b>{b.name}</b> booked {b.carName}</span>
                      <span className="flex items-center gap-3">
                        ${b.total}
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[b.status]}`}>{b.status}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
