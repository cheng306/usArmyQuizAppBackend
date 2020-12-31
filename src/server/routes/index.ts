import express, { Request, Response } from 'express';
import { getUnit, isDBConnected } from '../../database/sqlServer/dbService';

const router = express.Router();

// GET index
router.get('/', (req: Request, res: Response) => {
  getUnit(90000)
    .then((rs) => {
      console.log(rs);
    })
    .catch((error) => {
      console.log(error);
    });
  isDBConnected()
    .then((dbConnected) => {
      res.send({ isDBConnected: dbConnected, Environment: process.env.NODE_ENV, NodeVersion: process.versions.node });
    });
});

export default router;
