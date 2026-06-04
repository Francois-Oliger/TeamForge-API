// Ce fichier configure la connexion Sequelize à la base de données
// et fournit une fonction permettant de vérifier que celle-ci est accessible.

import "dotenv/config";
import { Sequelize } from "sequelize";

// Vérifie que l'URL de connexion à la base de données est définie
// dans les variables d'environnement.
if (!process.env.DB_URL) {
  throw new Error("DB_URL is not defined");
}

// Initialise l'instance Sequelize avec les paramètres de connexion.
const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Vérifie que la connexion à la base de données est opérationnelle.
export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Relance l'erreur afin d'empêcher le démarrage de l'application
    // si la base de données n'est pas accessible.
    throw error;
  }
}

export default sequelize;