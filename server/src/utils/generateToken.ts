import jwt from "jsonwebtoken"
import { IUser } from "../models/user.model";
import { Response } from "express";

export const generateToken = (res: Response, user: any) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "7d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token
};