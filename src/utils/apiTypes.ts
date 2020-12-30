import { Polarity, UnitType } from './enums';

export type GetQuestionsBody = {
  unitId: number,
  questionType: string,
  questionCounts: number
};

export type GetQuestionsResponse = {
  questions: [Question]
};

/**
 * Type of the Question
 * @param {string} question - Question Text
 * @param {string[]} choices - Choices of the Question, expected 3 incorrect choice and 1 correct choice
 * @param {number} correctChoiceIndex - Correct Choice Index for this question
 */
export type Question = {
  question: string,
  choices: string[],
  correctChoiceIndex: number
};

/**
 * Type of the QuestionTemplate
 * @param {number} id - Unique Identifiger of this unit
 * @param {string} name - Unit name
 * @param {UnitType} name - Unit type
 */
export type Unit = {
  id: number,
  name: string,
  unitType: UnitType|any,
}

/**
 * Type of the QuestionTemplate
 * @param {number} id - Unique Identifiger of this templates
 * @param {UnitType} type - Question Level Type, expected "Brigade" or "Battalion" only
 * @param {string} text - Question Text
 * @param {UnitType} token - Question token type, the expected unit type of :TOKEN: in the text
 * @param {UnitType} answer - Question answer type
 * @param {Polarity} polarity - Polarity of the question, "Negative" means "NOT" question
 */
export type QuestionTemplate = {
  id: number,
  type: UnitType,
  text: string,
  token: UnitType,
  answer: UnitType,
  polarity: Polarity,
}
