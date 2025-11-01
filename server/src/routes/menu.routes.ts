import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import upload from "../middleware/multer";
import { addMenu, editMenu } from "../controllers/menu.controller";
 
const menuRouter = express.Router();

menuRouter.post("/", isAuthenticated, upload.single("imageFile"), addMenu);
menuRouter.put("/:id", isAuthenticated, upload.single("imageFile"), editMenu);

export default menuRouter;
