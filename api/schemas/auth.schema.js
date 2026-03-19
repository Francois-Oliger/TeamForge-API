
import Joi from "joi";

// Validates request body for user registration.
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  pseudo: Joi.string().alphanum().min(2).max(30).trim().required(),
  password: Joi.string()
    .min(8)
    .max(100)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required(),
});

// Validates request body for user login.
export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
});