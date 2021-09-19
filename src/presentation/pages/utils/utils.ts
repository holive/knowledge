export const getCorrectAnswers = (values: boolean[]): number => {
  return values.filter((a) => a).length
}

export const getScore = (
  correct: number,
  currentRoundResults: boolean[]
): string => {
  return ((correct / currentRoundResults.length || 0) * 100).toFixed() ?? ''
}

export const formatDate = (date: string): string => {
  const newDate = new Date(date)
  let hours = newDate.getHours()
  const minutes = newDate.getMinutes()
  const seconds = newDate.getSeconds()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours || 12

  const newMinutes = minutes < 10 ? `0${minutes}` : minutes
  const newSeconds = seconds < 10 ? `0${seconds}` : seconds
  return `${hours}:${newMinutes}:${newSeconds} ${ampm.toUpperCase()}`
}
