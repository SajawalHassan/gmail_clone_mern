import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

import authRoutes from "./routes/auth";
import "./passport";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();
const origin: string =
  process.env.NODE_ENV == "production"
    ? "https://gmail_clone_1f12.vercel.app"
    : "http://localhost:3000";

// Middleware
app.use(
  session({
    secret: `${process.env.COOKIE_SECRET}`,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin, credentials: true }));
app.use(morgan("dev"));
app.use(helmet());

// App Middleware
app.use("/auth", authRoutes);

// Mongodb
mongoose.connect(`${process.env.MONGO_URI}`, () =>
  console.log("Connected to MongoDB!")
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
