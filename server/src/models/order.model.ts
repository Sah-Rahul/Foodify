import mongoose, { Document, Schema, Model, Types } from "mongoose";

type DeliveryDetails = {
  email: string;
  name: string;
  address: string;
  city: string;
};

type CartItem = {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export interface IOrder {
  user: Types.ObjectId;
  restaurant: Types.ObjectId;
  deliveryDetails: DeliveryDetails;
  cartItems: CartItem[];
  totalAmount?: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "outfordelivery"
    | "delivered";
}

export interface IOrderDocument extends IOrder, Document {
  _id: Types.ObjectId;
}

const orderSchema = new Schema<IOrderDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    deliveryDetails: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    cartItems: [
      {
        menuId: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "outfordelivery",
        "delivered",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Order: Model<IOrderDocument> = mongoose.model<IOrderDocument>(
  "Order",
  orderSchema
);
