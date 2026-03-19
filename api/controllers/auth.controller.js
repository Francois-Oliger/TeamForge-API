import { User } from "../models/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Registers a new user.
export async function register(req, res) {
  const { email, pseudo, password, name } = req.body || {};

  // Validates required fields.
  if (!email?.trim() || !pseudo?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "MISSING_REQUIRED_FIELDS" });
  }

  // Checks whether the email is already in use.
  const existingUser = await User.findOne({
    where: { email: email.trim() },
  });

  if (existingUser) {
    return res.status(409).json({ error: "USER_ALREADY_EXISTS" });
  }

  // Hashes the password before storing it.
  const hashedPassword = await argon2.hash(password, {
    memoryCost: parseInt(process.env.ARGON2_MEMORY_COST, 10),
    timeCost: parseInt(process.env.ARGON2_TIME_COST, 10),
    parallelism: parseInt(process.env.ARGON2_PARALLELISM, 10),
  });

  // Creates the user with sanitized text fields.
  const newUser = await User.create({
    email: email.trim(),
    pseudo: pseudo.trim(),
    name: name?.trim(),
    password: hashedPassword,
  });

  // Returns public user data only.
  return res.status(201).json({
    user: {
      id: newUser.id,
      email: newUser.email,
      pseudo: newUser.pseudo,
      name: newUser.name,
    },
  });
}

// Authenticates a user and returns a JWT.
export async function login(req, res) {
  const { email, password } = req.body || {};

  // Validates required fields.
  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "MISSING_REQUIRED_FIELDS" });
  }

  // Finds the user by email.
  const user = await User.findOne({
    where: { email: email.trim() },
  });

  if (!user) {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }

  // Verifies the provided password against the stored hash.
  const isValidPassword = await argon2.verify(user.password, password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }

  // Generates a JWT for the authenticated user.
  const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  // Returns the token and public user data.
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