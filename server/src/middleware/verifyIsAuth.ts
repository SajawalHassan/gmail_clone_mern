import { NextFunction, Request, Response } from "express";

export const verifyIsAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
