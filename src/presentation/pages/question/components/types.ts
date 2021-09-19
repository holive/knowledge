export interface QuestionSectionParams {
  type: string
  correctAnswer: string
  incorrectAnswers?: string[]
}

export interface NextButtonParams {
  rightAnswer: boolean
}

export interface AnswersParams {
  correctAnswer: string
  answers: string[]
  NextButton: ({ rightAnswer }: NextButtonParams) => JSX.Element
}
