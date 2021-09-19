import { START_PAGE } from 'main/config/constants'
import { Loading } from 'presentation/pages/components'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from 'store'

import { Sections } from './components'
import { UseQuestion } from './useQuestion'

export const Question: React.FC = () => {
  const history = useHistory()
  const { name } = useAppSelector((state) => state.user.value)

  if (!name) history.replace(START_PAGE)

  const question = UseQuestion()
  if (question === null) return <Loading />

  return (
    <div>
      <h1>{question.title}</h1>
      <small>{question.subtitle}</small>
      <br />
      <br />

      <Sections
        type={question.type}
        correctAnswer={question.correctAnswer}
        incorrectAnswers={question.incorrectAnswers}
        incrementQuestionsAnswered={question.setQuestionsAnswered}
      />
    </div>
  )
}
