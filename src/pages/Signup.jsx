import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Field from '../components/Field'
import { useAuth } from '../context/AuthContext'
import { validateSignup } from '../utils/validators'

const Signup = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [busy, setBusy] = useState(false)

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validateSignup(form)
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      await signup({ name: form.name, email: form.email, password: form.password })
      navigate('/', { replace: true })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <form onSubmit={handleSubmit} noValidate className="card space-y-4 p-6">
        <h1 className="text-2xl font-bold">Create your account</h1>
        {serverError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{serverError}</p>}
        <Field label="Full name" htmlFor="name" error={errors.name}>
          <input id="name" name="name" value={form.name} onChange={change} className="input" autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" type="email" value={form.email} onChange={change} className="input" autoComplete="email" />
        </Field>
        <Field label="Password" htmlFor="password" error={errors.password}>
          <input id="password" name="password" type="password" value={form.password} onChange={change} className="input" autoComplete="new-password" />
        </Field>
        <Field label="Confirm password" htmlFor="confirm" error={errors.confirm}>
          <input id="confirm" name="confirm" type="password" value={form.confirm} onChange={change} className="input" autoComplete="new-password" />
        </Field>
        <button type="submit" disabled={busy} className="btn-primary w-full">{busy ? 'Creating account...' : 'Sign up'}</button>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account? <Link to="/login" className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400">Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
