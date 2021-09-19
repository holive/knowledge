import { decode } from 'html-entities'
import { RESULT_PAGE } from 'main/config/constants'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from 'store'

interface Model {
  questionsAnswered: number
  setQuestionsAnswered: () => void
}

interface QuestionAttr {
  title: string
  subtitle: string
  correctAnswer: string
  type: string
  incorrectAnswers?: string[]
}

export const UseQuestion = (): (Model & QuestionAttr) | null => {
  const { currentRoundQuestions } = useAppSelector((state) => state.questions)
  if (!currentRoundQuestions.length) return null
  const { questionsPerRound } = useAppSelector((state) => state.user.value)
  const [questionsAnswered, _setQuestionsAnswered] = useState(0)
  const history = useHistory()

  const setQuestionsAnswered = (): void => {
    if (questionsAnswered === questionsPerRound - 1) {
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
