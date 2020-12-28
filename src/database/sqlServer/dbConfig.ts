import { config } from 'mssql';

const dbConfig: config = {
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  server: process.env.NODE_ENV === 'production' ? process.env.RDS_ENDPOINT! : 'localhost',
  port: parseInt(process.env.RDS_PORT!, 10),
  database: process.env.RDS_DATABASE,
  options: {
    enableArithAbort: true,
  },
};

export default dbConfig;
