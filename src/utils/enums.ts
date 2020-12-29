/* eslint no-shadow: 0 */
/**
 * Enum of UnitType
 */
export enum UnitType {
  COMPANY = 0,
  BATTALION = 1,
  BRIGADE = 2,
  DIVISION = 3,
}

const unitTypeMap: Map<string, UnitType> = new Map([['division', UnitType.DIVISION], ['brigade', UnitType.BRIGADE], ['battalion', UnitType.BATTALION], ['company', UnitType.COMPANY]]);

export function parseUnitType(unitType: string) {
  return unitTypeMap.get(unitType);
}

/**
 * Enum of questions polarity
 */
export enum Polarity {
  POSITIVE,
  NEGATIVE,
}
