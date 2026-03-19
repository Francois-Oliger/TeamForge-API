import sequelize from "../database/sequelize_client.js";
import "../models/index.js";

// Resets the database by dropping and recreating all tables.
try {
  console.log("Starting database reset...");

  await sequelize.drop();
  await sequelize.sync({ force: true });

  console.log("Database reset completed successfully");
} catch (error) {
  console.error("Database reset failed:", error);
} finally {
  await sequelize.close();
}