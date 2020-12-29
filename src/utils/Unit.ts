import { UnitType } from './enums';

/**
 * Class of the QuestionTemplate
 * @param {number} id - Unique Identifiger of this unit
 * @param {string} name - Unit name
 * @param {UnitType} type - Unit Type
 */
export default class Unit {
  id: number;

  name: string;

  type: UnitType;

  constructor(
    id: number,
    name: string,
    type: UnitType,
  ) {
    this.id = id;
    this.type = type;
    this.name = name;
  }
}
