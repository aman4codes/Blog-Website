import {loginUser, signUpUser} from "../controller/authController.js"
import express from "express"

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);

export default router;