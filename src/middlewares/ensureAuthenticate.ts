import { NextFunction, Request, Response } from 'express';

import { verify } from 'jsonwebtoken';

interface IDecoder {
  name: string;
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) response.status(401).end();

  try {
    const { sub } = verify(
      token,
      'e01e94ac0c5ea4867efdc6d45351a803'
    ) as IDecoder;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
