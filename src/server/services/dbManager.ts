import { NOTIMP } from 'dns';
import { UnitType } from '../../utils/enums';
import { Unit } from '../../utils/apiTypes';
import * as sqlServerService from '../../database/sqlServer/dbService';
import CustomError from '../../utils/errors';

/**
 * Retrieve the unit given unit id
 * @param {Unit} unitId
 * @returns {Promise<Unit>}
 */
export function getUnit(unitId: number) : Promise<Unit> {
  return sqlServerService.isDBConnected()
    .then((connected: boolean) => {
      if (!connected) {
        throw new CustomError('Database unavailable.');
      }
      return sqlServerService.getUnit(unitId);
    })
    .then((unit: Unit) => {
      if (unit === undefined) {
        throw new CustomError('Unknown unitId.');
      }
      return unit;
    })
    .catch((error) => {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('An unexpected error has occurs.');
    });
}

/**
 * Retrieve the unit type of the given unit id
 * @param {Unit} unitId
 * @returns {Promise<UnitType>}
 */
export function getUnitType(unitId: number) : Promise<UnitType> {
  return sqlServerService.isDBConnected()
    .then((connected: boolean) => {
      if (!connected) {
        throw new CustomError('Database unavailable.');
      }
      return sqlServerService.getUnitType(unitId);
    })
    .then((unitType: UnitType) => {
      if (unitType === undefined) {
        throw new CustomError('Unknown unitId.');
      }
      return unitType;
    })
    .catch((error) => {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('An unexpected error has occurs.');
    });
}

/**
 * Retrieve all units with specific unit types
 * @param {Set<UnitType>} unitTypeSet
 * @returns {Promise<Unit[]>}
 */
export function getUnitsWithType(unitTypeSet: Set<UnitType>): Promise<Unit[]> {
  return sqlServerService.isDBConnected()
    .then((connected: boolean) => {
      if (!connected) {
        throw new CustomError('Database unavailable.');
      }
      return sqlServerService.getUnitsWithType(unitTypeSet);
    })
    .then((units: Unit[]) => units)
    .catch((error) => {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('An unexpected error has occurs.');
    });
}

/**
 * Retrieve all units of given unit type NOT related to the given unit id
 * @param {Unit} unitId
 * @param {UnitType} unitType
 * @returns {Promise<Unit[]>}
 */
export function getNegativeRelationship(unitId: number, unitType: UnitType): Promise<Unit[]> {
  return sqlServerService.isDBConnected()
    .then((connected: boolean) => {
      if (!connected) {
        throw new CustomError('Database unavailable.');
      }
      return sqlServerService.getNegativeRelationship(unitId, unitType);
    })
    .then((units: Unit[]) => units)
    .catch((error) => {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('An unexpected error has occurs.');
    });
}

/**
 * Retrieve all units of given unit type related to the given unit id
 * @param {Unit} unitId
 * @param {UnitType} unitType
 * @returns {Promise<Unit[]>}
 */
export function getRelationship(unitId: number, unitType: UnitType): Promise<Unit[]> {
  return sqlServerService.isDBConnected()
    .then((connected: boolean) => {
      if (!connected) {
        throw new CustomError('Database unavailable.');
      }
      return sqlServerService.getRelationship(unitId, unitType);
    })
    .then((units: Unit[]) => units)
    .catch((error) => {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('An unexpected error has occurs.');
    });
}

/**
 * Delete the unit of input unitId and all units under that unitId
 * @param {Unit} unitId
 * @param {UnitType} unitType
 * @returns {Promise<boolean>}
 */
export function deleteUnit(unitId: number, unitType: UnitType): Promise<boolean> {
  // let unitsToDelete:Unit[];
  return sqlServerService.isDBConnected()
    .then((connected: boolean) => {
      if (!connected) {
        throw new CustomError('Database unavailable.');
      }
      let divisionStr = '';
      let brigadeStr = '';
      let battalionStr = '';

      if (unitType === UnitType.DIVISION) {
        divisionStr = 'division';
        brigadeStr = 'brigade';
        battalionStr = 'battalion';
      } else if (unitType === UnitType.BRIGADE) {
        brigadeStr = 'brigade';
        battalionStr = 'battalion';
      } else if (unitType === UnitType.BATTALION) {
        battalionStr = 'battalion';
      }
      return sqlServerService.getUnitstToBeDeleted(unitId, unitType, [divisionStr, brigadeStr, battalionStr, 'company']);
    })
    .then((units: Unit[]) => {
      if (units.length === 0) {
        throw new CustomError('No units can be deleted');
      }
      return sqlServerService.deleteUnits(unitId, unitType, units);
    })
    .then((success: boolean) => success)
    .catch((error) => {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Unable to delete the unit');
    });
}

export function createUnit(
  name: string,
  unitType: UnitType,
  divisionId?: number,
  brigadeId?: number,
  battalionId?: number,
): Promise<Unit> {
  let id = 0;
  return sqlServerService.isDBConnected()
    .then((connected: boolean) => {
      if (!connected) {
        throw new CustomError('Database unavailable.');
      }
      return sqlServerService.createDenormalized(name, unitType);
    })
    .then((mId: number) => {
      id = mId;
      switch (unitType) {
        case UnitType.COMPANY:
          return sqlServerService.createUnit(divisionId!, brigadeId!, battalionId!, id);
        case UnitType.BATTALION:
          return sqlServerService.createUnit(divisionId!, brigadeId!, id, null);
        case UnitType.BRIGADE:
          return sqlServerService.createUnit(divisionId!, id, null, null);
        case UnitType.DIVISION:
          return sqlServerService.createUnit(id, null, null, null);
        default:
          throw NOTIMP;
      }
    })
    .then(() => ({ id, unitType, name }))
    .catch((error) => {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('An unexpected error has occurs.');
    });
}

export function renameUnit(unitId: number, newName:string): Promise<void> {
  return sqlServerService.isDBConnected()
    .then((connected: boolean) => {
      if (!connected) {
        throw new CustomError('Database unavailable.');
      }
      return sqlServerService.renameUnit(unitId, newName);
    })
    .then((rowAffected: number) => {
      if (rowAffected !== 1) {
        throw new CustomError('Unknown unitId.');
      }
    })
    .catch((error) => {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('An unexpected error has occurs.');
    });
}
