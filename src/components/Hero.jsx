import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, ArrowRight } from 'lucide-react'
import { today } from '../utils/validators'

const Hero = () => {
  const navigate = useNavigate()
  const [dates, setDates] = useState({ startDate: '', endDate: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/cars')
  }

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-300">
            SIMPLE · RELIABLE · READY TO DRIVE
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Pick up the keys.
            <br />
            Skip the paperwork.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-zinc-300">
            Find the right car for your next trip. Compare daily prices and send a booking request in minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => navigate('/cars')} className="btn-primary !bg-yellow-400 !text-zinc-900 hover:!bg-yellow-300">
              Browse cars <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate('/booking')} className="btn-outline !border-zinc-600 text-white hover:!bg-zinc-800">
              Book a car
            </button>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-9 max-w-xl rounded-2xl border border-zinc-700 bg-zinc-900/90 p-5 shadow-2xl shadow-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="flex items-center gap-2 font-semibold">
              <CalendarDays size={18} className="text-yellow-400" /> When do you need a car?
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="h-start" className="mb-1 block text-xs text-zinc-300">Pickup date</label>
                <input id="h-start" type="date" min={today()} value={dates.startDate}
                  onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                  className="input !border-zinc-600 !bg-zinc-950 !text-white [color-scheme:dark]" />
              </div>
              <div>
                <label htmlFor="h-end" className="mb-1 block text-xs text-zinc-300">Return date</label>
                <input id="h-end" type="date" min={dates.startDate || today()} value={dates.endDate}
                  onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                  className="input !border-zinc-600 !bg-zinc-950 !text-white [color-scheme:dark]" />
              </div>
            </div>
            <button type="submit" className="btn-primary mt-4 w-full">See available cars</button>
          </motion.form>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-emerald-500/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 p-2 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=90"
              alt="Premium car parked outdoors"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/mercedes.svg' }}
              className="h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-[430px]"
            />
            <div className="absolute inset-x-2 bottom-2 rounded-b-2xl bg-gradient-to-t from-zinc-950/90 via-zinc-950/45 to-transparent px-6 pb-6 pt-16">
              <p className="text-sm font-medium text-emerald-300">Your next journey starts here</p>
              <p className="mt-1 text-xl font-bold text-white sm:text-2xl">Choose a ride that fits your plans.</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-emerald-500" aria-hidden="true" />
    </section>
  )
}

export default Hero
