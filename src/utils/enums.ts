// eslint-disable-next-line no-shadow
export enum UnitType {
  DIVISION = 'division',
  BRIGADE = 'brigade',
  BATTALION = 'battalion',
  COMPANY = 'company'
}

const unitTypeMap: Map<string, UnitType> = new Map([['division', UnitType.DIVISION], ['brigade', UnitType.BRIGADE], ['battalion', UnitType.BATTALION], ['company', UnitType.COMPANY]]);

export function convertUnitType(unitType: string) {
  return unitTypeMap.get(unitType);
}
