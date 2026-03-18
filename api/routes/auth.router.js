import { Router } from "express";
import { register } from "../controllers/auth.controllers.js";
import { login } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
