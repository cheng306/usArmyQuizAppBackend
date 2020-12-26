import express, { Request, Response } from 'express';

const router = express.Router();

// GET questions
router.get('/questions', (req: Request, res: Response) => {
  res.send('questions');
});

export default router;
