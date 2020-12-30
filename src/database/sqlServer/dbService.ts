import { UnitType } from '../../utils/enums';
import { connectionPool, db, sql } from './db';
import { Unit } from '../../utils/apiTypes';

export function isDBConnected(): Promise<boolean> {
  return db
    .then(() => {
      console.log(connectionPool.connected);
      return connectionPool.connected;
    })
    .catch(() => false);
}

export function getAllUnits(): Promise<Unit[]> {
  const request = new sql.Request(connectionPool);
  return request.query('select id, name from DeNormalize')
    .then((res) => res.recordset)
    .catch((err) => {
      throw err;
    });
}

export function getUnit(unitId: number): Promise<Unit> {
  const request = new sql.Request(connectionPool);
  return request.query(`select * from DeNormalize where id = ${unitId} `)
    .then((res) => res.recordset[0])
    .catch((err) => {
      throw err;
    });
}

export function getUnitType(unitId: number): Promise<UnitType> {
  const request = new sql.Request(connectionPool);
  return request.query(`select unitType from DeNormalize where id  = ${unitId} `)
    .then((res) => res.recordset[0])
    .catch((err) => {
      throw err;
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
    .then((res) => res.recordset)
    .catch((err) => {
      throw err;
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
    .then((res) => res.recordset)
    .catch((err) => {
      throw err;
    });
}
