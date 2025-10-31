import { z } from "zod";
import type { forgotPasswordSchema, loginSchema, resetPasswordSchema, signupSchema } from "@/zodSchema/authSchema";
import type { addMenuSchema, restaurantSchema } from "@/zodSchema/resturentSchema";
 
export type SignupInterface = z.infer<typeof signupSchema>;
export type LoginInterface = z.infer<typeof loginSchema>;
export type forgotPasswordInterface = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordInterface = z.infer<typeof resetPasswordSchema>;
export type resturentInterface = z.infer<typeof restaurantSchema>;
export type addMenuInterface = z.infer<typeof addMenuSchema>;
