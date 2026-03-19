import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

//ici on importe les fonctions et shema liés à Joi:
import { validateBody } from "../middlewares/validation.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

// Route pour créer un user
authRouter.post("/register", validateBody(registerSchema), register);
//Route pour connecter un user
authRouter.post("/login", login);

export default authRouter;
