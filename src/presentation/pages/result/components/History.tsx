import React from 'react'
import { ResultHistoryState } from 'store'

import { ScoreEntries } from './ScoreEntries'

interface Params {
  currentRoundDifficulty: string
  difficulties: string[]
  resultsHistory: ResultHistoryState[]
}

export const History = ({
  currentRoundDifficulty,
  difficulties,
  resultsHistory
}: Params): JSX.Element => {
  return (
    <>
      <h2>Game history</h2>

      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Time</th>
            {!currentRoundDifficulty && <th>Level</th>}
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          <ScoreEntries
            currentRoundDifficulty={currentRoundDifficulty}
            entries={resultsHistory}
            difficulties={difficulties}
          />
        </tbody>
      </table>
    </>
  )
}
