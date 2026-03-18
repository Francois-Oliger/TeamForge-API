import "dotenv/config";
import express from "express";
import sequelize from "./database/sequelize-client.js";
import "./models/index.js";
import teamsRouter from "./routes/teams.router.js"

const app = express();

app.use(express.json());
app.use(teamsRouter);

// await sequelize.sync({ alter: true });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});