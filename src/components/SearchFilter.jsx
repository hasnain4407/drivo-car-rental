import { Search, RotateCcw } from 'lucide-react'

export const defaultFilters = { search: '', category: 'All', maxPrice: Infinity, availableOnly: false, sort: 'default' }

const SearchFilter = ({ filters, setFilters, categories, maxAvailablePrice }) => {
  const priceCap = Math.min(filters.maxPrice, maxAvailablePrice)
  const set = (key, value) => setFilters((f) => ({ ...f, [key]: value }))

  return (
    <div className="card grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-2">
        <label htmlFor="search" className="mb-1.5 block text-sm font-medium">Search by name or model</label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            id="search"
            type="search"
            value={filters.search}
            onChange={(e) => set('search', e.target.value)}
            placeholder="e.g. Corolla, Civic, Fortuner"
            className="input pl-9"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="mb-1.5 block text-sm font-medium">Category</label>
        <select id="category" value={filters.category} onChange={(e) => set('category', e.target.value)} className="input">
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sort" className="mb-1.5 block text-sm font-medium">Sort by</label>
        <select id="sort" value={filters.sort} onChange={(e) => set('sort', e.target.value)} className="input">
          <option value="default">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      <div className="lg:col-span-2">
        <label htmlFor="price" className="mb-1.5 flex justify-between text-sm font-medium">
          <span>Max price per day</span>
          <span className="text-emerald-700 dark:text-emerald-400">${priceCap}</span>
        </label>
        <input
          id="price"
          type="range"
          min="10"
          max={maxAvailablePrice}
          step="5"
          value={priceCap}
          onChange={(e) => set('maxPrice', Number(e.target.value))}
          className="w-full accent-emerald-700"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium lg:self-end lg:pb-2.5">
        <input
          type="checkbox"
          checked={filters.availableOnly}
          onChange={(e) => set('availableOnly', e.target.checked)}
          className="h-4 w-4 accent-emerald-700"
        />
        Available cars only
      </label>

      <button
        onClick={() => setFilters(defaultFilters)}
        className="btn-outline lg:self-end"
      >
        <RotateCcw size={15} /> Reset filters
      </button>
    </div>
  )
}

export default SearchFilter
