import { useState, useEffect } from 'react'

const WordCycler = () => {
  const words = ['building', 'creating', 'planning', 'designing', 'executing']
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setFade(true)
      }, 500)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`text-gray-900 font-bold transition-opacity duration-500 ${
        fade ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {words[currentIndex]}
    </span>
  )
}

export default WordCycler


