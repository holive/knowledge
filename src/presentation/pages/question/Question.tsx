import { START_PAGE } from 'main/config/constants'
import { Loading } from 'presentation/pages/components'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from 'store'

import { Sections } from './components'
import { UseQuestion } from './useQuestion'

export const Question = (): JSX.Element => {
  const history = useHistory()
  const { name } = useAppSelector((state) => state.user.value)

  if (!name) history.replace(START_PAGE)

  const question = UseQuestion()
  if (question === null) return <Loading />

  return (
    <div className="min-h-screen bg-gray-800 font-mono">
      <div className="container mx-auto py-16 flex flex-col text-center">
        <h2 className="text-3xl text-gray-400 mb-4">{question.title}</h2>

        <p className="text-gray-400 mb-5 mb-4">[{question.subtitle}]</p>

        <Sections
          type={question.type}
          correctAnswer={question.correctAnswer}
          incorrectAnswers={question.incorrectAnswers}
          incrementQuestionsAnswered={question.setQuestionsAnswered}
        />
      </div>
    </div>
  )
}
