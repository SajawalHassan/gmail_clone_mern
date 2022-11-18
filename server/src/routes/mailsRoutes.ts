import { Router } from "express";
import {
  createPost,
  getPrimaryMails,
  getPromotionMails,
  getSocialMails,
} from "../controllers/mailsController";

const router: any = Router();

router.post("/create", createPost);
router.get("/primary", getPrimaryMails);
router.get("/promotions", getPromotionMails);
router.get("/social", getSocialMails);

export default router;
