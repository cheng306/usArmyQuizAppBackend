import express, { Request, Response } from 'express';
import { getAllUnits } from '../services/dbManager';
import { Unit } from '../../utils/apiTypes';

const router = express.Router();

// GET questions
router.get('/units', (req: Request, res: Response) => {
  getAllUnits()
    .then((units: Unit[]) => res.status(200).send({ units }))
    .catch((error) => res.status(404).send({ errorMessage: error.message }));
});

export default router;
