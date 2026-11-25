import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'

const Footer = () => {
  const social = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ]

  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">Drivo</p>
          <p className="mt-2 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
            Clean cars, clear prices and booking that takes about two minutes.
          </p>
        </div>

        <div>
          <p className="font-semibold">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><Link to="/cars" className="hover:text-emerald-700">Browse cars</Link></li>
            <li><Link to="/booking" className="hover:text-emerald-700">Book a car</Link></li>
            <li><Link to="/history" className="hover:text-emerald-700">My bookings</Link></li>
            <li><Link to="/login" className="hover:text-emerald-700">Log in</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-center gap-2"><Phone size={15} /> +92 310-7729503</li>
            <li className="flex items-center gap-2"><Mail size={15} /> gcsrwp4407@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin size={15} /> Islamabad, Pakistan</li>
          </ul>
          <div className="mt-4 flex gap-2">
            {social.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-lg border border-zinc-300 p-2 transition hover:border-emerald-700 hover:text-emerald-700 dark:border-zinc-700"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800">
        © {new Date().getFullYear()} Drivo Car Rental. Student project built with React and Tailwind CSS.
      </div>
    </footer>
  )
}

export default Footer
