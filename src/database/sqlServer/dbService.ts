import { UnitType } from '../../utils/enums';
import { connectionPool } from './db';

export function isDBConnected(): boolean {
  return connectionPool.connected;
}

export function getParentUnit(unitId: number, parentUnitType: UnitType) {
  return `${unitId}${parentUnitType}`;
}

export function getUnits(unitType: UnitType, parentUnitId: number) {
  return `${unitType}${parentUnitId}`;
}
