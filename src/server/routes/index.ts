import express, { Request, Response } from 'express';
import { isDBConnected } from '../../database/sqlServer/dbService';

const router = express.Router();

// GET index
router.get('/', (req: Request, res: Response) => {
  console.log(isDBConnected());
  res.send({ isDBConnected: isDBConnected() });
});

export default router;
