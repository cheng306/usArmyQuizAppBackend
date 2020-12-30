/* eslint no-shadow: 0 */
/**
 * Enum of UnitType
 */
export enum UnitType {
  DIVISION = 'division',
  BRIGADE = 'brigade',
  BATTALION = 'battalion',
  COMPANY = 'company'
}

const unitTypeMap: Map<string, UnitType> = new Map([['division', UnitType.DIVISION], ['brigade', UnitType.BRIGADE], ['battalion', UnitType.BATTALION], ['company', UnitType.COMPANY]]);

export function parseUnitType(unitType: string) : UnitType {
  return unitTypeMap.get(unitType)!;
}

const unitTypeLevelMap: Map<UnitType, number> = new Map([[UnitType.DIVISION, 3], [UnitType.BRIGADE, 2], [UnitType.BATTALION, 1], [UnitType.COMPANY, 0]]);

export function unitTypeToLevel(unitType: UnitType) : number {
  return unitTypeLevelMap.get(unitType)!;
}

/**
 * Enum of questions polarity
 */
export enum Polarity {
  POSITIVE,
  NEGATIVE,
}
