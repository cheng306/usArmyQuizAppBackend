import express, { Request, Response } from 'express';
import { getUnitsWithType } from '../services/dbManager';
import { Unit } from '../../utils/apiTypes';
import { UnitType } from '../../utils/enums';

const router = express.Router();

// GET questions
router.get('/units', (req: Request, res: Response) => {
  getUnitsWithType(new Set([UnitType.BATTALION, UnitType.BRIGADE, UnitType.DIVISION]))
    .then((units: Unit[]) => res.status(200).send({ units }))
    .catch((error) => res.status(404).send({ errorMessage: error.message }));
});

export default router;
