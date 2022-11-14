import { Router } from "express";
import { createPost, getUsersMails } from "../controllers/mailsController";

const router: any = Router();

router.post("/create", createPost);
router.get("/current/user", getUsersMails);

export default router;
