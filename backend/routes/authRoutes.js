import express from "express"
import { loginUser, signUpUser, getUserInfo } from "../controller/authController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUserInfo);

export default router;