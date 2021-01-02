import express, { Request, Response } from 'express';
import { deleteUnit, getUnitsWithType } from '../services/dbManager';
import {
  DeleteUnitsBody, PostUnitsBody, PutUnitsBody, Unit,
} from '../../utils/apiTypes';
import { UnitType } from '../../utils/enums';

const router = express.Router();

router.get('/units', (req: Request<unknown, unknown, unknown, {id: number | undefined}>, res: Response) => {
  const { id } = req.query;
  if (id === undefined) {
    return getUnitsWithType(new Set([UnitType.BATTALION, UnitType.BRIGADE, UnitType.DIVISION]))
      .then((units: Unit[]) => res.status(200).send({ units }))
      .catch((error) => res.status(404).send({ errorMessage: error.message }));
  }
  return res.status(200).send({ query: req.query });
});

router.get('/units/:unitType', (req: Request<{unitType:string}, unknown, unknown, {id:number}>, res: Response) => {
  const { unitType } = req.params;
  const { id } = req.query;
  console.log(unitType + id);
  return res.status(200).send({ params: req.params, query: req.query });
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

router.delete('/units', (req: Request<DeleteUnitsBody>, res: Response) => {
  const { unitType, unitId }: DeleteUnitsBody = req.body;
  console.log(unitType + unitId);
  return deleteUnit(unitId, unitType).then(
    (success:boolean) => {
      res.status(200).send({ Success: success });
    },
  ).catch((error) => res.status(404).send({ errorMessage: error.message }));
});

export default router;
