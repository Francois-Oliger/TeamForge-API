// Ce middleware vérifie la présence et la validité du token JWT afin de protéger les routes nécessitant une authentification.
 
import jwt from "jsonwebtoken";

// Vérifie le JWT et ajoute les informations utilisateur à la requête.
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Vérifie la présence du header Authorization.
  if (!authHeader) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }

  // Extrait le token du format "Bearer <token>".
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // Ajoute les informations utilisateur décodées à la requête.
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ error: "INVALID_OR_EXPIRED_TOKEN" });
  }
}