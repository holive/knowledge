import { formatDate } from 'presentation/pages/utils'
import React from 'react'
import { ResultHistoryState } from 'store'

interface Params {
  entries: ResultHistoryState[]
  currentRoundDifficulty: string
  difficulties: string[]
}

export const ScoreEntries = ({
  entries,
  currentRoundDifficulty,
  difficulties
}: Params): JSX.Element => {
  const level = currentRoundDifficulty || difficulties[0]
  const newEntries = [...entries]
  newEntries.reverse()

  const filterResults = (item: ResultHistoryState): boolean => {
    if (!currentRoundDifficulty) return true
    return item.level === level
  }

  return (
    <>
      {newEntries.filter(filterResults).map((item, i) => (
        <tr key={i} className={`border-gray-400 ${i && 'border-t'}`}>
          <td data-testid={`history-${i}-name`}>{item.name}</td>
          <td data-testid={`history-${i}-date`}>{formatDate(item.date)}</td>
          {!currentRoundDifficulty && <td>{item.level}</td>}
          <td data-testid={`history-${i}-score`}>{item.score}%</td>
        </tr>
      ))}
    </>
  )
}
