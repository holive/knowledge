import { useEffect, useState } from 'react'
import { ResultHistoryState } from 'store'

interface Params {
  resultsHistory: ResultHistoryState[]
}

interface Model {
  sortByScore: () => void
  sortByLevel: () => void
  sortByName: () => void
  sortByTime: () => void
  localResultHistory: ResultHistoryState[]
}

export const UseHistory = ({ resultsHistory }: Params): Model => {
  const [sortAsc, setSortAsc] = useState(false)
  const [localResultHistory, setLocalResultHistory] = useState<
    ResultHistoryState[]
  >([])

  useEffect(() => {
    setLocalResultHistory(resultsHistory)
  }, [resultsHistory])

  const sortHistory = (key: string): void => {
    const newList = [...localResultHistory]
    newList.sort((a, b) =>
      a[key as keyof typeof a].localeCompare(b[key as keyof typeof b])
    )

    if (sortAsc) newList.reverse()
    setLocalResultHistory(newList)
    setSortAsc(!sortAsc)
  }

  const sortByScore = (): void => sortHistory('score')
  const sortByLevel = (): void => sortHistory('level')
  const sortByName = (): void => sortHistory('name')
  const sortByTime = (): void => sortHistory('date')

  return {
    sortByLevel,
    sortByName,
    sortByScore,
    sortByTime,
    localResultHistory
  }
}
