import { Request, Response } from 'express';

export const rootHandler = (_req: Request, res: Response) => res.send('Root');

export const questionsHandler = (_req: Request, res: Response) => res.send('questions');
