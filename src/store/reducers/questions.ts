import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuestionModel } from 'domain/models'

interface QuestionsState {
  questions: QuestionModel[]
  difficulty: string[]
}

const initialState: QuestionsState = {
  questions: [],
  difficulty: []
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
    }
  }
})

export const questionsSliceReducer = questionsSlice.reducer
export const { saveQuestionsAction, saveDifficultiesAction } =
  questionsSlice.actions
