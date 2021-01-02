import { Request, Response, NextFunction } from 'express';

const checkPassword = (req: Request, res: Response, next: NextFunction): void => {
  let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
  if (token) {
    if (typeof token !== 'string' || token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token === process.env.AUTH_PASSWORD) {
      next();
    } else {
      res.status(403).json({ errMessage: 'Password is invalid.' });
    }
  } else {
    res.status(401).send({ errorMessage: 'Auth token is not supplied.' });
  }
};

export default checkPassword;

