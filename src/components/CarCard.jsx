import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Fuel, Users, Settings2 } from 'lucide-react'
import CarImage from './CarImage'

const CarCard = ({ car }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="card flex flex-col overflow-hidden"
  >
    <div className="group relative overflow-hidden">
      <CarImage car={car} className="aspect-[3/2] w-full" />
      <span
        className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
          car.available ? 'bg-emerald-700 text-white' : 'bg-zinc-900/80 text-zinc-200'
        }`}
      >
        {car.available ? 'Available' : 'Booked'}
      </span>
    </div>

    <div className="flex flex-1 flex-col p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold leading-tight">{car.name}</h3>
          <p className="text-sm text-zinc-500">{car.category}</p>
        </div>
        <p className="text-right">
          <span className="font-display text-xl font-bold">${car.pricePerDay}</span>
          <span className="block text-xs text-zinc-500">per day</span>
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
        <li className="flex items-center gap-1.5"><Fuel size={15} /> {car.fuel}</li>
        <li className="flex items-center gap-1.5"><Users size={15} /> {car.seats} seats</li>
        <li className="flex items-center gap-1.5"><Settings2 size={15} /> {car.transmission}</li>
      </ul>

      <div className="mt-5 flex gap-2 pt-1">
        <Link to={`/cars/${car.id}`} className="btn-outline flex-1">
          Details
        </Link>
        {car.available ? (
          <Link to={`/booking/${car.id}`} className="btn-primary flex-1">
            Book now
          </Link>
        ) : (
          <button disabled className="btn-primary flex-1">
            Unavailable
          </button>
        )}
      </div>
    </div>
  </motion.article>
)

export default CarCard
