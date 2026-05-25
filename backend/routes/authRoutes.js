import {loginUser, signUpUser} from "../controller/authController.js"
import express from "express";

const route = express.Router();

route.post("/auth/signup",signUpUser);
route.post("/auth/login",loginUser);

export default route;