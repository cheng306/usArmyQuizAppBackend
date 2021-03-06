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
  return request.query(`select * from Denormalized${conditional.substr(0, conditional.length - 3)}`)
    .then((res) => res.recordset)
    .catch((error) => {
      throw error;
    });
}

export function getUnit(unitId: number): Promise<Unit> {
  const request = new sql.Request(connectionPool);
  return request.query(`select * from Denormalized where id = ${unitId} `)
    .then((res) => res.recordset[0])
    .catch((error) => {
      throw error;
    });
}

export function getUnitType(unitId: number): Promise<UnitType> {
  const request = new sql.Request(connectionPool);
  return request.query(`select unitType from Denormalized where id  = ${unitId} `)
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
    from Unit as c
    inner join Denormalized as dn
    on c.${sqlUnitType} = dn.id
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
    from Unit as c
    inner join Denormalized as dn
    on c.${sqlUnitType} = dn.id
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
    from Denormalized as d
    inner join Unit as c
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

export function deleteUnits(unitId: number, unitType: UnitType, child: Unit[]): Promise<boolean> {
  const request = new sql.Request(connectionPool);
  const sqlUnitType = `${unitType}ID`;
  let sqlQuery = `delete from Unit where ${sqlUnitType} = ${unitId}`;
  sqlQuery += '\n';
  sqlQuery += 'delete from Denormalized where ';
  sqlQuery += `id = ${child[0].id}`;
  for (let i = 1; i < child.length; i += 1) {
    sqlQuery += ` or id = ${child[i].id}`;
  }
  return request.query(sqlQuery)
    .then(() => true)
    .catch((error) => {
      throw error;
    });
}

export function createDenormalized(name: string, unitType: UnitType): Promise<number> {
  const request = new sql.Request(connectionPool);
  return request.query(`
    insert into Denormalized (name , unitType)
    output Inserted.id
    values ('${name}', '${unitType}');`)
    .then((res) => res.recordset[0].id)
    .catch((error) => {
      throw error;
    });
}

export function createUnit(divisionId: number, brigadeId: number | null,
  battalionId: number | null, companyId: number | null): Promise<boolean> {
  const request = new sql.Request(connectionPool);
  return request.query(`
    insert into Unit (companyID , battalionID, brigadeID, divisionID)
    values (${companyId}, ${battalionId}, ${brigadeId}, ${divisionId} );
  `)
    .then(() => true)
    .catch((error) => {
      throw error;
    });
}

export function renameUnit(unitId : number, newName: string): Promise<number> {
  const request = new sql.Request(connectionPool);
  return request.query(`
    UPDATE Denormalized
    SET name = '${newName}'
    where id = ${unitId}
  `)
    .then((res) => res.rowsAffected[0])
    .catch((error) => {
      throw error;
    });
}
