'use client'
import { useState } from 'react'

export default function ReadingMultipleChoice({
  question,
  quizzes,
  startFrom = 1,
  image,
}: {
  question: any
  quizzes: any[]
  startFrom?: number
  image : any[]
}) {
  const [answers, setAnswers] = useState<{ [id: string]: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const handleSelect = (quizId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [quizId]: option,
    }))
  }
  const handleSubmit = () => {
    setSubmitted(true)
  }

  const getOptionStyle = (quiz: any, option: string) => {
    if (!submitted) return ''
    if (quiz.answer.includes(option)) return 'text-green-600 font-semibold'
    if (answers[quiz.id] === option) return 'text-red-500 line-through'
    return 'text-gray-500'
  }

  return (
    <div className="mb-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Multiple Choice</h2>
      {question.split('\n').map((qt: string, idx: number) => (
        <strong key={idx} className="text-lg font-medium mb-3.5 block">
          {qt}
        </strong>
      ))}
      {image && image.map((img : any, idx)=>(
      <div key={idx} className="mb-4">
        <img
          src={img}
          alt="Related"
          className="max-w-full h-auto rounded shadow"
        />
      </div>
    ))}
      {quizzes.map((quiz, idx) => (
        <div key={quiz.id} className="mb-5">
          <p className="mb-2 font-medium">
            {startFrom + idx}. {quiz.description}
          </p>
          <div className="space-y-1 ml-4">
            {quiz.options.map((option: string, i: number) => {
              const letter = String.fromCharCode(65 + i) // A, B, C, D
              return (
                <label
                  key={option}
                  className={`block cursor-pointer ${getOptionStyle(quiz, option)}`}
                >
                  <input
                    type="radio"
                    name={quiz.id}
                    value={option}
                    disabled={submitted}
                    checked={answers[quiz.id] === option}
                    onChange={() => handleSelect(quiz.id, option)}
                    className="mr-2"
                  />
                  {letter}. {option}
                </label>
              )
            })}
          </div>
        </div>
      ))}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Answers
        </button>
      )}

      {submitted && (
        <div className="mt-4 text-green-600 font-medium">
          You submitted your answers. Correct ones are highlighted.
        </div>
      )}
    </div>
  )
}