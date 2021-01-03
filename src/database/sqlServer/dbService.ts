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

export function getUnitstToBeDeleted(unitId: number, unitType: string, arr:string[]): Promise<Unit[]> {
  const request = new sql.Request(connectionPool);
  return request.query(`
    select distinct id, name, unitType
    from DeNormalize as d
    inner join Company as c
    on d.id = c.companyID or battalionID = id or brigadeID = id or divisionID = id
    where (battalionID = ${unitId} or brigadeID = ${unitId} or divisionID = ${unitId} or companyID = ${unitId})
    and (unitType = '${arr[0]}' or unitType = '${arr[1]}' or unitType = '${arr[2]}' or unitType = '${arr[3]}');
  `)
    .then((res) => {
      const list: Unit[] = [];
      res.recordset.forEach((record) => {
        list.push({
          unitType: parseUnitType(record.unitType),
          id: record.id,
          name: record.name,
        });
      });
      return list;
    })
    .catch((error) => {
      throw error;
    });
}

export function deleteUnits(units: Unit[]): Promise<boolean> {
  const request = new sql.Request(connectionPool);
  let sqlQuery = 'delete from Company where ';
  sqlQuery += `divisionID = ${units[0].id} or brigadeID = ${units[0].id} or battalionID = ${units[0].id} or companyID = ${units[0].id}`;
  for (let i = 1; i < units.length; i += 1) {
    sqlQuery += `or divisionID = ${units[i].id} or brigadeID = ${units[i].id} or battalionID = ${units[i].id} or companyID = ${units[i].id}`;
  }
  sqlQuery += '\n';
  sqlQuery += 'delete from DeNormalize where ';
  sqlQuery += `id = ${units[0].id}`;
  for (let i = 1; i < units.length; i += 1) {
    sqlQuery += ` or id = ${units[i].id}`;
  }
  return request.query(sqlQuery)
    .then(() => true)
    .catch((error) => {
      throw error;
    });
}

export function createDeNormalize(unitType: string, name: string): Promise<number> {
  const request = new sql.Request(connectionPool);
  return request.query(`
    insert into DeNormalize (name , unitType)
    output Inserted.ID
    values (${name}, ${unitType});`)
    .then((res) => res.recordset[0])
    .catch((error) => {
      throw error;
    });
}

export function createCompany(divisionId: number, brigadeId: number | undefined,
  battalionId: number | undefined, companyId: number | undefined): Promise<boolean> {
  const request = new sql.Request(connectionPool);
  return request.query(`
    insert into Company (companyID , battalionID, brigadeID, divisionID)
    values (${companyId || 'NULL'}, ${battalionId || 'NULL'}
    , ${brigadeId || 'NULL'}, ${divisionId} );`)
    .then(() => true)
    .catch((error) => {
      throw error;
    });
}

export function renameUnit(unitId : number, newName: string): Promise<number> {
  const request = new sql.Request(connectionPool);
  return request.query(`
    UPDATE DeNormalize
    SET name = '${newName}'
    where id = ${unitId}
  `)
    .then((res) => res.rowsAffected[0])
    .catch((error) => {
      throw error;
    });
}
