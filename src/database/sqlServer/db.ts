import sql from 'mssql';
import dbConfig from './dbConfig';

const connectionPool = new sql.ConnectionPool(dbConfig);

const db = connectionPool.connect().catch((error) => {
  console.log(`error: ${error}`);
});

export { connectionPool, db, sql };
