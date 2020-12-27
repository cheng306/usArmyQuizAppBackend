export type GetQuestionsBody = {
  unitId: number,
  unitType: string,
  questionCounts: number
};

export type Question = {
  question: string,
  choices: [string],
  correctChoiceIndex: number
};

export type GetQuestionsResponse = {
  questions: [Question]
};
