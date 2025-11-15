import WordCycler from './WordCycler'
import SearchBar from './SearchBar'

const Landing = ({ onGoalSubmit, loading }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
          What are you{' '}
          <WordCycler />
          {' '}today?
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Tell me your goal, and I'll help you create a smart, actionable plan to get it done.
        </p>
      </div>

      <SearchBar onSubmit={onGoalSubmit} loading={loading} />

      <div className="mt-16 flex flex-wrap gap-3 justify-center max-w-3xl">
        {[
          '🚀 Launch a startup',
          '📚 Learn web development',
          '🎨 Design a portfolio',
          '💼 Plan a project',
          '🏃 Start a fitness routine',
          '🎯 Master a new skill'
        ].map((example, index) => (
          <button
            key={index}
            onClick={() => !loading && onGoalSubmit(example.split(' ').slice(1).join(' '))}
            disabled={loading}
            className="px-5 py-2.5 bg-white border border-gray-200 rounded-full 
                     text-sm text-gray-700 hover:border-gray-400 hover:shadow-md
                     transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {example}
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 text-center text-sm text-gray-400">
        <p>Powered by AI • Built with care</p>
      </div>
    </div>
  )
}

export default Landing


