import { UnitType } from '../../utils/enums';
import { Unit } from '../../utils/apiTypes';
import * as dbService from '../../database/sqlServer/dbService';
import { isDBConnected } from '../../database/sqlServer/dbService';

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
    return dbService.getUnit(unitId);
  }).then((unit: Unit) => {
    if (unit === undefined) {
      throw new Error('Unknown unitId.');
    }
    return unit;
  }).catch((error) => {
    if (error.message === 'Database unavailable.' || error.message === 'Unknown unitId.') {
      throw error;
    }
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
    return dbService.getUnitType(unitId);
  }).then((unitType: UnitType) => {
    if (unitType === undefined) {
      throw new Error('Unknown unitId.');
    }
    return unitType;
  }).catch((error) => {
    if (error.message === 'Database unavailable.' || error.message === 'Unknown unitId.') {
      throw error;
    }
    throw new Error('An unexpected error has occurs.');
  });
}

/**
 * Retrieve all units
 * @returns {Promise<Unit[]>}
 */
export function getAllUnits(): Promise<Unit[]> {
  return isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbService.getAllUnits();
  }).then((units: Unit[]) => units).catch((error) => {
    if (error.message === 'Database unavailable.') {
      throw error;
    }
    throw new Error('An unexpected error has occurs.');
  });
}

/**
 * Retrieve all units of given unit type NOT related to the given unit id
 * @param {Unit} unitId
 * @param {UnitType} unitType
 * @returns {Promise<Unit[]>}
 */
export function getNegativeRelationship(unitId: number, unitType: UnitType): Promise<Unit[]> {
  return isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbService.getNegativeRelationship(unitId, unitType);
  }).then((units: Unit[]) => units).catch((error) => {
    if (error.message === 'Database unavailable.') {
      throw error;
    }
    throw new Error('An unexpected error has occurs.');
  });
}

/**
 * Retrieve all units of given unit type related to the given unit id
 * @param {Unit} unitId
 * @param {UnitType} unitType
 * @returns {Promise<Unit[]>}
 */
export function getRelationship(unitId: number, unitType: UnitType): Promise<Unit[]> {
  return isDBConnected().then((connected: boolean) => {
    if (!connected) {
      throw new Error('Database unavailable.');
    }
    return dbService.getRelationship(unitId, unitType);
  }).then((units: Unit[]) => units).catch((error) => {
    if (error.message === 'Database unavailable.') {
      throw error;
    }
    throw new Error('An unexpected error has occurs.');
  });
}
