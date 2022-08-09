import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";

/**
 * Logs in a user
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  userService
    .loginUser(email, password)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
