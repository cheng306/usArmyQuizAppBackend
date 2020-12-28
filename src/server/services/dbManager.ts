import { rejects } from 'assert';
import { UnitType } from '../../utils/enums';
import { Unit } from '../../utils/apiTypes';
import { getAllUnits as dbGetAllUnits, isDBConnected } from '../../database/sqlServer/dbService';

export function getParentUnit(unitId: number, parentUnitType: UnitType) {
  return `${unitId}${parentUnitType}`;
}

export function getUnits(unitType: UnitType, parentUnitId: number) {
  return `${unitType}${parentUnitId}`;
}

export function deNormalizeUnit(unitId: number) {
  return `${unitId}`;
}

export function getAllUnits(): Promise<Unit[]> {
  return isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbGetAllUnits();
  }).then((units: Unit[]) => units).catch((err) => {
    throw err;
  });
}
