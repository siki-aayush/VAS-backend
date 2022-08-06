import Succes from "../domain/Success";
import User, { UserToCreate } from "../domain/User";
import logger from "../misc/logger";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Token } from "../domain/Token";

/**
 * Gets all the users
 * @returns Promise
 */
export const getAllUsers = async (): Promise<Succes<User>> => {
  logger.info("Getting all users!!");
  const users = await UserModel.getAllUsers();

  return {
    data: users,
    message: "Successfully retrieved all users",
  };
};

/**
 * Gets a user by id
 * @param  {number} id
 * @returns Promise
 */
export const getUserById = async (id: number): Promise<Succes<User>> => {
  logger.info("Getting user by id!!");
  const user = await UserModel.getUserById(id);

  return {
    data: user,
    message: "Successfully retrieved user",
  };
};

/**
 * Gets a user by email
 * @param  {string} email
 * @returns Promise
 */
export const getUserByEmail = async (email: string): Promise<Succes<User>> => {
  logger.info("Getting user by id!!");
  const user = await UserModel.getUserByEmail(email);

  return {
    data: user,
    message: "Successfully retrieved user",
  };
};

/**
 * Creates a new user
 * @param  {UserToCreate} user
 * @returns Promise
 */
export const createUser = async (user: UserToCreate): Promise<Succes<User>> => {
  logger.info("Creating user!!");
  const newUser = await UserModel.createUser(user);

  return {
    data: newUser,
    message: "Successfully created user",
  };
};

/**
 * Updates a user (either it's name email or password)
 * @param  {User} user
 * @returns Promise
 */
export const updateUser = async (user: User): Promise<Succes<User>> => {
  logger.info("Updating user!!");
  const updatedUser = await UserModel.updateUser(user);

  return {
    data: updatedUser,
    message: "Successfully updated user",
  };
};

/**
 * Deletes a user by id
 * @param  {number} id
 */
export const deleteUser = async (id: number) => {
  logger.info("Deleting user!!");
  await UserModel.deleteUser(id);
  logger.info("user deleted successfully");

  return {
    message: "Successfully deleted user",
  };
};

/**
 * Logs in a user and send the JWT token to the client
 * @param  {string} email
 * @param  {string} password
 * @returns Promise
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<Succes<Token>> => {
  logger.info("Logging in user!!");
  const user = await UserModel.getUserByEmail(email);

  if (!user) {
    return {
      message: "User not found",
    };
  }

  const isCorrect = bcrypt.compareSync(password, user.password);

  if (isCorrect) {
    const token = await jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string
    );

    return {
      data: { token },
      message: "Logged in successfully",
    };
  }

  return {
    message: "Wrong password",
  };
};
