import express, { Request, Response } from 'express';
import {getUnitType, isDBConnected} from '../../database/sqlServer/dbService';

const router = express.Router();

// GET index
router.get('/', (req: Request, res: Response) => {
  getUnitType(0).then((unitType) => {
    console.log(unitType);
  }).catch((err) => {
    console.log(err);
  });
  res.send({ isDBConnected: isDBConnected(), Environment: process.env.NODE_ENV });
});

export default router;
