import { Polarity, UnitType } from './enums';

/**
 * Class of the QuestionTemplate
 * @param {number} id - Unique Identifiger of this templates
 * @param {UnitType} type - Question Level Type, expected "Brigade" or "Battalion" only
 * @param {string} text - Question Text
 * @param {UnitType} token - Question token type, the expected unit type of :TOKEN: in the text
 * @param {UnitType} answer - Question answer type
 * @param {Polarity} polarity - Polarity of the question, "Negative" means "NOT" question
 */
export default class QuestionTemplate {
  id: number;

  type: UnitType;

  text: string;

  token: UnitType;

  answer: UnitType;

  polarity: Polarity;

  constructor(
    id: number,
    type: UnitType,
    text: string,
    token: UnitType,
    answer: UnitType,
    polarity: Polarity,
  ) {
    this.id = id;
    this.type = type;
    this.text = text;
    this.token = token;
    this.answer = answer;
    this.polarity = polarity;
  }
}
