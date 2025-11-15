import { useState } from 'react'

const SearchBar = ({ onSubmit, loading }) => {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() && !loading) {
      onSubmit(value.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start an ecommerce app, Learn Python, Build a website..."
          disabled={loading}
          className="w-full px-8 py-5 text-lg bg-white border-2 border-gray-200 rounded-2xl 
                   focus:outline-none focus:border-gray-400 transition-all duration-300
                   shadow-sm hover:shadow-md focus:shadow-lg
                   placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!value.trim() || loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white 
                   px-6 py-2.5 rounded-xl font-medium
                   hover:bg-gray-800 transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:scale-105 active:scale-95"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Loading...</span>
            </div>
          ) : (
            'Start'
          )}
        </button>
      </div>
    </form>
  )
}

export default SearchBar


