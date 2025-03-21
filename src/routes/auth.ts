import { Router } from "express";
import { createAccount, loginAccount, getUser } from "../handlers/auth";
import { validateBodyAuth } from "../middlewares/auth/registerValidation";

const router = Router();

//routing
router.post("/api/auth/register", validateBodyAuth.register, createAccount); // GET request
router.post("/api/auth/login", validateBodyAuth.login, loginAccount); // GET request
router.get("/api/auth/getUser", validateBodyAuth.getUser, getUser); // GET request
export default router;
