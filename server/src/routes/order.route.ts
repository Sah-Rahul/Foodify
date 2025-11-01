import express from "express"
import { isAuthenticated } from "../middleware/auth.middleware";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controllers/order.controller";
 
const orderRouter = express.Router();

orderRouter.route("/").get(isAuthenticated, getOrders);

orderRouter.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);

orderRouter.route("/webhook").post(express.raw({type: 'application/json'}), stripeWebhook);

export default orderRouter;