import mongoose, { Document, Schema } from "mongoose";

export interface IMenu {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface IMenuDocument extends IMenu, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema = new Schema<IMenuDocument>(
  {
    name: {
      type: String,
      required: [true, "Menu name is required"],
    },
    description: {
      type: String,
      required: [true, "Menu description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Strongly typed model
export const Menu = mongoose.model<IMenuDocument>("Menu", menuSchema);
