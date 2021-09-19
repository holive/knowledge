import React, { useState } from 'react'

import { isTheRightAnswer } from './helpers'
import { AnswersParams } from './types'

export const MultipleType = (Props: AnswersParams): JSX.Element => {
  const [selected, setSelected] = useState<string>()

  const handleClick = (e: React.MouseEvent): void =>
    setSelected((e.target as HTMLInputElement).value)

  return (
    <>
      {Props.answers.map((item, i) => (
        <div key={i}>
          <label htmlFor={`choice-${+i}`}>{item}</label>
          <input
            type="checkbox"
            id={`choice-${+i}`}
            name={`choice-${+i}`}
            value={item}
            checked={selected === item}
            onClick={handleClick}
            onChange={() => null}
          />
        </div>
      ))}

      {selected !== undefined && (
        <Props.NextButton
          rightAnswer={isTheRightAnswer(selected, Props.correctAnswer)}
        />
      )}
    </>
  )
}
