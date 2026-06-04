//  Ce fichier définit les schémas Joi utilisés pour valider les données d'inscription et de connexion des utilisateurs.
 

import Joi from "joi";

// Valide les données envoyées lors de l'inscription.
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

// Valide les données envoyées lors de la connexion.
export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
});