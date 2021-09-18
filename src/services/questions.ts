import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { QuestionModel } from 'domain/models'

interface Model {
  results: QuestionModel[]
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api'
  }),
  endpoints: (builder) => ({
    fetchQuestions: builder.query<Model, null>({
      query: () => `/questions`
    })
  })
})

export const { useFetchQuestionsQuery } = apiSlice
