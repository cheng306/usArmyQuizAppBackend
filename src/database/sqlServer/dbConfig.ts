import { config } from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: config = {
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  server: process.env.NODE_ENV === 'production' ? process.env.RDS_ENDPOINT! : 'localhost',
  database: process.env.RDS_DATABASE,
  port: parseInt(process.env.RDS_PORT!, 10),
  options: {
    enableArithAbort: true,
  },
};

export default dbConfig;
