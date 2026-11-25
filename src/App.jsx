import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetails from './pages/CarDetails'
import Booking from './pages/Booking'
import BookingHistory from './pages/BookingHistory'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import Dashboard from './pages/admin/Dashboard'
import ManageCars from './pages/admin/ManageCars'
import ManageBookings from './pages/admin/ManageBookings'
import ManageUsers from './pages/admin/ManageUsers'

const admin = (page) => <ProtectedRoute adminOnly>{page}</ProtectedRoute>

const App = () => {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />
      <motion.main
        key={location.pathname}
        className="flex-1"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:carId" element={<Booking />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={admin(<Dashboard />)} />
          <Route path="/admin/cars" element={admin(<ManageCars />)} />
          <Route path="/admin/bookings" element={admin(<ManageBookings />)} />
          <Route path="/admin/users" element={admin(<ManageUsers />)} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  )
}

export default App
