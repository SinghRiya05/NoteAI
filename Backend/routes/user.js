import express from "express"
import { userlogin } from "../controllers/Login.controller.js"

const router=express.Router()

router.post("/login",userlogin);

export default router