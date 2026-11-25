import { useState } from 'react'
import { Car } from 'lucide-react'

// Tries the car photo first, then the built-in illustration, then a plain placeholder.
const CarImage = ({ car, className = '' }) => {
  const [failed, setFailed] = useState([])
  const src = [car.image, car.illustration].filter(Boolean).find((s) => !failed.includes(s))

  if (!src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900 text-emerald-300 ${className}`}>
        <Car size={44} strokeWidth={1.5} />
        <span className="mt-2 text-xs text-zinc-300">{car.name}</span>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-950 ${className}`}>
      <img
        src={src}
        alt={`${car.name} car`}
        loading="lazy"
        onError={() => setFailed((f) => [...f, src])}
        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
      />
    </div>
  )
}

export default CarImage
