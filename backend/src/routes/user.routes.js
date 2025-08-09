import express from "express";
import { check, login, logout, register } from "../controllers/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/auth/register",  register);
userRoutes.post("/auth/login", login);
userRoutes.post("/auth/logout", userMiddleware, logout);
userRoutes.get("/auth/check",userMiddleware, check);

export default userRoutes;
