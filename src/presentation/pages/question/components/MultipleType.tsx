import React, { useState } from 'react'

import { isTheRightAnswer } from './helpers'
import { AnswersParams } from './types'

export const MultipleType = (Props: AnswersParams): JSX.Element => {
  const [selected, setSelected] = useState('')

  const resetSelection = (): void => setSelected('')
  const handleClick = (e: React.MouseEvent): void =>
    setSelected((e.target as HTMLInputElement).value)

  return (
    <>
      {Props.answers.map((item, i) => (
        <div key={i}>
          <label
            htmlFor={`choice-${+i}`}
            className="text-gray-400 mb-5 cursor-pointer"
          >
            <span className="mr-3">{item}</span>

            <input
              type="checkbox"
              id={`choice-${+i}`}
              name={`choice-${+i}`}
              value={item}
              checked={selected === item}
              onClick={handleClick}
              onChange={() => null}
              className="form-checkbox bg-gray-700 cursor-pointer text-gray-400"
            />
          </label>
        </div>
      ))}

      {selected !== '' && (
        <Props.NextButton
          rightAnswer={isTheRightAnswer(selected, Props.correctAnswer)}
          callback={resetSelection}
        />
      )}
    </>
  )
}
