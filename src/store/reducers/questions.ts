import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuestionModel } from 'domain/models'
import { shuffle } from 'utils'

import {
  CurrentRoundQuestionAction,
  initialState,
  ResultHistoryState
} from './types'

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
      state.difficulties = Object.keys(options).map((item) => item)
    },
    saveCurrentRoundQuestionsAction(
      state,
      action: PayloadAction<CurrentRoundQuestionAction>
    ) {
      let result = state.questions.filter(
        (item) => item.difficulty === action.payload.level
      )
      if (action.payload.shouldShuffle) result = shuffle(result)

      state.currentRoundQuestions = result.map((item) => ({
        ...item,
        correctAnswer: item.correct_answer,
        incorrectAnswers: item.incorrect_answers
      }))
    },
    saveCurrentRoundResultsAction(state, action: PayloadAction<boolean>) {
      state.currentRoundResults.push(action.payload)
      state.currentRoundQuestions.shift()
    },
    resetCurrentRoundResultsAction(state) {
      state.currentRoundResults = []
    },
    saveResultsHistoryAction(state, action: PayloadAction<ResultHistoryState>) {
      state.resultsHistory.push(action.payload)

      if (state.resultsHistory.length) {
        localStorage.setItem(
          'resultsHistory',
          JSON.stringify(state.resultsHistory)
        )
      }
    },
    loadHistoryFromStorageAction(
      state,
      action: PayloadAction<ResultHistoryState[]>
    ) {
      state.resultsHistory = action.payload
    }
  }
})

export const questionsSliceReducer = questionsSlice.reducer
export const {
  saveQuestionsAction,
  saveDifficultiesAction,
  saveCurrentRoundQuestionsAction,
  saveCurrentRoundResultsAction,
  resetCurrentRoundResultsAction,
  saveResultsHistoryAction,
  loadHistoryFromStorageAction
} = questionsSlice.actions
