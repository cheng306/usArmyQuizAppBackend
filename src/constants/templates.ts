import { QuestionTemplate } from '../utils/apiTypes';
import { Polarity, UnitType } from '../utils/enums';

/**
 * List of the questions templates for question generators
 */
const templates: QuestionTemplate[] = [
  {
    id: 0,
    type: UnitType.BATTALION,
    text: 'Which company belong to :TOKEN:?',
    token: UnitType.BATTALION,
    answer: UnitType.COMPANY,
    polarity: Polarity.POSITIVE,
  },
  {
    id: 1,
    type: UnitType.BATTALION,
    text: 'Which company does NOT belong to :TOKEN:?',
    token: UnitType.BATTALION,
    answer: UnitType.COMPANY,
    polarity: Polarity.NEGATIVE,
  },
  /* {
    id: 2,
    type: UnitType.BRIGADE,
    text: 'Which company belongs to :TOKEN:?',
    token: UnitType.BRIGADE,
    answer: UnitType.COMPANY,
    polarity: Polarity.POSITIVE,
  },
  {
    id: 3,
    type: UnitType.BRIGADE,
    text: 'Which company does NOT belong to :TOKEN:?',
    token: UnitType.BRIGADE,
    answer: UnitType.COMPANY,
    polarity: Polarity.NEGATIVE,
  },
  {
    id: 4,
    type: UnitType.BRIGADE,
    text: 'Which battalion does NOT belong to :TOKEN:?',
    token: UnitType.BRIGADE,
    answer: UnitType.BATTALION,
    polarity: Polarity.NEGATIVE,
  },
  {
    id: 5,
    type: UnitType.BRIGADE,
    text: 'Which battalion belongs to :TOKEN:?',
    token: UnitType.BRIGADE,
    answer: UnitType.BATTALION,
    polarity: Polarity.POSITIVE,
  }, */
];

export default templates;
