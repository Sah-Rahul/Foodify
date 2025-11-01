import { Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Order, IOrder } from "../models/order.model";
import Stripe from "stripe";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

type CheckoutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  restaurantId: string;
};

export const getOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("user")
      .populate("restaurant");

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const createCheckoutSession = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const checkoutRequest: CheckoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(
      checkoutRequest.restaurantId
    ).populate("menus");
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    const order = new Order({
      restaurant: restaurant._id,
      user: req.userId,
      deliveryDetails: checkoutRequest.deliveryDetails,
      cartItems: checkoutRequest.cartItems,
      status: "pending",
    });
    await order.save();

    const lineItems = createLineItems(checkoutRequest, restaurant.menus);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN", "US", "CA", "GB"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    return res.status(200).json({ success: true, sessionUrl: session.url });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const stripeWebhook = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const sig = req.headers["stripe-signature"]!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_ENDPOINT_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (!orderId) return res.status(400).send("Order ID missing in metadata");

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).send("Order not found");

    order.status = "confirmed";
    if (session.amount_total) order.totalAmount = session.amount_total;
    await order.save();
  }

  res.status(200).send("Received");
};

const createLineItems = (
  checkoutRequest: CheckoutSessionRequest,
  menuItems: any[]
) => {
  return checkoutRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item: any) => item._id.toString() === cartItem.menuId
    );
    if (!menuItem) throw new Error(`Menu item ${cartItem.menuId} not found`);

    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: Math.round(menuItem.price * 100),
      },
      quantity: cartItem.quantity,
    };
  });
};
