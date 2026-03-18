import jwt from "jsonwebtoken";


//-------Création du middleware d’authentification pour:
// récupérer le token dans la requête;
// le vérifier; 
// autoriser ou bloquer l’accès------------------------

export async function authMiddleware (req, res, next) {
    // on recupere "Bearer TOKEN" dans la requête.
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Token manquant",
      });
    }
  //ici on split "Bearer TOKEN" pour récupérer que le token.
    const [type, token] = authHeader.split(" ");
  
    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }
      try {
        //jwt vérifie et decode le token. 
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        //on stocke le userId que contient payload
        req.user = payload;
        return next();
      } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
      }     
    }
