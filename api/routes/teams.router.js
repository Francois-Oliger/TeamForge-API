// ici on créé des routes pour les pages teams
import { Router } from "express";
import {validateCreateTeam, validateUpdateTeam, findTeam, checkTeamOwner } from "../middlewares/teams.middlewares.js"
import {asyncHandler} from "../middlewares/async-handler.js"
import { findPokemon } from "../middlewares/pokemon.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
// ici on importe le controller
import {getAllTeams, updateTeam, deleteTeam, createTeam, getOneTeam, addPokemonToTeam, removePokemonFromTeam } from "../controllers/teams.controllers.js";



// ici on créé un router 
const teamsRouter = Router();

// Quand une requette get arrive, Express appel getAllTeams du controller
teamsRouter.get("/teams", asyncHandler(getAllTeams));
teamsRouter.get("/teams/:id", findTeam, asyncHandler(getOneTeam));
teamsRouter.post("/teams/",authMiddleware, validateCreateTeam, asyncHandler(createTeam));
teamsRouter.delete("/teams/:id",authMiddleware, findTeam, checkTeamOwner, asyncHandler(deleteTeam));
teamsRouter.put("/teams/:id",authMiddleware, findTeam, checkTeamOwner, validateUpdateTeam, asyncHandler(updateTeam));

//route pour ajouter un pokemon a une team.
teamsRouter.post("/teams/:teamId/pokemon/:pokemonId",authMiddleware, findTeam, checkTeamOwner, findPokemon, asyncHandler(addPokemonToTeam));

//route pour delete un pokemon d'une liste
teamsRouter.delete("/teams/:teamId/pokemon/:pokemonId",authMiddleware, findTeam, checkTeamOwner, findPokemon, asyncHandler(removePokemonFromTeam));

//On exporte le router pour l'utiliser dans app.js
export default teamsRouter;