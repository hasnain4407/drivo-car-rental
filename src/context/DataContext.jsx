import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import seedCars from '../data/cars.json'

// Cars and bookings are saved in localStorage (allowed by the task). No backend needed.
const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [cars, setCars] = useLocalStorage('Drivo-cars', seedCars)

  // Upgrade cars saved by an older version: only the old demo image paths are replaced,
  // so image URLs that an admin entered are never overwritten.
  useEffect(() => {
    const seed = new Map(seedCars.map((c) => [c.id, c]))
    const oldDemo = /^\/images\/(corolla|civic|alto|fortuner|sportage|mercedes|hiace|tesla)\.(svg|jpg)$/
    setCars((current) => current.map((car) => {
      const s = seed.get(car.id)
      if (!s) return car
      return {
        ...car,
        illustration: car.illustration || s.illustration,
        image: oldDemo.test(car.image || '') ? s.image : car.image,
      }
    }))
  }, [])

  const [bookings, setBookings] = useLocalStorage('Drivo-bookings', [])

  const addBooking = (data) => {
    // Block double booking: same car, overlapping dates, still active.
    const clash = bookings.find(
      (b) => String(b.carId) === String(data.carId) && ['Pending', 'Confirmed'].includes(b.status) &&
        b.startDate < data.endDate && b.endDate > data.startDate
    )
    if (clash) throw new Error(`This car is already booked from ${clash.startDate} to ${clash.endDate}. Choose different dates.`)
    const booking = { ...data, id: `${Date.now()}${Math.floor(Math.random() * 90 + 10)}`, status: 'Pending', createdAt: new Date().toISOString() }
    setBookings((p) => [booking, ...p])
    return booking
  }
  const updateBookingStatus = (id, status) => setBookings((p) => p.map((b) => (b.id === id ? { ...b, status } : b)))
  const deleteBooking = (id) => setBookings((p) => p.filter((b) => b.id !== id))

  const addCar = (car) => setCars((p) => [...p, { available: true, featured: false, features: [], ...car, id: Date.now() }])
  const updateCar = (id, changes) => setCars((p) => p.map((c) => (c.id === id ? { ...c, ...changes } : c)))
  const deleteCar = (id) => setCars((p) => p.filter((c) => c.id !== id))

  return (
    <DataContext.Provider value={{ cars, loading: false, error: '', bookings, addBooking, updateBookingStatus, deleteBooking, addCar, updateCar, deleteCar }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
