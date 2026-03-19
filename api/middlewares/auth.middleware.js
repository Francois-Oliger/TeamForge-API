import jwt from "jsonwebtoken";

// Verifies JWT and attaches user payload to the request.
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Checks if Authorization header is present.
  if (!authHeader) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }

  // Extracts token from "Bearer <token>" format.
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = payload; // Contains userId
    next();
  } catch (error) {
    return res.status(401).json({ error: "INVALID_OR_EXPIRED_TOKEN" });
  }
}