import { z } from "zod";

export const restaurantSchema = z.object({
  restaurantName: z
    .string()
    .min(3, "Restaurant name must be at least 3 characters"),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Country is required").optional(),
  deliveryTime: z
    .number()
    .min(1, "Delivery time must be at least 1 minute")
    .optional(),
  cuisines: z
    .array(z.string())
    .nonempty("At least one cuisine is required")
    .optional(),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    ),
});

export const addMenuSchema = z.object({
  name: z.string().min(3, "Menu name must be at least 3 characters long"),

  description: z.string().nonempty("Description is required"),

  price: z
    .number()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: "Price must be at least 1",
    })
    .transform((val) => Number(val)),

  imageFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    ),
});
