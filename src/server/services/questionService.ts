/* eslint no-lonely-if: 0 */
/* Justification: Those lonely if will be implement later */

import { NOTFOUND, NOTIMP } from 'dns';
import { Polarity, UnitType } from '../../utils/enums';
import {
  getUnit, getParent, getChildren, getNotChildren,
} from './dbManager';
import Question from '../../utils/Question';
import QuestionTemplate from '../../utils/QuestionTemplate';
import templates from '../../constants/templates';
import Unit from '../../utils/Unit';
import { getMutipleRandomInt, randomIntFromInterval } from '../../utils/commons';

/**
 * Generate Question (questions, choices, and answer) from a QuestionTemplate
 * @param {Unit} unit
 * @param {template} QuestionTemplate
 * @returns {Question}
 */
function generateQuestionFromTemplate(
  unit: Unit,
  template: QuestionTemplate,
): Promise<Question> {
  if (template.token === template.answer) {
    // You can't have a token equal to answer.
    // i.e. The relationship must be on a different level
    throw TypeError;
  } else if (unit.type < template.token || unit.type < template.answer) {
    // You can't have unit type smaller than template token or template answer.
    // i.e. The unit must be parent of both token and answer
    throw TypeError;
  }

  let token: Promise<Unit>;
  let answer: Promise<Unit>;
  let otherChoices: Promise<Unit[]>;
  if (template.polarity === Polarity.POSITIVE) {
    if (template.token > template.answer) {
      // If token > answer, the answer must reside in the child node of the token
      token = getChildren(unit.id, template.token).then((childUnits: Unit[]) => childUnits[randomIntFromInterval(0, childUnits.length)]);

      answer = token.then((tokenUnit: Unit) => getChildren(tokenUnit.id, template.answer)).then((tchildUnits: Unit[]) => tchildUnits[randomIntFromInterval(0, tchildUnits.length)]);

      otherChoices = token.then((tokenUnit: Unit) => getNotChildren(tokenUnit.id, template.answer)).then((tchildUnits: Unit[]) => {
        const idx = getMutipleRandomInt(0, tchildUnits.length, 3);
        const result: Unit[] = [];
        for (let i = 0; i < 3; i += 1) {
          result.push(tchildUnits[idx[i]]);
        }
        return result;
      });
    } else {
      // template.token < template.answer
      throw NOTIMP;
    }
  } else {
    // This template has a negative polarity
    if (template.token > template.answer) {
      // If token > answer, the answer must reside in the child node of the token
      token = getChildren(unit.id, template.token).then((childUnits: Unit[]) => childUnits[randomIntFromInterval(0, childUnits.length)]);

      answer = token.then((tokenUnit: Unit) => getNotChildren(tokenUnit.id, template.answer)).then((tchildUnits: Unit[]) => tchildUnits[randomIntFromInterval(0, tchildUnits.length)]);

      otherChoices = token.then((tokenUnit: Unit) => getChildren(tokenUnit.id, template.answer))
        .then((tchildUnits: Unit[]) => {
          const idx = getMutipleRandomInt(0, tchildUnits.length, 3);
          const result: Unit[] = [];
          for (let i = 0; i < 3; i += 1) {
            result.push(tchildUnits[idx[i]]);
          }
          return result;
        });
    } else {
      // template.token < template.answer
      throw NOTIMP;
    }
  }

  const promiseList: [Promise<Unit>, Promise<Unit>, Promise<Unit[]>] = [token, answer, otherChoices];
  return Promise.all(promiseList).then((results) => {
    const text: string = template.text.replace(/:TOKEN:/gi, results[0].name);
    const correctIdx = randomIntFromInterval(0, 3);
    const choices: string[] = [];

    let j = 0;
    for (let i = 0; i < 3; i += 1) {
      if (i === correctIdx) {
        choices.push(results[1].name);
      } else {
        choices.push(results[2][j].name);
        j += 1;
      }
    }

    return new Question(text, choices, correctIdx);
  });
}

/**
 * Retrieve a list of questions templates using the given question type
 * @param {UnitType} questionType
 * @returns {QuestionTemplate[]}
 */
function getValidQuestionsForUnitTypes(
  questionType: UnitType,
): QuestionTemplate[] {
  switch (questionType) {
    case UnitType.BRIGADE: {
      return templates;
    }
    case UnitType.BATTALION: {
      const result: QuestionTemplate[] = [];
      templates.forEach((template) => {
        if (template.type === UnitType.BATTALION) {
          result.push(template);
        }
      });
      return result;
    }
    default: {
      throw NOTIMP;
    }
  }
}

/**
 * Retrieve a list of random questions on Brigade level
 * @param {Unit} unit
 * @param {number} questionCount
 * @returns {Promise<Question[]>}
 */
function generateQuestions(
  unit: Unit,
  questionCount: number,
): Promise<Question[]> {
  const validTemplate = getValidQuestionsForUnitTypes(unit.type);
  const questionsAsync: Promise<Question>[] = [];
  for (let i = 0; i < questionCount; i += 1) {
    const idx = randomIntFromInterval(0, validTemplate.length);
    const template = validTemplate[idx];
    questionsAsync.push(generateQuestionFromTemplate(unit, template));
  }

  return Promise.all(questionsAsync).then((questions: Question[]) => questions);
}

/**
 * Retrieve a list of random questions
 * @param {number} unitId
 * @param {UnitType} questionType
 * @param {number} questionCount
 * @returns {Question[]}
 */
export default function getRandomQuestions(
  unitId: number,
  questionType: UnitType,
  questionCount: number,
): Promise<Question[]> {
  // Determine which questions we can generate
  return getUnit(unitId).then((unit : Unit) => {
    if (!unit) {
      // Throw NOTFOUND expection if the unit is not found
      throw NOTFOUND;
    } else if (unit.type > questionType) {
      throw new Error("Unit type can't be higher level than Question type");
    }

    // Split it on purpose even through they can be combined for future expansion
    if (questionType === UnitType.BRIGADE) {
      if (unit.type !== UnitType.BRIGADE) {
        return getParent(unit.id, UnitType.BRIGADE);
      }
      return new Promise<Unit>((res) => { res(unit); });
    } if (questionType === UnitType.BATTALION) {
      if (unit.type !== UnitType.BATTALION) {
        return getParent(unit.id, UnitType.BATTALION);
      }
      return new Promise<Unit>((res) => { res(unit); });
    }
    throw NOTIMP;
  }).then((unit: Unit) => generateQuestions(unit, questionCount));
}
