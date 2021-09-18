import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuestionModel } from 'domain/models'

interface QuestionsState {
  questions: QuestionModel[]
  currentRoundQuestions: QuestionModel[]
  difficulty: string[]
}

const initialState: QuestionsState = {
  questions: [],
  difficulty: [],
  currentRoundQuestions: []
}

const shuffle = (data: QuestionModel[]): QuestionModel[] => {
  return data
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
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
      state.currentRoundQuestions = shuffle(
        state.questions.filter((item) => item.difficulty === action.payload)
      )
    }
  }
})

export const questionsSliceReducer = questionsSlice.reducer
export const {
  saveQuestionsAction,
  saveDifficultiesAction,
  saveCurrentRoundQuestionsAction
} = questionsSlice.actions
