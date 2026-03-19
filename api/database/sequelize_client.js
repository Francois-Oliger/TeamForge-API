import "dotenv/config";
import { Sequelize } from "sequelize";

// Ensures the database URL is defined.
if (!process.env.DB_URL) {
  throw new Error("DB_URL is not defined");
}

// Initializes Sequelize with the connection string.
const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false, // Enable (console.log) for SQL debugging if needed.
});

// Verifies database connectivity.
export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; // Propagates error to stop the app if DB is unavailable.
  }
}

export default sequelize;