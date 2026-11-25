import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Field from './Field'
import CarImage from './CarImage'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { validateBooking, calcDays, today } from '../utils/validators'

const BookingForm = ({ initialCarId = '' }) => {
  const { cars, addBooking } = useData()
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    carId: initialCarId ? String(initialCarId) : '',
    startDate: '',
    endDate: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirmed, setConfirmed] = useState(null)

  const availableCars = cars.filter((c) => c.available)
  const car = cars.find((c) => String(c.id) === form.carId)
  const days = calcDays(form.startDate, form.endDate)
  const total = car ? days * car.pricePerDay : 0

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined })
    setServerError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateBooking(form)
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      const booking = addBooking({
        ...form,
        name: form.name.trim(),
        carName: car.name,
        pricePerDay: car.pricePerDay,
        days,
        total,
        userEmail: user?.email || 'guest',
      })
      setConfirmed(booking)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (confirmed) {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <CheckCircle2 size={48} className="mx-auto text-emerald-700" />
        <h2 className="mt-4 text-2xl font-bold">Booking request sent</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {confirmed.carName} for {confirmed.days} {confirmed.days === 1 ? 'day' : 'days'}, total ${confirmed.total}.
          We will confirm it shortly.
        </p>
        <p className="mt-1 text-xs text-zinc-500">Reference: #{String(confirmed.id).slice(-6)}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/history" className="btn-primary">View my bookings</Link>
          <Link to="/cars" className="btn-outline">Browse more cars</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <form onSubmit={handleSubmit} noValidate className="card space-y-4 p-6 lg:col-span-2">
        {serverError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{serverError}</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="name" error={errors.name}>
            <input id="name" name="name" value={form.name} onChange={change} className="input" autoComplete="name" />
          </Field>
          <Field label="Email" htmlFor="email" error={errors.email}>
            <input id="email" name="email" type="email" value={form.email} onChange={change} className="input" autoComplete="email" />
          </Field>
          <Field label="Phone number" htmlFor="phone" error={errors.phone}>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={change} placeholder="+92 300 1234567" className="input" autoComplete="tel" />
          </Field>
          <Field label="Car" htmlFor="carId" error={errors.carId}>
            <select id="carId" name="carId" value={form.carId} onChange={change} className="input">
              <option value="">Select a car</option>
              {availableCars.map((c) => (
                <option key={c.id} value={c.id}>{c.name} - ${c.pricePerDay}/day</option>
              ))}
            </select>
          </Field>
          <Field label="Pickup date" htmlFor="startDate" error={errors.startDate}>
            <input id="startDate" name="startDate" type="date" min={today()} value={form.startDate} onChange={change} className="input" />
          </Field>
          <Field label="Return date" htmlFor="endDate" error={errors.endDate}>
            <input id="endDate" name="endDate" type="date" min={form.startDate || today()} value={form.endDate} onChange={change} className="input" />
          </Field>
        </div>
        <Field label="Special requests (optional)" htmlFor="notes">
          <textarea id="notes" name="notes" rows="3" value={form.notes} onChange={change} className="input" placeholder="Child seat, airport pickup, driver..." />
        </Field>
        <button type="submit" disabled={busy} className="btn-primary w-full sm:w-auto">Send booking request</button>
      </form>

      <aside className="card h-fit overflow-hidden lg:sticky lg:top-24">
        {car ? <CarImage car={car} className="aspect-[3/2] w-full" /> : <div className="grid aspect-[3/2] place-items-center bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-800">Select a car to see the summary</div>}
        <div className="space-y-2 p-5 text-sm">
          <p className="text-lg font-bold">{car ? car.name : 'Price summary'}</p>
          <div className="flex justify-between"><span className="text-zinc-500">Price per day</span><span>{car ? `$${car.pricePerDay}` : '-'}</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Days</span><span>{days || '-'}</span></div>
          <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-bold dark:border-zinc-800">
            <span>Total</span><span>{total ? `$${total}` : '-'}</span>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default BookingForm
