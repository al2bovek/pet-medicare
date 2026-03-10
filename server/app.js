import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appRoutes from "./routes/appRoutes.js";

import loggerMiddleware from "./middleware/loggerMiddleware.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

import "dotenv/config";

export const PORT = process.env.PORT || 5000;

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(loggerMiddleware);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/appointments", apiLimiter, appRoutes);


app.get("/status", (_, res) => {
  res.type("html").send(`
    <div style="text-align:center; color:green">
      server is running on Docker port ${PORT}
    </div>
  `);
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
