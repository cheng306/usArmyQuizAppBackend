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
  if (query.id === undefined && query.parentId === undefined) {
    return getUnitsWithType(new Set([UnitType.BATTALION, UnitType.BRIGADE, UnitType.DIVISION]))
      .then((units: Unit[]) => res.status(200).send({ units }))
      .catch((error) => res.status(404).send({ errorMessage: error.message }));
  } if (query.id !== undefined) {
    return getUnit(query.id)
      .then((unit: Unit) => res.status(200).send({ unit }))
      .catch((error) => res.status(404).send({ errorMessage: error.message }));
  } if (query.parentId !== undefined) {
    return getChildUnits(query.parentId)
      .then((units: Unit[]) => res.status(200).send({ units }))
      .catch((error) => res.status(404).send({ errorMessage: error.message }));
  }
  return res.status(404).send({ errorMessage: 'Invalid Request.' });
});

router.post('/units', (req: Request<unknown, unknown, PostUnitsBody>, res: Response) => {
  const { unitName, unitType, parentId } = req.body;
  console.log(unitType + unitName + parentId);
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
