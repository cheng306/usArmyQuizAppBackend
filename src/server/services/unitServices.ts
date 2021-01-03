import { getRelationship, getUnit } from '../../database/sqlServer/dbService';
import { Unit } from '../../utils/apiTypes';
import { parseUnitTypeLevel, unitTypeToLevel } from '../../utils/commons';

/**
 * Get a valid token for the given question template
 * @param {number} parentId
 * @param {UnitType} unitType
 * @returns {Promise<Unit>}
 */
export default function getChildUnits(parentId: number): Promise<Unit[]> {
  return getUnit(parentId)
    .then((parent: Unit) => getRelationship(parent.id, parseUnitTypeLevel(unitTypeToLevel(parent.unitType) - 1))).catch((error: Error) => {
      throw error;
    });
}
