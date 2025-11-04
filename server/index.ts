import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectDB } from "./src/config/db.ts";
dotenv.config();

// routes
import "./src/models";
import userRouter from "./src/routes/user.routes.ts";
import resturentRouter from "./src/routes/restaurant.route.ts";
import orderRouter from "./src/routes/order.route.ts";
import menuRouter from "./src/routes/menu.routes.ts";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/restaurant", resturentRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/menu", menuRouter);

app.get("/", (req, res) => {
  res.send("✅ TypeScript + Express backend running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
