import { Router } from "express";
import { createPost } from "../controllers/mailsController";

const router: any = Router();

router.post("/create", createPost);

export default router;
