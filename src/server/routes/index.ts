import express, { Request, Response } from 'express';
import { isDBConnected } from '../../database/sqlServer/dbService';

const router = express.Router();

// GET index
router.get('/', (req: Request, res: Response) => {
  res.send({ isDBConnected: isDBConnected(), Environment: process.env.NODE_ENV });
});

export default router;
