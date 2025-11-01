import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      id: string;
      email: string;
    };

    req.userId = decoded.id;

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
