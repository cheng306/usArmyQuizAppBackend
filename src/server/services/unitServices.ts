import { getRelationship, getUnit } from '../../database/sqlServer/dbService';
import { Unit } from '../../utils/apiTypes';
import { unitTypeToLevel } from '../../utils/commons';
import { UnitType } from '../../utils/enums';

/**
 * Get a valid token for the given question template
 * @param {number} parentId
 * @param {UnitType} unitType
 * @returns {Promise<Unit>}
 */
export default function getChildUnits(parentId: number, unitType: UnitType): Promise<Unit[]> {
  return getUnit(parentId)
    .then((parent: Unit) => {
      if (unitTypeToLevel(parent.unitType) <= unitTypeToLevel(unitType)) {
        throw new Error('Child unit type has a higher rank than parent unit type');
      }
      return getRelationship(parent.id, unitType);
    }).catch((error: Error) => {
      throw error;
    });
}
