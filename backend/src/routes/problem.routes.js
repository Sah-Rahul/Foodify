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

problemRoutes.get("/get-all-problems", userMiddleware, getAllProblems);

problemRoutes.get("/get-all-problem/:id", userMiddleware, getAllProblemById);

problemRoutes.put("/update-problem/:id", userMiddleware, checkAdmin, updateProblem );

problemRoutes.delete( "/delete-problem/:id", userMiddleware, checkAdmin, deleteProblem);

problemRoutes.post( "/get-solved-problems", userMiddleware, getAllProblemsSolvedByUser);

export default problemRoutes;
