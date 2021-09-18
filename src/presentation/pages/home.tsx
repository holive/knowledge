import * as React from 'react'
import { useAppDispatch, useAppSelector } from 'store'
import { saveQuestionsAction } from 'store/reducers'

export const Home: React.FC = () => {
  const { questions } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Title </h1>

      <p>questions state length: {questions.questions.length}</p>

      <button
        onClick={() =>
          dispatch(
            saveQuestionsAction([
              {
                category: '',
                question: '',
                correct_answer: '',
                difficulty: '',
                incorrect_answers: [],
                type: ''
              }
            ])
          )
        }
      >
        increment questions state
      </button>
    </div>
  )
}
