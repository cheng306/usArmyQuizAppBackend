import { UnitType } from '../../utils/enums';
import { connectionPool, db, sql } from './db';
import { Unit } from '../../utils/apiTypes';

export function isDBConnected(): Promise<boolean> {
  return db.then(() => connectionPool.connected).catch((resolve) => false);
}

export function getParentUnit(unitId: number, parentUnitType: UnitType) {
  return `${unitId}${parentUnitType}`;
}

export function getUnits(unitType: UnitType, parentUnitId: number) {
  return `${unitType}${parentUnitId}`;
}

export function getAllUnits(): Promise<Unit[]> {
  const request = new sql.Request(connectionPool);
  return request.query('select id, name from DeNormalize')
    .then((res) => res.recordset)
    .catch((err) => {
      throw err;
    });
}
