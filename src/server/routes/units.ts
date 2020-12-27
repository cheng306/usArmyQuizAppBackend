import express, { Request, Response } from 'express';
import getUnitsRes from '../mock/getUnitsRes';

const router = express.Router();

// GET questions
router.get('/units', (req: Request, res: Response) => res.send(getUnitsRes));

export default router;
