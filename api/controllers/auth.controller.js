// Ce contrôleur gère l'inscription et la connexion des utilisateurs.
// Il vérifie les données reçues, sécurise les mots de passe et génère un token JWT après authentification.
 

import { User } from "../models/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Inscrit un nouvel utilisateur.
export async function register(req, res) {
  const { email, pseudo, password, name } = req.body || {};

  // Vérifie la présence des champs obligatoires.
  if (!email?.trim() || !pseudo?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "MISSING_REQUIRED_FIELDS" });
  }

  // Vérifie si l'adresse email est déjà utilisée.
  const existingUser = await User.findOne({
    where: { email: email.trim() },
  });

  if (existingUser) {
    return res.status(409).json({ error: "USER_ALREADY_EXISTS" });
  }

  // Hash le mot de passe avant son enregistrement.
  const hashedPassword = await argon2.hash(password, {
    memoryCost: parseInt(process.env.ARGON2_MEMORY_COST, 10),
    timeCost: parseInt(process.env.ARGON2_TIME_COST, 10),
    parallelism: parseInt(process.env.ARGON2_PARALLELISM, 10),
  });

  // Crée l'utilisateur avec des champs texte nettoyés.
  const newUser = await User.create({
    email: email.trim(),
    pseudo: pseudo.trim(),
    name: name?.trim(),
    password: hashedPassword,
  });

  // Retourne uniquement les données publiques de l'utilisateur.
  return res.status(201).json({
    user: {
      id: newUser.id,
      email: newUser.email,
      pseudo: newUser.pseudo,
      name: newUser.name,
    },
  });
}

// Authentifie un utilisateur et retourne un JWT.
export async function login(req, res) {
  const { email, password } = req.body || {};

  // Vérifie la présence des champs obligatoires.
  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "MISSING_REQUIRED_FIELDS" });
  }

  // Recherche l'utilisateur par email.
  const user = await User.findOne({
    where: { email: email.trim() },
  });

  if (!user) {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }

  // Vérifie le mot de passe fourni avec le hash enregistré.
  const isValidPassword = await argon2.verify(user.password, password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }

  // Génère un JWT pour l'utilisateur authentifié.
  const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  // Retourne le token et les données publiques de l'utilisateur.
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      pseudo: user.pseudo,
      name: user.name,
    },
  });
}