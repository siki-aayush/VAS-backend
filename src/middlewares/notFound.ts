import CustomError from "../misc/CustomError"
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express"
/**
 * Middleware to handle the invalid routes
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, StatusCodes.NOT_FOUND);
  next(error);
}