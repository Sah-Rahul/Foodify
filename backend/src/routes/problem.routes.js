import express from "express";
import { checkAdmin, userMiddleware } from "../middleware/user.middleware.js";
import {
  createProblem,
  deleteProblem,
  getAllProblemById,
  getAllProblems,
  getAllProblemsSolvedByUser,
  updateProblem,
} from "../controllers/problem.controller.js";

const problemRoutes = express.Router();

problemRoutes.post( "/create-problem", userMiddleware, checkAdmin, createProblem);

problemRoutes.post("/get-all-problems", userMiddleware, getAllProblems);

problemRoutes.post("/get-all-problem/:id", userMiddleware, getAllProblemById);

problemRoutes.post("/update-problem/:id", userMiddleware, checkAdmin, updateProblem );

problemRoutes.post( "/update-delete/:id", userMiddleware, checkAdmin, deleteProblem);

problemRoutes.post( "/get-solved-problems", userMiddleware, getAllProblemsSolvedByUser);

export default problemRoutes;
