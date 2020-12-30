/* eslint no-lonely-if: 0 */
/* Justification: Those lonely if will be implement later */

import { NOTFOUND, NOTIMP } from 'dns';
import { Polarity, UnitType, unitTypeToLevel } from '../../utils/enums';
import {
  getNegativeRelationship,
  getRelationship,
  getUnit,
} from './dbManager';
import templates from '../../constants/templates';
import { getMutipleRandomInt, randomIntFromInterval } from '../../utils/commons';
import { Question, QuestionTemplate, Unit } from '../../utils/apiTypes';
import { Console } from 'console';

/**
 * Get a valid token for the given question template
 * @param {Unit} unit
 * @param {template} QuestionTemplate
 * @returns {Promise<Unit>}
 */
function getToken(
  unit: Unit,
  template: QuestionTemplate,
): Promise<Unit> {
  return getRelationship(unit.id, template.token).then((childUnits: Unit[]) => {
    return childUnits[randomIntFromInterval(0, childUnits.length-1)];
  }).catch((err) => {
    throw new Error('Unable to fetch question token');
  });
}

/**
 * Get a answer based on the given token for the given question template
 * @param {Unit} unit
 * @param {template} QuestionTemplate
 * @returns {Promise<Unit>}
 */
function getAnswer(
  token: Promise<Unit>,
  template: QuestionTemplate,
): Promise<Unit> {
  let answers : Promise<Unit[]>;
  if (template.polarity === Polarity.POSITIVE) {
    answers = token.then((unit: Unit) => getRelationship(unit.id, template.answer));
  } else {
    answers = token.then((unit: Unit) => getNegativeRelationship(unit.id, template.answer));
  }

  return answers.then((child: Unit[]) => {
    return child[randomIntFromInterval(0, child.length-1)]
  }).catch((err) => {
    throw new Error('Unable to fetch question answer');
  });
}

/**
 * Get incorrect answers based on the given token for the given question template
 * @param {Unit} unit
 * @param {template} QuestionTemplate
 * @param {number} numberOfChoices
 * @returns {Promise<Unit>}
 */
function getOtherChoices(
  token: Promise<Unit>,
  template: QuestionTemplate,
  numberOfChoices: number,
): Promise<Unit[]> {
  let incorrectAnswers : Promise<Unit[]>;
  if (template.polarity === Polarity.POSITIVE) {
    incorrectAnswers = token.then((unit: Unit) => getNegativeRelationship(unit.id, template.answer));
  } else {
    incorrectAnswers = token.then((unit: Unit) => getRelationship(unit.id, template.answer));
  }

  return incorrectAnswers.then((tchildUnits: Unit[]) => {
    const idx = getMutipleRandomInt(0, tchildUnits.length, numberOfChoices);
    const result: Unit[] = [];
    for (let i = 0; i < numberOfChoices; i += 1) {
      result.push(tchildUnits[idx[i]]);
    }
    return result;
  }).catch((err) => {
    throw new Error('Unable to fetch question choices');
  });
}

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
  } else if (unitTypeToLevel(unit.unitType)! < unitTypeToLevel(template.token)!
    || unitTypeToLevel(unit.unitType)! < unitTypeToLevel(template.answer)!) {
    // You can't have unit type smaller than template token or template answer.
    // i.e. The unit must be parent of both token and answer
    throw TypeError;
  }

  const token: Promise<Unit> = getToken(unit, template);
  const answer: Promise<Unit> = getAnswer(token, template);
  const otherChoices: Promise<Unit[]> = getOtherChoices(token, template, 3);

  const promiseList: [Promise<Unit>, Promise<Unit>, Promise<Unit[]>] = [token, answer, otherChoices];
  return Promise.all(promiseList).then((results) => {
    const text: string = template.text.replace(/:TOKEN:/gi, results[0].name);
    const correctIdx = randomIntFromInterval(0, 2);
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

    return {
      question: text,
      choices,
      correctChoiceIndex: correctIdx,
    };
  }).catch((err) => {
    throw err;
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
  const validTemplate = getValidQuestionsForUnitTypes(unit.unitType);
  const questionsAsync: Promise<Question>[] = [];
  for (let i = 0; i < questionCount; i += 1) {
    const idx = randomIntFromInterval(0, validTemplate.length-1);
    const template = validTemplate[idx];
    questionsAsync.push(generateQuestionFromTemplate(unit, template));
  }

  return Promise.all(questionsAsync).then((questions: Question[]) => questions).catch((err) => {
    throw err;
  });
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
    } else if (unitTypeToLevel(unit.unitType) > unitTypeToLevel(questionType)) {
      throw new Error("Unit type can't be higher level than Question type");
    }

    // Split it on purpose even through they can be combined for future expansion
    if (questionType === UnitType.BRIGADE) {
      if (unit.unitType !== UnitType.BRIGADE) {
        return getRelationship(unit.id, UnitType.BRIGADE);
      }
      return new Promise<Unit[]>((res) => { res([unit]); });
    } if (questionType === UnitType.BATTALION) {
      if (unit.unitType !== UnitType.BATTALION) {
        return getRelationship(unit.id, UnitType.BATTALION);
      }
      return new Promise<Unit[]>((res) => { res([unit]); });
    }
    throw NOTIMP;
  }).then((unit: Unit[]) => generateQuestions(unit[0], questionCount)).catch((err) => {
    throw err;
  });
}
