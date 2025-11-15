import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import QuestionsFlow from './components/QuestionsFlow'
import TodoSelector from './components/TodoSelector'
import TodoSidebar from './components/TodoSidebar'
import axios from 'axios'

function App() {
  const [currentView, setCurrentView] = useState('landing') 
  const [userGoal, setUserGoal] = useState('')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [generatedPlan, setGeneratedPlan] = useState([])
  const [savedTodos, setSavedTodos] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)

 
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos')
      setSavedTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const handleGoalSubmit = async (goal) => {
    setUserGoal(goal)
    setLoading(true)
    
    try {
      const response = await axios.post('/api/ai/questions', { goal })
      setQuestions(response.data.questions)
      setCurrentView('questions')
    } catch (error) {
      console.error('Error fetching questions:', error)
      alert('Failed to generate questions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswersComplete = async (userAnswers) => {
    setAnswers(userAnswers)
    setLoading(true)
    
    try {
      const response = await axios.post('/api/ai/generate-plan', {
        goal: userGoal,
        answers: userAnswers
      })
      setGeneratedPlan(response.data.plan)
      setCurrentView('selector')
    } catch (error) {
      console.error('Error generating plan:', error)
      alert('Failed to generate plan. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleTasksSelected = async (selectedTasks) => {
    try {
      const todosToSave = selectedTasks.map((task, index) => ({
        title: task.title,
        description: task.description,
        timeEstimate: task.timeEstimate,
        goal: userGoal,
        order: index
      }))

      const response = await axios.post('/api/todos/batch', { todos: todosToSave })
      setSavedTodos([...savedTodos, ...response.data])
      setSidebarOpen(true)
      
      setTimeout(() => {
        setCurrentView('landing')
        setUserGoal('')
        setQuestions([])
        setAnswers([])
        setGeneratedPlan([])
      }, 500)
    } catch (error) {
      console.error('Error saving todos:', error)
      alert('Failed to save tasks. Please try again.')
    }
  }

  const handleTodoToggle = async (id, completed) => {
    try {
      await axios.put(`/api/todos/${id}`, { completed })
      setSavedTodos(savedTodos.map(todo => 
        todo._id === id ? { ...todo, completed } : todo
      ))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleTodoDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`)
      setSavedTodos(savedTodos.filter(todo => todo._id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleStartNew = () => {
    setCurrentView('landing')
    setUserGoal('')
    setQuestions([])
    setAnswers([])
    setGeneratedPlan([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      {currentView === 'landing' && (
        <Landing onGoalSubmit={handleGoalSubmit} loading={loading} />
      )}

      {currentView === 'questions' && (
        <QuestionsFlow
          questions={questions}
          onComplete={handleAnswersComplete}
          loading={loading}
        />
      )}

      {currentView === 'selector' && (
        <TodoSelector
          plan={generatedPlan}
          goal={userGoal}
          onTasksSelected={handleTasksSelected}
        />
      )}

      <TodoSidebar
        todos={savedTodos}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onTodoToggle={handleTodoToggle}
        onTodoDelete={handleTodoDelete}
        onStartNew={handleStartNew}
      />

      {/* Floating sidebar toggle button */}
      {!sidebarOpen && savedTodos.length > 0 && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed right-6 bottom-6 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-110 z-40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {savedTodos.filter(t => !t.completed).length}
          </span>
        </button>
      )}
    </div>
  )
}

export default App


