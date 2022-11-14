// Not using controllers because of passportJS

import express, { Router, Request, Response } from "express";
import passport from "passport";
import Mail from "../models/Mail";

const clientURL: string =
  process.env.NODE_ENV == "production"
    ? "https://gmail_clone_1f12.vercel.app"
    : "http://localhost:3000";

const router: Router = express.Router();

router.get("/login/success", (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
});

router.get("/login/failed", (_req: Request, res: Response) => {
  res.status(401).json({ message: "Log in failure" });
});

router.get(
  "/google",
  passport.authenticate("google", ["profile", "email"] as any)
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: clientURL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout({}, (err: any) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    res.redirect(clientURL);
  });
});

// router.delete("/all", async (_req: Request, res: Response) => {
//   await Mail.find().deleteMany();
//   res.json("Deleted!");
// });

export default router;
