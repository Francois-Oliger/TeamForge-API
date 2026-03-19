import "dotenv/config";
import express from "express";
import "./models/index.js";
import teamsRouter from "./routes/team.router.js"
import authRouter from "./routes/auth.router.js";

const app = express();


app.use(express.json());
app.use(authRouter);
app.use(teamsRouter);

// await sequelize.sync({ alter: true });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});