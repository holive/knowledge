import { START_PAGE } from 'config/constants'
import { Loading } from 'presentation/pages'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from 'store'

import { Sections } from './components'
import { UseQuestion } from './useQuestion'

export const Question: React.FC = () => {
  const history = useHistory()
  const { currentRoundQuestions } = useAppSelector((state) => state.questions)
  const { name } = useAppSelector((state) => state.user.value)
  const question = UseQuestion()

  if (!name) {
    history.replace(START_PAGE)
    return <Loading />
  }

  if (!currentRoundQuestions.length) return <Loading />

  return (
    <div>
      <h1>{question.title}</h1>
      <small>{question.subtitle}</small>
      <br />
      <br />

      <Sections
        correctAnswer={question.correctAnswer}
        incorrectAnswers={question.incorrectAnswers}
        type={question.type}
      />
    </div>
  )
}
