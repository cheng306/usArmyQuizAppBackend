import sql from 'mssql';
import dbConfig from './dbConfig';

const connectionPool = new sql.ConnectionPool(dbConfig);

const db = connectionPool.connect().catch((err) => {
  console.log(`err: ${err}`);
});

export { connectionPool, db, sql };
