import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const addMenu = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    console.log("Incoming form data:", req.body);
    console.log("File:", req.file);
    
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, description, price) are required",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found for this user",
      });
    }

    (restaurant.menus as unknown as mongoose.Types.ObjectId[]).push(menu._id);
    await restaurant.save();

    return res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    console.error("Error adding menu:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editMenu = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;

    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found!",
      });
    }

    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      menu.image = imageUrl;
    }

    await menu.save();

    return res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      menu,
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
