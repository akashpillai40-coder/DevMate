import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import checkInRoutes from "./routes/checkInRoutes";
import summaryRoutes from "./routes/checkInRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

//creates express application
const app = express();

//Configure middlewares
app.use(cors());
app.use(express.json());

//Test routes
app.get("/", (req, res) => {
  res.json({
    message: "Inventra API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/checkIn", checkInRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;
