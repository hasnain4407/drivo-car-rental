const Field = ({ label, error, children, htmlFor }) => (
  <div>
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
      {label}
    </label>
    {children}
    {error && (
      <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
        {error}
      </p>
    )}
  </div>
)

export default Field
