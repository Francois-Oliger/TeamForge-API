import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

// Registers a new user.
authRouter.post("/register", validateBody(registerSchema), register);

// Authenticates a user.
authRouter.post("/login", validateBody(loginSchema), asyncHandler(login));

export default authRouter;