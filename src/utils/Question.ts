/**
 * Class of the Question
 * @param {string} question - Question Text
 * @param {string[]} choices - Choices of the Question, expected 3 incorrect and 1 correct choices
 * @param {number} correctChoiceIndex - Correct Choice Index for this question
 */
export default class Question {
  question: string;

  choices: string[];

  correctChoiceIndex: number;

  constructor(
    question: string,
    choices: string[],
    correctChoiceIndex: number,
  ) {
    this.question = question;
    this.choices = choices;
    this.correctChoiceIndex = correctChoiceIndex;
  }
}
