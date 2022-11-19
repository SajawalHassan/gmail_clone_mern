import { Router } from "express";
import {
  createMail,
  deleteMails,
  getPrimaryMails,
  getPromotionMails,
  getSocialMails,
} from "../controllers/mailsController";

const router: any = Router();

router.post("/create", createMail);
router.delete("/delete", deleteMails);
router.get("/primary", getPrimaryMails);
router.get("/promotions", getPromotionMails);
router.get("/social", getSocialMails);

export default router;
