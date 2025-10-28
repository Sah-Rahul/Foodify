import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import authRouter from "./routes/user.routes.js";
import foodPartnerRouter from "./routes/foodPartner.routes.js";

dotenv.config();

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({ extended: true}))


app.use('/api/v1/auth/user', authRouter)
app.use('/api/v1/food', foodPartnerRouter)

app.get("/", (req, res) => {
  res.json("hlo");
});

export default app;
