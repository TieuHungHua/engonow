import ReadingFilling from './ReadingFilling'
import testData from '@/app/data/result.json' // hoặc import từ props/API tùy bạn
import ReadingMultipleChoice from './ReadingMultipleChoice'

export default function IELTSReadingPage() {
  const readingSections = testData.data.reading
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">IELTS Reading</h1>
      
      {readingSections.map((section: any) => (
        <div key={section.id} className="space-y-4">
          
          {/*  Duyệt fillingQuiz ne` */}
          {section.fillingQuiz?.map((filling: any) =>
            filling.quizzes?.map((quiz: any) => (
              <ReadingFilling
               key={quiz.id} 
               question={filling.question}
               quiz={quiz} 
               startFrom={quiz.startFrom}
              image={section.fillingQuiz?.image}/>
            ))
          )}
          {/* {section.fillingQuiz?.image && (
            <div className="mb-4">
            <img
              src={section.fillingQuiz?.image}
              alt="Related"
              className="max-w-full h-auto rounded shadow"
            />
          </div>
          )} */}
          {/*  Duyệt multipChoice ne`*/}
          {section.multipleChoiceQuiz?.map((quizGroup: any) =>
            
            Array.isArray(quizGroup.quizzes) && (
              <ReadingMultipleChoice
                key={quizGroup.id}
                question={quizGroup.question}
                quizzes={quizGroup.quizzes}
                startFrom={quizGroup.startFrom || 1}
                image ={quizGroup?.image}
              />
            )
          )}
          
          </div>
      ))}
    </div>
  )
}