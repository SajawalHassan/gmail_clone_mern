import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import cookieSession from "cookie-session";

import authRoutes from "./routes/auth";

dotenv.config();

const app: Application = express();
const origin: string =
  process.env.NODE_ENV == "production"
    ? "https://gmail_clone_1f12"
    : "http://localhost:5000";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin, credentials: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    keys: [`${process.env.COOKIE_SECRET}`],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// App Middleware
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
