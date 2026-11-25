import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="mx-auto max-w-xl px-4 py-24 text-center">
    <p className="font-display text-7xl font-extrabold text-emerald-700">404</p>
    <h1 className="mt-2 text-2xl font-bold">This road does not exist</h1>
    <p className="mt-2 text-zinc-600 dark:text-zinc-400">The page you are looking for was moved or never existed.</p>
    <Link to="/" className="btn-primary mt-6">Go to home</Link>
  </div>
)

export default NotFound
