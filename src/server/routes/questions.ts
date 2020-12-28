import express, { Request, Response } from 'express';
import { GetQuestionsBody, Question } from '../../utils/apiTypes';
import question from '../mock/question';
import { parseUnitType } from '../../utils/enums';

const router = express.Router();

// GET questions
router.get('/questions', (req: Request<unknown, unknown, unknown, GetQuestionsBody>, res: Response) => {
  const { unitId, questionType, questionCounts }: GetQuestionsBody = req.query;
  if (
    !parseInt(String(unitId), 10)
    || !parseUnitType(questionType)
    || !parseInt(String(unitId), 10)
    || questionCounts < 0
    || questionCounts > 50
  ) {
    res.status(404);
    return res.send({ errorMessage: 'Invalid request query.' });
  }
  const questions: Question[] = [];
  for (let i = 0; i < questionCounts; i += 1) {
    questions.push(question);
  }
  res.status(200);
  return res.send(questions);
});

export default router;
