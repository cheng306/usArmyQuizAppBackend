import express, { Request, Response } from 'express';
import { GetQuestionsBody } from '../../utils/apiTypes';

const router = express.Router();

// GET questions
router.post('/questions', (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { unitId, unitType, questionCounts }: GetQuestionsBody = req.body;
  } catch (e) {
    return res.send({ errorMessage: 'Incorrect request body.' });
  }
  return res.send({ errorMessage: 'Incorrect request body.' });
});

export default router;
