import "dotenv/config";
import express from "express";
import { testConnection } from "./database/sequelize_client.js";
import "./models/index.js";
import teamsRouter from "./routes/team.router.js";
import authRouter from "./routes/auth.router.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

// Route de vérification permettant de confirmer que l'API est accessible
app.get("/", (req, res) => {
  res.json({
    message: "Pokedex API is running",
  });
});

// Déclaration des routes de l'application
app.use(authRouter);
app.use(teamsRouter);

// Middleware global de gestion des erreurs (doit être déclaré en dernier)
app.use(errorHandler);

// Vérification de la connexion à la base de données avant le démarrage du serveur
await testConnection().catch(() => process.exit(1));

const PORT = process.env.PORT || 3000;

// Démarrage du serveur HTTP
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});