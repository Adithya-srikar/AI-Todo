import { useState } from 'react'

const TodoSidebar = ({ todos, isOpen, onToggle, onTodoToggle, onTodoDelete, onStartNew }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.length

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      onTodoDelete(id)
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  return (
    <>
     
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
        />
      )}

    
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50
                   transition-transform duration-300 ease-out
                   ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

        
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold text-gray-900">
                  {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500 rounded-full"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {completedCount} of {totalCount} completed
              </p>
            </div>
          </div>

     
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-500 mb-2">No tasks yet</p>
                <p className="text-sm text-gray-400">Start by creating your first plan!</p>
              </div>
            ) : (
              todos.map((todo, index) => (
                <div
                  key={todo._id}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300
                           border border-gray-200 animate-slide-up"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => onTodoToggle(todo._id, !todo.completed)}
                      className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 
                               flex items-center justify-center transition-all duration-300
                               ${todo.completed 
                                 ? 'bg-green-500 border-green-500' 
                                 : 'border-gray-300 hover:border-green-500'
                               }`}
                    >
                      {todo.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-gray-900 mb-1 transition-all duration-300
                                   ${todo.completed ? 'line-through opacity-50' : ''}`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`text-sm text-gray-600 mb-2 transition-all duration-300
                                    ${todo.completed ? 'line-through opacity-50' : ''}`}>
                          {todo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        {todo.timeEstimate && (
                          <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-md text-gray-600">
                            ⏱ {todo.timeEstimate}
                          </span>
                        )}
                        {todo.goal && (
                          <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-md text-gray-600 truncate max-w-[200px]">
                            🎯 {todo.goal}
                          </span>
                        )}
                      </div>
                    </div>

                 
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300
                               ${deleteConfirm === todo._id 
                                 ? 'bg-red-500 text-white' 
                                 : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                               }`}
                      title={deleteConfirm === todo._id ? 'Click again to confirm' : 'Delete'}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        
          <div className="border-t border-gray-200 p-6">
            <button
              onClick={onStartNew}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium
                       hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              ✨ Create New Plan
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoSidebar


