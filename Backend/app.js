import "dotenv/config"; // 🔹 ES Module friendly

import express from "express";
import cors from "cors";

import retrivalRoutes from "./routes/retrivalRoute.js";
import indexingRoutes from "./routes/indexingRoute.js";
import youtubeRoutes from "./routes/youtubeIndex.js";

import userRoutes from "./routes/user.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", indexingRoutes);
app.use("/api", retrivalRoutes);
app.use("/api", youtubeRoutes);
app.use("/api", userRoutes);

app.get("/api/test", (req, res) => {
  res.send("i am working");
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(` App is listening at port ${port}`);
});
