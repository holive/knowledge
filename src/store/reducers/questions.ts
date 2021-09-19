import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuestionModel, QuestionStateModel } from 'domain/models'
import { shuffle } from 'utils'

interface QuestionsState {
  questions: QuestionModel[]
  currentRoundQuestions: QuestionStateModel[]
  difficulty: string[]
}

const initialState: QuestionsState = {
  questions: [],
  difficulty: [],
  currentRoundQuestions: []
}

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    saveQuestionsAction(state, action: PayloadAction<QuestionModel[]>) {
      state.questions = action.payload
    },
    saveDifficultiesAction(state, action: PayloadAction<QuestionModel[]>) {
      const options: Record<string, null> = {}
      action.payload.map((question) => (options[question.difficulty] = null))
      state.difficulty = Object.keys(options).map((item) => item)
    },
    saveCurrentRoundQuestionsAction(state, action: PayloadAction<string>) {
      const result = shuffle(
        state.questions.filter((item) => item.difficulty === action.payload)
      )

      state.currentRoundQuestions = result.map((item) => ({
        ...item,
        correctAnswer: item.correct_answer,
        incorrectAnswers: item.incorrect_answers
      }))
    }
  }
})

export const questionsSliceReducer = questionsSlice.reducer
export const {
  saveQuestionsAction,
  saveDifficultiesAction,
  saveCurrentRoundQuestionsAction
} = questionsSlice.actions
