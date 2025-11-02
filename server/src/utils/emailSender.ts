import { sendEmail } from "./email";
import {
  generateVerificationEmailHtml,
  generateWelcomeEmailHtml,
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
} from "./emailTemplates";

export const sendVerificationEmail = async (email: string, token: string) => {
  await sendEmail({
    email,
    subject: "Verify your email",
    message: generateVerificationEmailHtml(token),
  });
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  await sendEmail({
    email,
    subject: "Welcome to FoodiFy!",
    message: generateWelcomeEmailHtml(name),
  });
};

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
  await sendEmail({
    email,
    subject: "Reset your password",
    message: generatePasswordResetEmailHtml(resetURL),
  });
};

export const sendResetSuccessEmail = async (email: string) => {
  await sendEmail({
    email,
    subject: "Password reset successful",
    message: generateResetSuccessEmailHtml(),
  });
};
