

//  Ce fichier initialise la connexion Sequelize à la base de données
//  et fournit une fonction permettant de vérifier que la connexion fonctionne correctement.
 

import "dotenv/config";
import { Sequelize } from "sequelize";


// Vérifie que l'URL de connexion à la base de données est bien définie.
if (!process.env.DB_URL) {
  throw new Error("DB_URL is not defined");
}

// Initialise Sequelize avec l'URL de connexion.
const sequelize = new Sequelize(process.env.DB_URL, {
  // Désactive l'affichage des requêtes SQL dans la console.
  logging: false,
});

// Vérifie que la connexion à la base de données fonctionne correctement.
export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Propage l'erreur afin d'arrêter l'application si la base est inaccessible.
    throw error;
  }
}

export default sequelize;