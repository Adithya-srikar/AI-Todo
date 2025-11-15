import { useState } from 'react'

const TodoSelector = ({ plan, goal, onTasksSelected }) => {
  const [selectedTasks, setSelectedTasks] = useState([])

  const toggleTask = (index) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(selectedTasks.filter(i => i !== index))
    } else {
      setSelectedTasks([...selectedTasks, index])
    }
  }

  const selectAll = () => {
    if (selectedTasks.length === plan.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(plan.map((_, index) => index))
    }
  }

  const handleContinue = () => {
    const tasks = selectedTasks.map(index => plan[index])
    onTasksSelected(tasks)
  }

  return (
    <div className="min-h-screen py-16 px-6 animate-fade-in">
      <div className="max-w-5xl mx-auto">
      
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your Custom Plan
          </h1>
          <p className="text-xl text-gray-500 mb-2">
            {goal}
          </p>
          <p className="text-sm text-gray-400">
            Select the tasks you want to add to your todo list
          </p>
        </div>

      
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={selectAll}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 
                     rounded-xl font-medium transition-all duration-300 hover:scale-105"
          >
            {selectedTasks.length === plan.length ? '✓ Deselect All' : 'Select All'}
          </button>
          <span className="text-sm text-gray-500">
            {selectedTasks.length} of {plan.length} selected
          </span>
        </div>


        <div className="grid gap-4 mb-8">
          {plan.map((task, index) => {
            const isSelected = selectedTasks.includes(index)
            
            return (
              <div
                key={index}
                onClick={() => toggleTask(index)}
                className={`bg-white border-2 rounded-2xl p-6 cursor-pointer
                         transition-all duration-300 hover:shadow-lg animate-slide-up
                         ${isSelected 
                           ? 'border-gray-900 shadow-md' 
                           : 'border-gray-200 hover:border-gray-400'
                         }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                 
                  <div className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 
                                flex items-center justify-center transition-all duration-300
                                ${isSelected 
                                  ? 'bg-gray-900 border-gray-900' 
                                  : 'border-gray-300 hover:border-gray-500'
                                }`}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                 
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">
                        {task.title}
                      </h3>
                      {task.timeEstimate && (
                        <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full flex-shrink-0">
                          ⏱ {task.timeEstimate}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={selectedTasks.length === 0}
            className="px-12 py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg
                     hover:bg-gray-800 transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:scale-105 active:scale-95 shadow-lg"
          >
            Add {selectedTasks.length} {selectedTasks.length === 1 ? 'Task' : 'Tasks'} to My List →
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoSelector


