import app from "./src/app.js";
import ConnectDb from "./src/config/db.js";

ConnectDb();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
