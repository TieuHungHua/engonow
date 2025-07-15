import { useState } from 'react'

export default function ListeningMultipleChoice({
  quizzes,
  startFrom = 1,
}: {
  quizzes: any[]
  startFrom?: number
}) {
  const [selected, setSelected] = useState<{ [id: string]: string }>({})

  const handleChange = (id: string, option: string) => {
    setSelected((prev) => ({ ...prev, [id]: option }))
  }

  return (
    <div className="mb-6 p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-4">Multiple Choice</h3>
      {quizzes.map((q, idx) => (
        <div key={q.id} className="mb-4">
          <p className="font-medium">
            {startFrom + idx}. {q.description}
          </p>
          <div className="ml-4 mt-1 space-y-1">
            {q.options.map((option: string, i: number) => {
              const letter = String.fromCharCode(65 + i) // A, B, C, D

              return (
                <label key={letter} className="block">
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    checked={selected[q.id] === option}
                    onChange={() => handleChange(q.id, option)}
                    className="mr-2"
                  />
                  {letter}. {option}
                </label>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
