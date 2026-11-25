import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import AdminTabs from '../../components/AdminTabs'
import Field from '../../components/Field'
import { useData } from '../../context/DataContext'
import { validateCar } from '../../utils/validators'

const empty = { name: '', brand: '', category: 'Sedan', pricePerDay: '', fuel: 'Petrol', seats: '', transmission: 'Automatic', image: '', description: '', features: '', featured: false }

const ManageCars = () => {
  const { cars, addCar, updateCar, deleteCar } = useData()
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const reset = () => { setForm(empty); setEditingId(null); setErrors({}); setServerError('') }

  const startEdit = (c) => {
    setEditingId(c.id)
    setForm({ ...empty, ...c, pricePerDay: String(c.pricePerDay), seats: String(c.seats), features: (c.features || []).join(', ') })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateCar(form)
    setErrors(found)
    if (Object.keys(found).length) return
    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim() || form.name.trim().split(' ')[0],
      category: form.category, fuel: form.fuel, transmission: form.transmission,
      pricePerDay: Number(form.pricePerDay), seats: Number(form.seats),
      image: form.image.trim(), description: form.description.trim(), featured: form.featured,
      features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
    }
    if (editingId) updateCar(editingId, payload)
    else addCar(payload)
    reset()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">Manage cars</h1>
      <AdminTabs />

      <form onSubmit={handleSubmit} noValidate className="card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <h2 className="text-lg font-bold sm:col-span-2 lg:col-span-4">{editingId ? 'Edit car' : 'Add a new car'}</h2>
        {serverError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 sm:col-span-2 lg:col-span-4 dark:bg-red-500/10 dark:text-red-300">{serverError}</p>}
        <Field label="Car name" htmlFor="c-name" error={errors.name}>
          <input id="c-name" name="name" value={form.name} onChange={change} className="input" />
        </Field>
        <Field label="Price per day ($)" htmlFor="c-price" error={errors.pricePerDay}>
          <input id="c-price" name="pricePerDay" type="number" min="1" value={form.pricePerDay} onChange={change} className="input" />
        </Field>
        <Field label="Seats" htmlFor="c-seats" error={errors.seats}>
          <input id="c-seats" name="seats" type="number" min="1" value={form.seats} onChange={change} className="input" />
        </Field>
        <Field label="Category" htmlFor="c-cat">
          <select id="c-cat" name="category" value={form.category} onChange={change} className="input">
            {['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Van'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Fuel" htmlFor="c-fuel">
          <select id="c-fuel" name="fuel" value={form.fuel} onChange={change} className="input">
            {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Transmission" htmlFor="c-trans">
          <select id="c-trans" name="transmission" value={form.transmission} onChange={change} className="input">
            <option>Automatic</option>
            <option>Manual</option>
          </select>
        </Field>
        <Field label="Image path or URL" htmlFor="c-img">
          <input id="c-img" name="image" value={form.image} onChange={change} placeholder="/images/car.jpg or https://..." className="input" />
        </Field>
        <Field label="Features (comma separated)" htmlFor="c-feat">
          <input id="c-feat" name="features" value={form.features} onChange={change} placeholder="Sunroof, Bluetooth" className="input" />
        </Field>
        <div className="sm:col-span-2 lg:col-span-4">
          <Field label="Description" htmlFor="c-desc">
            <textarea id="c-desc" name="description" rows="2" value={form.description} onChange={change} className="input" />
          </Field>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="featured" checked={form.featured} onChange={change} className="h-4 w-4 accent-emerald-700" />
          Show on homepage
        </label>
        <div className="flex gap-2 sm:col-span-2 lg:col-span-3 lg:justify-end">
          {editingId && <button type="button" onClick={reset} className="btn-outline">Cancel edit</button>}
          <button type="submit" className="btn-primary">{editingId ? 'Save changes' : 'Add car'}</button>
        </div>
      </form>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Price/day</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {cars.map((c) => (
              <tr key={c.id}>
                <td className="p-3 font-semibold">{c.name}</td>
                <td className="p-3">{c.category}</td>
                <td className="p-3">${c.pricePerDay}</td>
                <td className="p-3">
                  <button onClick={() => updateCar(c.id, { available: !c.available })} className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${c.available ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'}`}>
                    {c.available ? 'Available' : 'Unavailable'}
                  </button>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => startEdit(c)} aria-label={`Edit ${c.name}`} className="cursor-pointer rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"><Pencil size={16} /></button>
                  <button onClick={() => window.confirm(`Delete ${c.name} from the fleet?`) && deleteCar(c.id)} aria-label={`Delete ${c.name}`} className="cursor-pointer rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCars
