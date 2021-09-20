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
      <h2 className="text-3xl text-gray-400 mb-4">Game History</h2>

      <table className="text-gray-400 border-gray-400 border mb-8">
        <thead className="border-gray-400 border-b">
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
