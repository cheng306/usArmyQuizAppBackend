import { UnitType } from '../../utils/enums';
import { Unit } from '../../utils/apiTypes';
import {
  getAllUnits as dbGetAllUnits,
  getNegativeRelationship as dbGetNegativeRelationship,
  getRelationship as dbGetRelationship,
  getUnit as dbGetUnit,
  getUnitType as dbGetUnitType,
  isDBConnected,
} from '../../database/sqlServer/dbService';

/**
 * Retrieve the unit given unit id
 * @param {Unit} unitId
 * @returns {Promise<Unit>}
 */
export function getUnit(unitId: number) : Promise<Unit> {
  return isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbGetUnit(unitId);
  }).then((unit: Unit) => unit).catch((err) => {
    throw new Error('An unexpected error has occurs.');
  });
}

/**
 * Retrieve the unit type of the given unit id
 * @param {Unit} unitId
 * @returns {Promise<UnitType>}
 */
export function getUnitType(unitId: number) : Promise<UnitType> {
  return isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbGetUnitType(unitId);
  }).then((unitType: UnitType) => unitType).catch((err) => {
    throw new Error('An unexpected error has occurs.');
  });
}

/**
 * Retrieve all units
 * @param {Unit} unitId
 * @returns {Promise<Unit[]>}
 */
export function getAllUnits(): Promise<Unit[]> {
  return isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbGetAllUnits();
  }).then((units: Unit[]) => units).catch((err) => {
    throw new Error('An unexpected error has occurs.');
  });
}

/**
 * Retrieve all units of given unit type NOT related to the given unit id
 * @param {Unit} unitId
 * @param {UnitType} unitType
 * @returns {Promise<Unit[]>}
 */
export function getNegativeRelationship(unitID: number, unitType: UnitType): Promise<Unit[]> {
  return isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbGetNegativeRelationship(unitID, unitType);
  }).then((units: Unit[]) => units).catch((err) => {
    throw new Error('An unexpected error has occurs.');
  });
}

/**
 * Retrieve all units of given unit type related to the given unit id
 * @param {Unit} unitId
 * @param {UnitType} unitType
 * @returns {Promise<Unit[]>}
 */
export function getRelationship(unitID: number, unitType: UnitType): Promise<Unit[]> {
  return isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbGetRelationship(unitID, unitType);
  }).then((units: Unit[]) => units).catch((err) => {
    throw new Error('An unexpected error has occurs.');
  });
}
