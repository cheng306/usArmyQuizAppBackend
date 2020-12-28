import express, { Request, Response } from 'express';
import getUnitsRes from '../mock/getUnitsRes';
import { getAllUnits } from '../services/dbManager';
import { Unit } from '../../utils/apiTypes';

const router = express.Router();

// GET questions
router.get('/units', (req: Request, res: Response) => {
  getAllUnits().then((units: Unit[]) => {
    res.status(200);
    return res.send({ units });
  }).catch((err) => {
    res.status(404);
    return res.send({ errorMessage: err.message });
  });
});

export default router;
