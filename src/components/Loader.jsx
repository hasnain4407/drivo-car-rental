const Loader = ({ text = 'Loading...' }) => (
  <div className="grid place-items-center py-24 text-sm text-zinc-500" role="status">
    <span className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-emerald-700 border-t-transparent" />
    {text}
  </div>
)

export default Loader
