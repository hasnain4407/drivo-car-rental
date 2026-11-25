const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^\+?[\d\s-]{10,15}$/

export const today = () => new Date().toISOString().split('T')[0]

export const calcDays = (start, end) => {
  if (!start || !end) return 0
  const diff = (new Date(end) - new Date(start)) / 86400000
  return diff > 0 ? Math.round(diff) : 0
}

export const validateBooking = (f) => {
  const e = {}
  if (f.name.trim().length < 3) e.name = 'Enter your full name (at least 3 characters).'
  if (!emailRe.test(f.email)) e.email = 'Enter a valid email address.'
  if (!phoneRe.test(f.phone)) e.phone = 'Enter a valid phone number (10 to 15 digits).'
  if (!f.carId) e.carId = 'Choose a car.'
  if (!f.startDate) e.startDate = 'Select a pickup date.'
  else if (f.startDate < today()) e.startDate = 'Pickup date cannot be in the past.'
  if (!f.endDate) e.endDate = 'Select a return date.'
  else if (f.startDate && f.endDate <= f.startDate) e.endDate = 'Return date must be after the pickup date.'
  return e
}

export const validateLogin = (f) => {
  const e = {}
  if (!emailRe.test(f.email)) e.email = 'Enter a valid email address.'
  if (!f.password) e.password = 'Enter your password.'
  return e
}

export const validateSignup = (f) => {
  const e = validateLogin(f)
  if (f.name.trim().length < 3) e.name = 'Enter your full name (at least 3 characters).'
  if (f.password && f.password.length < 6) e.password = 'Password must be at least 6 characters.'
  if (f.confirm !== f.password) e.confirm = 'Passwords do not match.'
  return e
}

export const validateCar = (f) => {
  const e = {}
  if (f.name.trim().length < 3) e.name = 'Enter the car name.'
  if (!(Number(f.pricePerDay) > 0)) e.pricePerDay = 'Enter a price greater than 0.'
  if (!(Number(f.seats) > 0)) e.seats = 'Enter the number of seats.'
  return e
}
