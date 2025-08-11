import express from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";

const executionRoutes = express.Router();

executionRoutes.post("/execute-code",userMiddleware,  executeCode);
 
export default executionRoutes;
