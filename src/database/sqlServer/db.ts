import sql from 'mssql';
import dbConfig from './dbConfig';

const connectionPool = new sql.ConnectionPool(dbConfig, (res) => {
  console.log(`res: ${res}`);
});

const db = connectionPool.connect().then(() => {
  console.log('success!');
}).catch((err) => {
  console.log(`err: ${err}`);
});

export { connectionPool, db };
