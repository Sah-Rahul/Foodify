import express from "express";
import { loginFoodPartner, logoutFoodPartner, registerFoodPartner } from "../controllers/foodPartner.controller.js";

const foodPartnerRouter = express.Router();

foodPartnerRouter.post("/register-food-partner", registerFoodPartner);

foodPartnerRouter.post("/login-food-partner", loginFoodPartner);

foodPartnerRouter.post("/logout-food-partner", logoutFoodPartner);

export default foodPartnerRouter;
