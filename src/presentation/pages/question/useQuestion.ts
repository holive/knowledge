import { decode } from 'html-entities'
import { useAppSelector } from 'store'

export const UseQuestion = (): {
  title: string
  subtitle: string
  correctAnswer: string
  type: string
  incorrectAnswers?: string[]
} => {
  const { currentRoundQuestions } = useAppSelector((state) => state.questions)

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
