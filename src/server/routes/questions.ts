import express, { Request, Response } from 'express';
import { GetQuestionsBody } from '../../utils/apiTypes';
import getQuestionRes from '../mock/getQuestionRes';

const router = express.Router();

// GET questions
router.get('/questions', (req: Request, res: Response) => {
  const { unitId, unitType, questionCounts }: GetQuestionsBody = req.body;
  if (!unitId || !unitType || !questionCounts) {
    return res.send({ errorMessage: 'Incorrect request body.' });
  }
  return res.send(getQuestionRes);
});

export default router;
