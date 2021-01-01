import express, { Request, Response } from 'express';
import { getUnitsWithType, getUnit } from '../services/dbManager';
import { PostUnitsBody, PutUnitsBody, Unit } from '../../utils/apiTypes';
import { UnitType } from '../../utils/enums';
import getChildUnits from '../services/unitServices';
import { parseUnitType } from '../../utils/commons';

const router = express.Router();

router.get('/units', (req: Request<unknown, unknown, unknown, {id: number | undefined}>, res: Response) => {
  const { id } = req.query;
  if (id === undefined) {
    return getUnitsWithType(new Set([UnitType.BATTALION, UnitType.BRIGADE, UnitType.DIVISION]))
      .then((units: Unit[]) => res.status(200).send({ units }))
      .catch((error) => res.status(404).send({ errorMessage: error.message }));
  }
  return getUnit(id)
    .then((unit: Unit) => res.status(200).send({ unit }))
    .catch((error) => res.status(404).send({ errorMessage: error.message }));
});

router.get('/units/:unitType', (req: Request<{unitType:string}, unknown, unknown, {parentId:number}>, res: Response) => {
  const { unitType } = req.params;
  const { parentId } = req.query;
  if (parentId === undefined || unitType === undefined) {
    return res.status(404).send({ errorMessage: 'Invalid request query.' });
  }
  const type = parseUnitType(unitType)!;
  if (type === undefined) {
    return res.status(404).send({ errorMessage: 'Invalid unitType.' });
  }
  return getChildUnits(parentId, type)
    .then((units: Unit[]) => res.status(200).send({ units }))
    .catch((error) => res.status(404).send({ errorMessage: error.message }));
});

router.post('/units', (req: Request<PostUnitsBody>, res: Response) => {
  const { unitType, unitName, parentId }: PostUnitsBody = req.body;
  console.log(unitType + unitName + parentId);
  return res.status(200).send({ body: req.body });
});

router.put('/units', (req: Request<PutUnitsBody>, res: Response) => {
  const { unitType, unitId, newName }: PutUnitsBody = req.body;
  console.log(unitType + unitId + newName);
  return res.status(200).send({ body: req.body });
});

export default router;
