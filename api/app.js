import "dotenv/config";
import express from "express";
import { testConnection } from "./database/sequelize_client.js";
import "./models/index.js";
import teamsRouter from "./routes/team.router.js";
import authRouter from "./routes/auth.router.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

// Routes
app.use(authRouter);
app.use(teamsRouter);

// Global error handler (must be last middleware)
app.use(errorHandler);

// Test DB before starting the server
await testConnection().catch(() => process.exit(1));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});