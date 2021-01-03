import express, { Request, Response } from 'express';
import {
  getUnitsWithType, getUnit, renameUnit, deleteUnit,
} from '../services/dbManager';
import {
  DeleteUnitsBody, GetUnits, PostUnitsBody, PutUnitsBody, Unit,
} from '../../utils/apiTypes';
import { UnitType } from '../../utils/enums';
import getChildUnits from '../services/unitServices';
import { parseUnitType, validInt } from '../../utils/commons';
import checkPassword from '../services/authService';

const router = express.Router();

router.get('/units', (req: Request<unknown, unknown, unknown, GetUnits>, res: Response) => {
  const { query } = req;
  let unitsPromise : Promise<Unit[]>;
  if (query.id === undefined && query.parentId === undefined) {
    unitsPromise = getUnitsWithType(new Set([UnitType.BATTALION, UnitType.BRIGADE, UnitType.DIVISION]));
  } else if (query.id !== undefined && query.parentId === undefined) {
    unitsPromise = getUnit(query.id).then((unit : Unit) => [unit]);
  } else if (query.parentId !== undefined && query.id === undefined) {
    if (query.parentId < 0) {
      unitsPromise = getUnitsWithType(new Set([UnitType.DIVISION]));
    } else {
      unitsPromise = getChildUnits(query.parentId);
    }
  } else {
    unitsPromise = new Promise<Unit[]>(() => { throw new Error('Invalid Request.'); });
  }
  return unitsPromise.then((units) => res.status(200).send({ units }))
    .catch((error) => res.status(404).send({ errorMessage: error.message }));
});

router.post('/units/:unitType', (req: Request<{unitType:string}, unknown, PostUnitsBody>, res: Response) => {
  const { unitType } = req.params;
  const {
    name, divisionId, brigadeId, battalionId,
  } = req.body;
  return res.status(200).send({ body: req.body });
});

router.put('/units', checkPassword, (req: Request<unknown, unknown, PutUnitsBody>, res: Response) => {
  const { unitId, newName } = req.body;
  if (!validInt(String(unitId))) {
    return res.status(404).send({ errorMessage: 'Invalid request body.' });
  }
  return renameUnit(unitId, newName)
    .then(() => res.status(200).send({ id: unitId, name: newName }))
    .catch((error) => res.status(404).send({ errorMessage: error.message }));
});

router.delete('/units', checkPassword, (req: Request<unknown, unknown, DeleteUnitsBody>, res: Response) => {
  const { unitType, unitId }: DeleteUnitsBody = req.body;
  if (
    !validInt(String(unitId))
    || !parseUnitType(unitType)
  ) {
    return res.status(404).send({ errorMessage: 'Invalid request body.' });
  }
  return deleteUnit(unitId, parseUnitType(unitType))
    .then((success: boolean) => res.status(200).send({ Success: success }))
    .catch((error) => res.status(404).send({ errorMessage: error.message }));
});

export default router;
