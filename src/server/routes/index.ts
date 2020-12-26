import express, { Request, Response } from 'express';

const router = express.Router();

// GET index
router.get('/', (req: Request, res: Response) => {
  res.send('Index');
});

export default router;
