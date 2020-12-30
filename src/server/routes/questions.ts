import express, { Request, Response } from 'express';
import { GetQuestionsBody, Question } from '../../utils/apiTypes';
import question from '../mock/question';
import { parseUnitType } from '../../utils/commons';
import getRandomQuestions from '../services/questionService';

const router = express.Router();

// GET questions
router.get('/questions', (req: Request<unknown, unknown, unknown, GetQuestionsBody>, res: Response) => {
  const { unitId, questionType, questionCounts }: GetQuestionsBody = req.query;
  if (
    !Number.isInteger(parseInt(String(unitId), 10))
    || !parseUnitType(questionType)
    || !Number.isInteger(parseInt(String(questionCounts), 10))
  ) {
    return res.status(404).send({ errorMessage: 'Invalid request query.' });
  }
  if (questionCounts < 0 || questionCounts > 50) {
    return res.status(404).send({ errorMessage: 'questionCounts out of range(0 - 50).' });
  }

  const questions: Question[] = [];
  if (JSON.parse(process.env.USING_MOCK!)) {
    for (let i = 0; i < questionCounts; i += 1) {
      questions.push(question);
    }
    return res.status(200).send(questions);
  }
  const type = parseUnitType(questionType)!;
  return getRandomQuestions(unitId, type, questionCounts).then((randomQuestions: Question[]) => res.status(200).send(randomQuestions));
});
export default router;
