import express from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import {
  getAllsubmission,
  getAllsubmissionForProblem,
  getAllTheSubmissionForProblem,
} from "../controllers/submission.controller.js";

const submissionRoute = express.Router();

submissionRoute.post("/submissions", userMiddleware, getAllsubmission);
submissionRoute.get(
 "/submissions/problem/:problemId",
  userMiddleware,
  getAllsubmissionForProblem
);
submissionRoute.get(
   "/submissions/problem/count/:problemId",
  userMiddleware,
  getAllTheSubmissionForProblem
);

export default submissionRoute;
