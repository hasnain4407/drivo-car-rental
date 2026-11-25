import { Link } from 'react-router-dom'
import { BadgeDollarSign, ShieldCheck, Clock3, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import Loader from '../components/Loader'
import CarCard from '../components/CarCard'
import { useData } from '../context/DataContext'

const perks = [
  { icon: BadgeDollarSign, title: 'Clear daily prices', text: 'The price you see is the price per day. No surprise charges at pickup.' },
  { icon: ShieldCheck, title: 'Checked before every trip', text: 'Each car is cleaned and inspected before it goes out.' },
  { icon: Clock3, title: 'Booking in two minutes', text: 'Pick a car, choose your dates and send one short form.' },
]

const Home = () => {
  const { cars, loading } = useData()
  const featured = cars.filter((c) => c.featured).slice(0, 3)

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold">A rental company that keeps it simple</h2>
            <p className="mt-4 max-w-prose text-zinc-600 dark:text-zinc-400">
              Drivo started with a simple idea: renting a car should feel as easy as ordering food. We keep a small
              fleet of well-maintained cars, from hatchbacks for city errands to SUVs and vans for family trips.
            </p>
          </div>
          <ul className="space-y-4">
            {perks.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.12} className="card flex gap-4 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-700/10 text-emerald-700 dark:text-emerald-400">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-bold">Featured cars</h2>
          <Link to="/cars" className="flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
            See all cars <ArrowRight size={16} />
          </Link>
        </div>
        {loading ? <Loader text="Loading cars..." /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      <Reveal className="mx-auto mt-16 max-w-6xl px-4">
        <div className="rounded-xl bg-emerald-800 p-8 text-white md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Need a car this weekend?</h2>
            <p className="mt-1 text-emerald-100">Send a booking request now and we will confirm it shortly.</p>
          </div>
          <Link to="/booking" className="btn-primary mt-5 !bg-yellow-400 !text-zinc-900 hover:!bg-yellow-300 md:mt-0">
            Book a car
          </Link>
        </div>
      </Reveal>
    </>
  )
}

export default Home
