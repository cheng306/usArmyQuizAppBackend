export type GetQuestionsBody = {
  unitId: number,
  questionType: string,
  questionCounts: number
};

export type Question = {
  question: string,
  choices: string[],
  correctChoiceIndex: number
};

export type GetQuestionsResponse = {
  questions: [Question]
};
