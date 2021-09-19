import { decode } from 'html-entities'
import { RESULT_PAGE } from 'main/config/constants'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { saveResultsHistoryAction, useAppDispatch, useAppSelector } from 'store'

import { getCorrectAnswers, getScore } from '../utils'

interface Model {
  questionsAnswered: number
  setQuestionsAnswered: (isAnswerRight: boolean) => void
}

interface QuestionAttr {
  title: string
  subtitle: string
  correctAnswer: string
  type: string
  incorrectAnswers?: string[]
}

export const UseQuestion = (): (Model & QuestionAttr) | null => {
  const { currentRoundQuestions, currentRoundResults } = useAppSelector(
    (state) => state.questions
  )
  if (!currentRoundQuestions.length) return null
  const { questionsPerRound, name } = useAppSelector(
    (state) => state.user.value
  )
  const [questionsAnswered, _setQuestionsAnswered] = useState(0)
  const history = useHistory()
  const dispatch = useAppDispatch()

  const savePlayerResult = (isAnswerRight: boolean): void => {
    const finalRoundResult = [...currentRoundResults, isAnswerRight]
    dispatch(
      saveResultsHistoryAction({
        name,
        date: new Date().toString(),
        score: getScore(getCorrectAnswers(finalRoundResult), finalRoundResult)
      })
    )
  }

  const setQuestionsAnswered = (isAnswerRight: boolean): void => {
    if (questionsAnswered === questionsPerRound - 1) {
      savePlayerResult(isAnswerRight)
      return history.replace(RESULT_PAGE)
    }
    _setQuestionsAnswered((v) => v + 1)
  }

  const getQuestionAttributes = (): QuestionAttr => {
    const current = currentRoundQuestions[0]
    return {
      type: current.type,
      title: decode(current.question),
      subtitle: decode(current.category),
      correctAnswer: decode(current.correctAnswer),
      incorrectAnswers: current.incorrectAnswers?.map((a) => decode(a))
    }
  }

  return {
    ...getQuestionAttributes(),
    setQuestionsAnswered,
    questionsAnswered
  }
}
