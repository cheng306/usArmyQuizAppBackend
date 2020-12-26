import { UnitType } from '../../utils/enums';

export default function generateRandomQuestions(unitId: number,
  unitType: UnitType,
  questionCount: number) {
  return `${unitId}${unitType}${questionCount}`;
}
