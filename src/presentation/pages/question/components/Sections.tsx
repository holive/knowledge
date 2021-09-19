import React from 'react'
import { shuffle } from 'utils'

import { MultipleType } from './MultipleType'
import { TextType } from './TextType'
import { AnswersParams, NextButtonParams, QuestionSectionParams } from './types'

export const Sections = (props: QuestionSectionParams): JSX.Element => {
  const Next = ({ rightAnswer }: NextButtonParams): JSX.Element => {
    console.log(rightAnswer) // todo: remove item from array and display the next question
    return <button>Next</button>
  }

  const args: AnswersParams = {
    NextButton: Next,
    correctAnswer: props.correctAnswer,
    answers: shuffle([props.correctAnswer, ...(props.incorrectAnswers ?? [])])
  }

  if (props.type === 'text') return <TextType {...args} />
  return <MultipleType {...args} />
}
