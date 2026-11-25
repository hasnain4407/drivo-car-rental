import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

const CountUp = ({ value, prefix = '' }) => {
  const [n, setN] = useState(0)
  useEffect(() => {
    const controls = animate(0, Number(value) || 0, { duration: 1, onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [value])
  return <>{prefix}{n}</>
}

export default CountUp
