import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./src/config/db.ts"
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDB()
app.get("/", (req, res) => {
  res.send("✅ TypeScript + Express backend running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
