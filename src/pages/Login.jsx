import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Field from '../components/Field'
import { useAuth } from '../context/AuthContext'
import { validateLogin } from '../utils/validators'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [busy, setBusy] = useState(false)

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validateLogin(form)
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      await login(form)
      navigate(location.state?.from || '/', { replace: true })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <form onSubmit={handleSubmit} noValidate className="card space-y-4 p-6">
        <h1 className="text-2xl font-bold">Log in</h1>
        {location.state?.from && <p className="text-sm text-zinc-600 dark:text-zinc-400">Log in to continue.</p>}
        {serverError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{serverError}</p>}
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" value={form.email} onChange={change} className="input" autoComplete="email" />
        </Field>
        <Field label="Password" htmlFor="password" error={errors.password}>
          <input id="password" name="password" type="password" value={form.password} onChange={change} className="input" autoComplete="current-password" />
        </Field>
        <button type="submit" disabled={busy} className="btn-primary w-full">{busy ? 'Logging in...' : 'Log in'}</button>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          New here? <Link to="/signup" className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400">Create an account</Link>
        </p>
        <p className="rounded-lg bg-zinc-100 p-3 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          Admin demo: admin@Drivo.com / admin123
        </p>
      </form>
    </div>
  )
}

export default Login
