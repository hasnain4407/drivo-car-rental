import { useParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'

const Booking = () => {
  const { carId } = useParams()
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Book a car</h1>
      <p className="mb-6 mt-1 text-zinc-600 dark:text-zinc-400">Fill in your details and choose your dates. The total updates as you go.</p>
      <BookingForm key={carId || 'new'} initialCarId={carId} />
    </div>
  )
}

export default Booking
