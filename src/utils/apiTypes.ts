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
 * Type of the GetUnits
 * @field {number} id - unit Id
 * @field {number} parentId - parent id
 */
export type GetUnits = {
  id: number | undefined;
  parentId: number | undefined;
}

/**
 * Type of the PostUnitsBody
 * @field {string} name - name of the new unit
 * @field {number} divisionID - divisionID of the new unit
 * @field {number} brigadeID - birgadeID of the new unit
 * @field {number} battalionID - battalionID of the new unit
 */
export type PostUnitsBody = {
  name: string,
  divisionId: number | undefined,
  brigadeId: number | undefined,
  battalionId: number | undefined
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

/**
 * Type of the DeleteUnitsBody
 * @field {string} unitType - UnitType of unit to be deleted
 * @field {number} id - Unique identifier of this unit
 */
export type DeleteUnitsBody = {
  unitType: string,
  unitId: number
}
