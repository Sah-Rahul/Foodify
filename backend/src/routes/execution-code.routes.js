import express from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { executeCode, submissionRoutes } from "../controllers/executeCode.controller.js";

const executionRoutes = express.Router();

executionRoutes.post("/execute-code",userMiddleware,  executeCode);

executionRoutes.post("/submission",userMiddleware,  submissionRoutes);
 
export default executionRoutes;
