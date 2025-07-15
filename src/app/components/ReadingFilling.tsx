'use client'
import { useState } from 'react'

export default function ReadingFilling({ question, quiz, startFrom, image  }: { question : any ;quiz: any; startFrom: number ; image : any }) {
  const [answers, setAnswers] = useState<string[]>(Array(quiz.answer.length).fill(''))

  const handleChange = (index: number, value: string) => {
    const updated = [...answers]
    updated[index] = value
    setAnswers(updated)
  }

  const renderWithInputs = () => {
    const lines = quiz.description.split('\n')
    let inputIndex = 0 // ✅ tổng số input toàn văn bản

    return (
      <div className="text-lg leading-7 space-y-2">
        {lines.map((line: string, idx: number) => {
          const parts = line.split(/<<INPUT>>/g)

          return (
            <p key={idx}>
              {parts.map((part: string, i: number) => {
                const shouldRenderInput = i < parts.length - 1

                const currentIndex = inputIndex

                if (shouldRenderInput) inputIndex++

                return (
                  <span key={i}>
                    {part}
                    {shouldRenderInput && (
                      <>
                        <input
                          className="border-b border-gray-400 mx-1 w-26 text-center text-amber-700 focus:outline-none focus:ring"
                          type="text"
                          value={answers[currentIndex]}
                          onChange={(e) => handleChange(currentIndex, e.target.value)}
                        />
                      </>
                    )}
                  </span>
                )
              })}
            </p>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mb-6 p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-2">Fill in the Blanks</h3>
      {question.split('\n').map((qt: string, idx: number) => (
        <strong key={idx} className="text-lg font-medium mb-3.5 block">
          {qt}
        </strong>
      ))}
      {image && (
      <div className="mb-4">
        <img
          src={image}
          alt="Related"
          className="max-w-full h-auto rounded shadow"
        />
      </div>
    )}
      {renderWithInputs()}
    </div>
  )
}
