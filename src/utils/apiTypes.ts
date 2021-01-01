import { Polarity, UnitType } from './enums';

export type GetQuestionsQuery = {
  unitId: number,
  questionType: string,
  questionCounts: number
};

/**
 * Type of the Question
 * @field {string} question - Question Text
 * @field {string[]} choices - Choices of the Question, expected 3 incorrect choice and 1 correct choice
 * @field {number} correctChoiceIndex - Correct Choice Index for this question
 */
export type Question = {
  question: string,
  choices: string[],
  correctChoiceIndex: number
};

/**
 * Type of the QuestionTemplate
 * @field {number} id - Unique identifier of this unit
 * @field {string} name - Unit name
 * @field {UnitType} name - Unit type
 */
export type Unit = {
  id: number,
  name: string,
  unitType: UnitType,
}

/**
 * Type of the QuestionTemplate
 * @field {number} id - Unique identifier of this templates
 * @field {UnitType} type - Question Level Type, expected "Brigade" or "Battalion" only
 * @field {string} text - Question Text
 * @field {UnitType} token - Question token type, the expected unit type of :TOKEN: in the text
 * @field {UnitType} answer - Question answer type
 * @field {Polarity} polarity - Polarity of the question, "Negative" means "NOT" question
 */
export type QuestionTemplate = {
  id: number,
  type: UnitType,
  text: string,
  token: UnitType,
  answer: UnitType,
  polarity: Polarity,
}

/**
 * Type of the GetUnitsQuery
 * @field {number} id - Optional unique Identifiger of this unit
 */
export type GetUnitsQuery = {
  unitId: number | undefined,
}

/**
 * Type of the GetUnitsChildrenQuery
 * @field {number} id - Optional unique identifier of this unit
 */
export type GetUnitsChildrenQuery = {
  unitId: number,
}

/**
 * Type of the PostUnitsBody
 * @field {string} unitType - UnitType of new unit
 * @field {string} unitName - Name of new unit
 * @field {number} unitName - New unit's parent's unique identifier
 */
export type PostUnitsBody = {
  unitType: string,
  unitName: string,
  parentId: number,
}

/**
 * Type of the PutUnitsBody
 * @field {number} id - Unique identifier of this unit
 * @field {string} newName - Unit's new name
 */
export type PutUnitsBody = {
  unitId: number,
  newName: string,
}
