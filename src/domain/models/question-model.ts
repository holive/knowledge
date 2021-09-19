export interface QuestionModel {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers?: string[]
}

export interface QuestionStateModel {
  category: string
  type: string
  difficulty: string
  question: string
  correctAnswer: string
  incorrectAnswers?: string[]
}
