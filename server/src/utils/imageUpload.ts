import { v2 as cloudinary } from "cloudinary";
import { Express } from "express";

const uploadImageOnCloudinary = async (file: Express.Multer.File) => {
  try {
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "foodify",
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed");
  }
};

export default uploadImageOnCloudinary;
