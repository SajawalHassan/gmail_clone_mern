import express, { Router, Request, Response } from "express";
import passport from "passport";

const router: Router = express.Router();
const clientURL: string =
  process.env.NODE_ENV == "production"
    ? "https://gmail_clone_1f12"
    : "http://localhost:5000";

router.get("/login/success", (req: Request, res: Response) => {
  if (req.user) res.json({ message: "Successfuly Logged In!", user: req.user });
  else res.status(403).json({ message: "Not Authorized" });
});

router.get("/login/fail", (req: Request, res: Response) => {
  res.status(401).json({ message: "Login failure" });
});

router.get("/google/callback", () => {
  passport.authenticate("google", {
    successRedirect: clientURL,
    failureRedirect: "/login/fail",
  });
});

router.get(
  "/google",
  passport.authenticate("google", ["user", "email"] as any)
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout;
  res.redirect(clientURL);
});

export default router;
