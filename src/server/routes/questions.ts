import express, { Request, Response } from 'express';
import { GetQuestionsBody, Question } from '../../utils/apiTypes';
import question from '../mock/question';

const router = express.Router();

// GET questions
router.get('/questions', (req: Request, res: Response) => {
  const { unitId, unitType, questionCounts }: GetQuestionsBody = req.body;
  if (!unitId || !unitType || !questionCounts) {
    return res.send({ errorMessage: 'Incorrect request body.' });
  }
  const questions: Question[] = [];
  for (let i = 0; i < questionCounts; i += 1) {
    questions.push(question);
  }
  return res.send(questions);
});

export default router;
