import sequelize from "../database/sequelize-client.js";
import "../models/index.js";

try {
  await sequelize.drop();
  await sequelize.sync({ force: true });

  console.log("✅ Base recréée proprement");
} catch (error) {
  console.error("❌ Erreur reset BDD :", error);
} finally {
  await sequelize.close();
}