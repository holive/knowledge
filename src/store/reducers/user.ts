import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  currentRoundDifficulty: string
  questionsPerRound: number
}

const initialState: { value: UserState } = {
  value: {
    name: 'user',
    currentRoundDifficulty: '',
    questionsPerRound: 4
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUsernameAction(state, action: PayloadAction<string>) {
      state.value.name = action.payload
    },
    saveDifficultyAction(state, action: PayloadAction<string>) {
      state.value.name = action.payload
    },
    saveQuestionsPerRoundAction(state, action: PayloadAction<number>) {
      state.value.questionsPerRound = action.payload
    },
    saveUserInfoAction(state, action: PayloadAction<UserState>) {
      state.value = action.payload
    }
  }
})

export const userSliceReducer = userSlice.reducer
export const {
  saveUsernameAction,
  saveDifficultyAction,
  saveQuestionsPerRoundAction,
  saveUserInfoAction
} = userSlice.actions
