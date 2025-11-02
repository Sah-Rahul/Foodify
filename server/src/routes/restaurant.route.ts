import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import upload from "../middleware/multer";
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from "../controllers/resturent.controller";
 

const restaurantRouter = express.Router();

 
restaurantRouter.post("/create", isAuthenticated, upload.single("imageFile"), createRestaurant);

restaurantRouter.get("/", isAuthenticated, getRestaurant);

restaurantRouter.put("/", isAuthenticated, upload.single("imageFile"), updateRestaurant);

restaurantRouter.get("/order", isAuthenticated, getRestaurantOrder);
 
restaurantRouter.put("/order/:orderId/status", isAuthenticated, updateOrderStatus);
 
restaurantRouter.get("/search/:searchText", searchRestaurant);
 
restaurantRouter.get("/:id", getSingleRestaurant);

export default restaurantRouter;
