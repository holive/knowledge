import { QuestionModel, QuestionStateModel } from 'domain/models'

export interface ResultHistoryState {
  name: string
  score: string
  date: string
  level: string
}

export interface QuestionsState {
  questions: QuestionModel[]
  currentRoundQuestions: QuestionStateModel[]
  difficulties: string[]
  currentRoundResults: boolean[]
  resultsHistory: ResultHistoryState[]
}

export interface CurrentRoundQuestionAction {
  level: string
  shouldShuffle?: boolean
}

export const initialState: QuestionsState = {
  questions: [],
  difficulties: [],
  currentRoundQuestions: [],
  currentRoundResults: [],
  resultsHistory: []
}
