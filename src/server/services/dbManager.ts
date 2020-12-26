import { UnitType } from '../../utils/enums';

export function getParentUnit(unitId: number, parentUnitType: UnitType) {
  return `${unitId}${parentUnitType}`;
}

export function getUnits(unitType: UnitType, parentUnitId: number) {
  return `${unitType}${parentUnitId}`;
}

export function deNormalizeUnit(unitId: number) {
  return `${unitId}`;
}
