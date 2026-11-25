import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Fuel, Settings2, Users } from 'lucide-react'
import CarImage from '../components/CarImage'
import Loader from '../components/Loader'
import { useData } from '../context/DataContext'

const CarDetails = () => {
  const { id } = useParams()
  const { cars, loading } = useData()
  const car = cars.find((c) => String(c.id) === id)

  if (loading) return <Loader />

  if (!car) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Car not found</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">This car may have been removed from the fleet.</p>
        <Link to="/cars" className="btn-primary mt-6">Back to all cars</Link>
      </div>
    )
  }

  const specs = [
    { icon: Fuel, label: 'Fuel', value: car.fuel },
    { icon: Users, label: 'Seats', value: car.seats },
    { icon: Settings2, label: 'Transmission', value: car.transmission },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/cars" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400">
        <ArrowLeft size={16} /> All cars
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-5">
        <CarImage car={car} className="h-72 w-full rounded-xl sm:h-96 lg:col-span-3" />

        <div className="lg:col-span-2">
          <p className="text-sm text-zinc-500">{car.brand} · {car.category}</p>
          <h1 className="text-3xl font-bold">{car.name}</h1>
          <p className="mt-3">
            <span className="font-display text-3xl font-bold">${car.pricePerDay}</span>
            <span className="text-zinc-500"> / day</span>
          </p>
          <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${car.available ? 'bg-emerald-700 text-white' : 'bg-zinc-300 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200'}`}>
            {car.available ? 'Available now' : 'Currently booked'}
          </span>
          <p className="mt-5 text-zinc-600 dark:text-zinc-400">{car.description}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="card p-3 text-center">
                <Icon size={18} className="mx-auto text-emerald-700 dark:text-emerald-400" />
                <p className="mt-1 text-xs text-zinc-500">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>

          {car.features?.length > 0 && (
            <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
              {car.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><Check size={15} className="text-emerald-700" /> {f}</li>
              ))}
            </ul>
          )}

          {car.available ? (
            <Link to={`/booking/${car.id}`} className="btn-primary mt-8 w-full">Book this car</Link>
          ) : (
            <button disabled className="btn-primary mt-8 w-full">Unavailable</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarDetails
