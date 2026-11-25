import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SearchX } from 'lucide-react'
import CarCard from '../components/CarCard'
import SearchFilter, { defaultFilters } from '../components/SearchFilter'
import Loader from '../components/Loader'
import { useData } from '../context/DataContext'

const Cars = () => {
  const { cars, loading, error } = useData()
  const maxAvailablePrice = Math.max(200, ...cars.map((c) => c.pricePerDay))
  const [filters, setFilters] = useState(defaultFilters)
  const categories = ['All', ...new Set(cars.map((c) => c.category))]

  const results = useMemo(() => {
    const q = filters.search.trim().toLowerCase()
    let list = cars.filter(
      (c) =>
        (!q || `${c.name} ${c.brand}`.toLowerCase().includes(q)) &&
        (filters.category === 'All' || c.category === filters.category) &&
        c.pricePerDay <= filters.maxPrice &&
        (!filters.availableOnly || c.available)
    )
    if (filters.sort === 'low') list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay)
    if (filters.sort === 'high') list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay)
    return list
  }, [cars, filters])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Our cars</h1>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">Search, filter and pick the car that fits your trip.</p>

      {loading ? <Loader text="Loading cars..." /> : error ? (
        <p role="alert" className="card mt-6 p-6 text-sm text-red-700 dark:text-red-300">{error}</p>
      ) : (<>
      <div className="mt-6">
        <SearchFilter filters={filters} setFilters={setFilters} categories={categories} maxAvailablePrice={maxAvailablePrice} />
      </div>

      <p className="mt-6 text-sm text-zinc-500" aria-live="polite">
        {results.length} {results.length === 1 ? 'car' : 'cars'} found
      </p>

      {results.length ? (
        <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="card mt-3 py-16 text-center">
          <SearchX size={40} className="mx-auto text-zinc-400" />
          <p className="mt-3 font-semibold">No cars match these filters</p>
          <p className="text-sm text-zinc-500">Try a different name, a higher price limit or reset the filters.</p>
        </div>
      )}
      </>)}
    </div>
  )
}

export default Cars
