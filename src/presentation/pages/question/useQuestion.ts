import { decode } from 'html-entities'
import { useAppSelector } from 'store'

interface Model {
  title: string
  subtitle: string
  correctAnswer: string
  type: string
  incorrectAnswers?: string[]
}

export const UseQuestion = (): Model | null => {
  const { currentRoundQuestions } = useAppSelector((state) => state.questions)
  if (!currentRoundQuestions.length) return null

  const current = currentRoundQuestions[0]
  const title = decode(current.question)
  const subtitle = decode(current.category)
  const correctAnswer = decode(current.correctAnswer)
  const incorrectAnswers = current.incorrectAnswers?.map((a) => decode(a))

  return {
    title,
    subtitle,
    correctAnswer,
    incorrectAnswers,
    type: current.type
  }
}
