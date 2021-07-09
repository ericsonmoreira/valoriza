import { NextFunction, Request, Response } from 'express';

export function ensureAdmin(
  resquest: Request,
  response: Response,
  next: NextFunction
) {
  // TODO: verificar se é admin
  const admin = true;

  if (admin) return next();

  return response.status(401).json({
    error: 'Unauthorized',
  });
}
