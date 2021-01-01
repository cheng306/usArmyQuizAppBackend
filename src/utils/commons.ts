import { UnitType } from './enums';

/**
 * Retrieve a random integer between min and max inclusively
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomIntFromInterval(
  min: number,
  max: number,
) : number {
  return Math.round((min - 0.5) + Math.random() * (max - min + 1));
}

/**
 * Retrieve a random integer between min and max inclusively
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getMutipleRandomInt(
  min: number,
  max: number,
  size: number,
): number[] {
  if (max - min + 1 < size) {
    throw new Error('Unable to generate an array of unique number using the input range');
  }
  const mSet = new Set<number>();
  while (mSet.size < size) {
    mSet.add(randomIntFromInterval(min, max));
  }

  const result: number[] = [];
  mSet.forEach((value1) => result.push(value1));
  return result;
}

const unitTypeMap: Map<string, UnitType> = new Map([
  ['division', UnitType.DIVISION],
  ['brigade', UnitType.BRIGADE],
  ['battalion', UnitType.BATTALION],
  ['company', UnitType.COMPANY],
]);

export function parseUnitType(unitType: string) : UnitType {
  return unitTypeMap.get(unitType)!;
}

const unitTypeLevelMap: Map<UnitType, number> = new Map([
  [UnitType.DIVISION, 3],
  [UnitType.BRIGADE, 2],
  [UnitType.BATTALION, 1],
  [UnitType.COMPANY, 0],
]);

export function unitTypeToLevel(unitType: UnitType) : number {
  return unitTypeLevelMap.get(unitType)!;
}

export function validInt(value: string): boolean {
  return Number.isInteger(parseInt(String(value), 10));
}
