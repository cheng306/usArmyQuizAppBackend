import express, { Request, Response } from 'express';
import { GetQuestionsBody } from '../../utils/apiTypes';

const router = express.Router();

// GET questions
router.get('/questions', (req: Request, res: Response) => {
  try {
    const { unitId, unitType, questionCounts }: GetQuestionsBody = req.body;
    console.log(unitId);
    console.log(unitType);
    console.log(questionCounts);
  } catch (e) {
    res.send('err: wrong body');
  }
  res.send('questions');
});

export default router;
