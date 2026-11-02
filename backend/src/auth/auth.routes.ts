import { Router } from "express";
import * as authController from "./auth.controller";

const router = Router();

router.post("/api/auth/register", authController.register);

router.post("/api/auth/login", authController.login);

export default router;