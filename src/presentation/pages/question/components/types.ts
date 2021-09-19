export interface QuestionSectionParams {
  type: string
  correctAnswer: string
  incrementQuestionsAnswered: () => void
  incorrectAnswers?: string[]
}

export interface NextButtonParams {
  rightAnswer: boolean
  callback?: () => void
}

export interface AnswersParams {
  correctAnswer: string
  answers: string[]
  NextButton: ({ rightAnswer }: NextButtonParams) => JSX.Element
}
