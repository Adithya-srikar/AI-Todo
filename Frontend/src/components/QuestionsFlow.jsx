import { useState } from 'react'

const QuestionsFlow = ({ questions, onComplete, loading }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [currentAnswer, setCurrentAnswer] = useState('')

  const handleNextQuestion = () => {
    if (currentAnswer.trim()) {
      const newAnswers = [...answers, currentAnswer.trim()]
      setAnswers(newAnswers)
      setCurrentAnswer('')

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        onComplete(newAnswers)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleNextQuestion()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 animate-fade-in">
      <div className="w-full max-w-2xl">
    
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="text-sm text-gray-500">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 transition-all duration-500 rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>


        <div className="space-y-4 mb-8">
          {answers.map((answer, index) => (
            <div key={index} className="animate-slide-up">
              <div className="bg-gray-100 px-5 py-3 rounded-2xl inline-block mb-2">
                <p className="text-sm font-medium text-gray-600">{questions[index]}</p>
              </div>
              <div className="bg-gray-900 text-white px-5 py-3 rounded-2xl inline-block ml-auto block text-right">
                <p className="text-sm">{answer}</p>
              </div>
            </div>
          ))}
        </div>


        {currentQuestionIndex < questions.length && (
          <div className="animate-slide-up">
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-lg">
              <p className="text-2xl font-semibold text-gray-900 mb-6">
                {questions[currentQuestionIndex]}
              </p>

              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer..."
                disabled={loading}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                         focus:outline-none focus:border-gray-400 transition-all duration-300
                         resize-none text-lg disabled:opacity-50"
                autoFocus
              />

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(currentQuestionIndex - 1)
                      setCurrentAnswer(answers[answers.length - 1])
                      setAnswers(answers.slice(0, -1))
                    }
                  }}
                  disabled={currentQuestionIndex === 0 || loading}
                  className="px-6 py-2.5 text-gray-600 hover:text-gray-900 font-medium
                           transition-all duration-300 disabled:opacity-0"
                >
                  ← Back
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={!currentAnswer.trim() || loading}
                  className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium
                           hover:bg-gray-800 transition-all duration-300 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:scale-105 active:scale-95"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : currentQuestionIndex < questions.length - 1 ? (
                    'Next →'
                  ) : (
                    'Generate Plan →'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionsFlow


