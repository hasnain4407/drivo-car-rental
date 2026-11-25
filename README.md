# PROJECT_NAME - Car Rental Management System

A modern, responsive car rental website where users can browse cars, search and filter them, and send an online booking request. Built as **Task 1 (Project Phase 1)** of the SQROCK IT Solutions Web Development Internship.

- **Live demo:** LIVE_LINK
- **Source code:** GITHUB_LINK

## Screenshots

| Home | Cars | Car details |
| --- | --- | --- |
| ![Home](screenshots/home.png) | ![Cars](screenshots/cars.png) | ![Details](screenshots/details.png) |

| Booking | Admin dashboard | Dark mode |
| --- | --- | --- |
| ![Booking](screenshots/booking.png) | ![Admin](screenshots/admin.png) | ![Dark](screenshots/dark.png) |

## Features

### Required
- **Homepage:** hero section, company introduction, featured cars and call-to-action buttons
- **Car listing:** image, name, price per day, fuel type, seating capacity and availability status
- **Search and filter:** search by name or model; filter by category and price; sort by price
- **Booking form:** name, contact details, rental dates and car selection, with validation and a live price summary
- **Responsive design:** works on mobile, tablet and desktop
- **Navigation bar and footer:** with contact and social links

### Bonus
- Car details page
- Booking history saved in LocalStorage, with cancel option
- Dark mode (remembers your choice)
- Login and signup
- Animations with Framer Motion (page transitions, scroll reveal, hover effects, dashboard counters)
- Admin dashboard: overview with stats and chart, manage cars (add, edit, delete, availability), manage bookings (search, filter, change status), manage users (block, make admin)
- Double booking protection: the same car cannot be booked for overlapping dates

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 18 with Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Data | JSON file and browser LocalStorage |

## How it works
- Cars come from `src/data/cars.json` and are saved in LocalStorage, so admin changes stay after a page refresh.
- State is shared through React Context: `ThemeContext` (dark mode), `AuthContext` (users and login) and `DataContext` (cars and bookings).
- Form checks live in `src/utils/validators.js`.
- If a car photo link fails, a built-in illustration from `public/images/` is shown instead.

> This project has no backend. Login and admin are a UI demo: accounts are stored in the browser's LocalStorage, so they are not real security. Data is local to each browser.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. To create a production build: `npm run build`.

### Admin demo login
- Email: `admin@drivo.com`
- Password: `admin123`

## Folder structure

```
src/
  components/   Navbar, Footer, Hero, CarCard, CarImage, SearchFilter, BookingForm, ...
  pages/        Home, Cars, CarDetails, Booking, BookingHistory, Login, Signup, NotFound
    admin/      Dashboard, ManageCars, ManageBookings, ManageUsers
  context/      ThemeContext, AuthContext, DataContext
  hooks/        useLocalStorage
  utils/        validators
  data/         cars.json
public/
  images/       backup car illustrations
  favicon.svg
```

## Deployment
Deployed on Vercel from the GitHub repository (build command `npm run build`, output folder `dist`). `vercel.json` makes page refresh work with React Router.

## Author
**Muhammad Hasnain Khan** - Computer Science student and Web Development Intern at SQROCK IT Solutions.
