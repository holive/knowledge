export interface QuestionSectionParams {
  type: string
  correctAnswer: string
  incrementQuestionsAnswered: (isAnswerRight: boolean) => void
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
