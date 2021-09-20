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
      <h1 className="text-5xl text-gray-400 mb-10">
        Here is your score,{' '}
        <span data-testid="username">{name ?? 'player'}</span>:
      </h1>

      <div className="text-lg text-gray-400 mb-10">
        <p>
          Correct: <span data-testid="correct-answers">{correctAnswers}</span>
        </p>
        <p>
          Wrong:{' '}
          <span data-testid="wrong-answers">
            {currentRoundResults.length - correctAnswers}
          </span>
        </p>
        <p>
          Questions Answered:{' '}
          <span data-testid="questions-answered">
            {currentRoundResults.length}
          </span>
        </p>
        <p>
          Final Score: <span data-testid="final-score">{successRate}%</span>
        </p>
        <p>
          Level:{' '}
          <span className="capitalize" data-testid="level">
            {currentRoundDifficulty}
          </span>
        </p>
      </div>
    </>
  )
}
