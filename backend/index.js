import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

// import routes 
import userRoutes from "./src/routes/user.routes.js";
import problemRoutes from "./src/routes/problem.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Server is running ✔✔");
});



app.use('/api/v1', userRoutes)
app.use('/api/v1/problems', problemRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
