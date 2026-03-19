import { User } from "../models/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


// -----ici on crée un nouvel utilisateur.---------------


export async function register(req, res) {
  // on récupère les infos utiles à notre fonction avec ce destructuring
  // et on ajoute || {} pour éviter le crash si req.body est undefined
  const { email, pseudo, password, name } = req.body || {};

  // on vérifie la présence des champs requis (et qu'ils ne sont pas vides ou remplis d'espaces)
  if (
    !email?.trim() ||
    !pseudo?.trim() ||
    !password?.trim()
  ) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }
  // on vérifie si l'email existe déjà en DB afin d'éviter les doublons
  const exists = await User.findOne({ where: { email } });

  if (exists) {
    return res.status(409).json({
      error:
        "Alors, comme ça, on ne se rappelle plus s’être déjà inscrit ? Hum… Il semblerait pourtant que vous apparaissiez déjà dans nos registres, mon chou !",
    });
  }
  // on hash le mot de passe
  const hashedPassword = await argon2.hash(password, {
    memoryCost: parseInt(process.env.ARGON2_MEMORY_COST, 10),
    timeCost: parseInt(process.env.ARGON2_TIME_COST, 10),
    parallelism: parseInt(process.env.ARGON2_PARALLELISM, 10),
  });
  // on crée l'utilisateur en base
  const newUser = await User.create({
    // on utilise le .trim pour supprimer les espaces en debut et fin de chaine.
    // et le "?" signifit: “si name existe → fais .trim(), sinon → retourne undefined sans planter”.
    email: email.trim(),
    pseudo: pseudo.trim(),
    name: name?.trim(), // optionnel
    password: hashedPassword,
  });
  // on envoie la réponse à l'utilisateur
  return res.status(201).json({
    id: newUser.id,
    email: newUser.email,
    pseudo: newUser.pseudo,
    name: newUser.name,
  });
}


//------ici on vérifie les identifiants d’un user
//  et on lui renvoie un token pour s’authentifier.--------------------------------------------------


export async function login(req, res) {
    const { email, password } = req.body;
  // ici on cherche l'utilisateur dans la DB.
    const user = await User.findOne({ where: { email } });
  
    if (!user) {
      return res.status(401).json({
        error: "Ben alors... Il faut commencer par s'inscrire, mon chou !",
      });
    }
  // ici on va vérifier le mot de passe en le comparant.
    const isValidPassword = await argon2.verify(user.password, password);
  
    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }
  //ici on fabrique le tocken
    const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
  // ici on renvoit le token à l'utilisateur.
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

