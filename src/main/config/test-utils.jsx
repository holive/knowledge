import '@testing-library/jest-dom/extend-expect'

import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { questionsSliceReducer, userSliceReducer } from '../../store'

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { user: userSliceReducer, questions: questionsSliceReducer },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
