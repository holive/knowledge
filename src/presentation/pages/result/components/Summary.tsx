import { Loading } from 'presentation/pages/components'
import React from 'react'

interface Params {
  currentRoundDifficulty: string
  currentRoundResults: boolean[]
  successRate?: string
  correctAnswers?: number
  name?: string
}

export const Summary = ({
  currentRoundDifficulty,
  currentRoundResults,
  successRate,
  correctAnswers,
  name
}: Params): JSX.Element | null => {
  if (successRate === undefined || correctAnswers === undefined)
    return <Loading />

  if (!currentRoundDifficulty && !currentRoundResults.length) return null

  return (
    <>
      <h1>Here is your score, {name ?? 'player'}:</h1>

      <p>Correct: {correctAnswers}</p>
      <p>Wrong: {currentRoundResults.length - correctAnswers}</p>
      <p>Questions Answered: {currentRoundResults.length}</p>
      <p>Final Score: {successRate}%</p>
      <p>
        Level:{' '}
        <span style={{ textTransform: 'capitalize' }}>
          {currentRoundDifficulty}
        </span>
      </p>
    </>
  )
}
