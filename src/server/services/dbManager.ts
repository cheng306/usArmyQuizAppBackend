import { UnitType } from '../../utils/enums';
import * as dbService from '../../database/sqlServer/dbService';
import Unit from '../../utils/Unit';

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
  return dbService.isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbService.getAllUnits();
  });
}

/**
 * Retrieve the unit type of the given unit id
 * @param {Unit} unitId
 * @returns {Unit}
 */
export function getUnit(unitId: number): Promise<Unit> {
  return new Promise<Unit>((res) => {
    res(new Unit(8, 'The 08th MS Team', UnitType.BRIGADE));
  });
}

/**
 * Retrieve the specific parent unit id of the given child unit id
 * @param {number} unitId
 * @param {Unit} parentUnitType
 * @returns {number}
 */
export function getParent(unitId: number, parentUnitType: UnitType): Promise<Unit> {
  return new Promise<Unit>((res) => {
    res(new Unit(9, 'The parent unit', parentUnitType));
  });
}

/**
 * Retrieve the specific parent unit id of the given child unit id
 * @param {number} unitId
 * @param {Unit} parentUnitType
 * @returns {number}
 */
export function getChildren(unitId: number, childUnitType: UnitType): Promise<Unit[]> {
  return new Promise<Unit[]>((res) => {
    const result : Unit[] = [];
    result.push(new Unit(10, 'The child unit', childUnitType));
    res(result);
  });
}

/**
 * Retrieve the specific parent unit id of the given child unit id
 * @param {number} unitId
 * @param {Unit} parentUnitType
 * @returns {number}
 */
export function getNotParent(unitId: number, unitType: UnitType): Promise<Unit[]> {
  return new Promise<Unit[]>((res) => {
    const result : Unit[] = [];
    result.push(new Unit(10, 'The not parent unit 1', unitType));
    result.push(new Unit(11, 'The not parent unit 1', unitType));
    res(result);
  });
}

/**
 * Retrieve the specific parent unit id of the given child unit id
 * @param {number} unitId
 * @param {Unit} parentUnitType
 * @returns {number}
 */
export function getNotChildren(unitId: number, unitType: UnitType): Promise<Unit[]> {
  return new Promise<Unit[]>((res) => {
    setTimeout(() => {
      const result : Unit[] = [];
      result.push(new Unit(10, 'The not child unit 1', unitType));
      result.push(new Unit(11, 'The not child unit 2', unitType));
      res(result);
    }, 100);
  });
}
