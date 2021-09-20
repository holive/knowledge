import React from 'react'
import { ResultHistoryState } from 'store'

import { ScoreEntries } from '../ScoreEntries'
import { UseHistory } from './useHistory'

interface Params {
  currentRoundDifficulty: string
  difficulties: string[]
  resultsHistory: ResultHistoryState[]
}

export const History = ({
  currentRoundDifficulty,
  difficulties,
  resultsHistory
}: Params): JSX.Element | null => {
  const {
    sortByName,
    sortByLevel,
    sortByScore,
    localResultHistory,
    sortByTime
  } = UseHistory({ resultsHistory })

  return (
    <>
      <h2 className="text-3xl text-gray-400 mb-4">Game History</h2>

      <table className="text-gray-400 border-gray-400 border mb-8">
        <thead className="border-gray-400 border-b">
          <tr>
            <th className="th" onClick={sortByName}>
              Player
            </th>
            <th className="th" onClick={sortByTime}>
              Time
            </th>
            {!currentRoundDifficulty && (
              <th className="th" onClick={sortByLevel}>
                Level
              </th>
            )}
            <th className="th" onClick={sortByScore}>
              Score
            </th>
          </tr>
        </thead>

        <tbody data-testid="table-body">
          <ScoreEntries
            currentRoundDifficulty={currentRoundDifficulty}
            entries={localResultHistory}
            difficulties={difficulties}
          />
        </tbody>
      </table>
    </>
  )
}
