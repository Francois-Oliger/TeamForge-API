// Ce middleware centralise la gestion des erreurs de l'application et renvoie une réponse JSON adaptée au client.
 

export function errorHandler(err, req, res, next) {
  // Affiche l'erreur complète dans la console pour le débogage.
  console.error(err);

  // Définit une réponse d'erreur par défaut si aucun statut n'est fourni.
  const status = err.status || 500;
  const error = err.code || "INTERNAL_SERVER_ERROR";

  res.status(status).json({ error });
}