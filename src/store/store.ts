import { configureStore, Dispatch } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { apiSlice } from 'services'

import { questionsSliceReducer, userSliceReducer } from './reducers'

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    questions: questionsSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
})

export const useAppDispatch = (): Dispatch =>
  useDispatch<typeof store.dispatch>()

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
