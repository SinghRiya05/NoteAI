import express from "express"
import { checkAuth, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router=express.Router()

router.post("/register",registerUser);

router.post("/login",loginUser)

router.post("/logout",logoutUser)

router.get("/checkAuth",authMiddleware,checkAuth);

export default router