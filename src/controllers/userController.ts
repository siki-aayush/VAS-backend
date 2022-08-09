import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { SALT_ROUNDS } from "../constants/common";
import CustomError from "../misc/CustomError";
import * as userService from "../services/userService";

/**
 * Gets all the users
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userService
    .getAllUsers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Gets a user by id
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  userService
    .getUserById(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Gets a user by email
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getUserByEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;

  userService
    .getUserByEmail(email)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Creates a new user
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  if (req.file) {
    // Gnerates the file name with the current date and time
    const img = req.file.buffer.toString("base64");
    const fileName = Date.now() + "." + req.file?.originalname.split(".")[1];
    const filePath = path.join(__dirname, "../../uploads", fileName);

    // Saves the files to the uploads folder
    fs.writeFileSync(filePath, img, "base64");

    // Generates a hash for the password
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      userService
        .createUser({ ...req.body, password: hash, document: filePath })
        .then((data) => res.json(data))
        .catch((error) => next(error));
    });
  } else {
    next(
      new CustomError("No file uploaded", StatusCodes.UNSUPPORTED_MEDIA_TYPE)
    );
  }
};

/**
 * Updates a user (either it's name email or password)
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id, password } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    userService
      .updateUser({ ...req.body, password: hash, id: +id })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  });
};

/**
 * Delets a user by id
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  userService
    .deleteUser(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
