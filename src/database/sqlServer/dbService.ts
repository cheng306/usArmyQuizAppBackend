import { UnitType } from '../../utils/enums';
import { connectionPool, db, sql } from './db';
import { Unit } from '../../utils/apiTypes';
import { parseUnitType } from '../../utils/commons';

export function isDBConnected(): Promise<boolean> {
  return db
    .then(() => connectionPool.connected)
    .catch(() => false);
}

export function getUnitsWithType(unitTypeSet: Set<UnitType>): Promise<Unit[]> {
  let conditional = '';
  if (unitTypeSet.size > 0) {
    conditional += ' where';
    unitTypeSet.forEach((unitType: UnitType) => {
      conditional += ` unitType = '${unitType}' or`;
    });
  }
  const request = new sql.Request(connectionPool);
  return request.query(`select * from DeNormalize${conditional.substr(0, conditional.length - 3)}`)
    .then((res) => res.recordset)
    .catch((error) => {
      throw error;
    });
}

export function getUnit(unitId: number): Promise<Unit> {
  const request = new sql.Request(connectionPool);
  return request.query(`select * from DeNormalize where id = ${unitId} `)
    .then((res) => res.recordset[0])
    .catch((error) => {
      throw error;
    });
}

export function getUnitType(unitId: number): Promise<UnitType> {
  const request = new sql.Request(connectionPool);
  return request.query(`select unitType from DeNormalize where id  = ${unitId} `)
    .then((res) => res.recordset[0])
    .catch((error) => {
      throw error;
    });
}

export function getRelationship(unitID: number, unitType: UnitType): Promise<Unit[]> {
  const request = new sql.Request(connectionPool);
  const sqlUnitType = `${unitType}ID`;
  return request.query(`
    select distinct ${sqlUnitType}, name, unitType
    from Company as c
    inner join DeNormalize as dn
    on c.${sqlUnitType} = dn.ID
    where brigadeID = ${unitID}
    or battalionID = ${unitID}
    or divisionID = ${unitID}
    or companyID = ${unitID} 
  `)
    .then((res) => {
      const list: Unit[] = [];
      res.recordset.forEach((record) => {
        list.push({
          unitType: parseUnitType(record.unitType),
          id: record[sqlUnitType],
          name: record.name,
        });
      });
      return list;
    })
    .catch((error) => {
      throw error;
    });
}

export function getNegativeRelationship(unitID: number, unitType: UnitType): Promise<Unit[]> {
  const request = new sql.Request(connectionPool);
  const sqlUnitType = `${unitType}ID`;
  return request.query(`
    select distinct ${sqlUnitType}, name, unitType
    from Company as c
    inner join DeNormalize as dn
    on c.${sqlUnitType} = dn.ID
    where brigadeID != ${unitID}
    and battalionID != ${unitID}
    and divisionID != ${unitID}
    and companyID != ${unitID} 
  `)
    .then((res) => {
      const list: Unit[] = [];
      res.recordset.forEach((record) => {
        list.push({
          unitType: parseUnitType(record.unitType),
          id: record[sqlUnitType],
          name: record.name,
        });
      });
      return list;
    })
    .catch((error) => {
      throw error;
    });
}
