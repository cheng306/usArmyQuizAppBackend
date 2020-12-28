import { UnitType } from '../../utils/enums';
import { connectionPool, db, sql } from './db';
import { Unit } from '../../utils/apiTypes';

export function isDBConnected(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    resolve(connectionPool.connected);
  });
}

export function getParentUnit(unitId: number, parentUnitType: UnitType) {
  return `${unitId}${parentUnitType}`;
}

export function getUnits(unitType: UnitType, parentUnitId: number) {
  return `${unitType}${parentUnitId}`;
}

export function getAllUnits(): Promise<Unit[]> {
  return db.then(() => {
    const request = new sql.Request(connectionPool);
    return request.query('select ID, name from DeNormalize');
  }).then((res) => res.recordset).catch((err) => {
    console.log(err);
    throw err;
  });
}
