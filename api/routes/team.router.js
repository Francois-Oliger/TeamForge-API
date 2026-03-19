import { Router } from "express";
import {
  validateCreateTeam,
  validateUpdateTeam,
  findTeam,
  checkTeamOwner,
} from "../middlewares/team.middleware.js";
import { asyncHandler } from "../middlewares/async_handler.middleware.js";
import { findPokemon } from "../middlewares/pokemon.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getAllTeams,
  updateTeam,
  deleteTeam,
  createTeam,
  getOneTeam,
  addPokemonToTeam,
  removePokemonFromTeam,
} from "../controllers/team.controller.js";

const teamsRouter = Router();

// Retrieves all teams.
teamsRouter.get("/teams", asyncHandler(getAllTeams));

// Retrieves a single team.
teamsRouter.get("/teams/:id", findTeam, asyncHandler(getOneTeam));

// Creates a new team.
teamsRouter.post(
  "/teams",
  authMiddleware,
  validateCreateTeam,
  asyncHandler(createTeam)
);

// Deletes a team.
teamsRouter.delete(
  "/teams/:id",
  authMiddleware,
  findTeam,
  checkTeamOwner,
  asyncHandler(deleteTeam)
);

// Updates a team.
teamsRouter.put(
  "/teams/:id",
  authMiddleware,
  findTeam,
  checkTeamOwner,
  validateUpdateTeam,
  asyncHandler(updateTeam)
);

// Adds a pokemon to a team.
teamsRouter.post(
  "/teams/:teamId/pokemon/:pokemonId",
  authMiddleware,
  findTeam,
  checkTeamOwner,
  findPokemon,
  asyncHandler(addPokemonToTeam)
);

// Removes a pokemon from a team.
teamsRouter.delete(
  "/teams/:teamId/pokemon/:pokemonId",
  authMiddleware,
  findTeam,
  checkTeamOwner,
  findPokemon,
  asyncHandler(removePokemonFromTeam)
);

export default teamsRouter;