// ici on créé des routes pour les pages teams
import { Router } from "express";
import {validateCreateTeam, validateUpdateTeam, findTeam } from "../middlewares/teams.middlewares.js"
import {asyncHandler} from "../middlewares/async-handler.js"
// ici on importe le controller
import {getAllTeams, updateTeam, deleteTeam, createTeam, getOneTeam, addPokemonToTeam, removePokemonFromTeam } from "../controllers/teams.controllers.js";
import { findPokemon } from "../middlewares/pokemon.middlewares.js";


// ici on créé un router 
const teamsRouter = Router();

// Quand une requette get arrive, Express appel getAllTeams du controller
teamsRouter.get("/teams", asyncHandler(getAllTeams));
teamsRouter.get("/teams/:id",findTeam, asyncHandler(getOneTeam));
teamsRouter.post("/teams/",validateCreateTeam, asyncHandler(createTeam));
teamsRouter.delete("/teams/:id",findTeam, asyncHandler(deleteTeam));
teamsRouter.put("/teams/:id",findTeam, validateUpdateTeam, asyncHandler(updateTeam));

//route pour ajouter un pokemon a une team.
teamsRouter.post("/teams/:teamId/pokemon/:pokemonId", findTeam, findPokemon, asyncHandler(addPokemonToTeam));

//route pour delete un pokemon d'une liste
teamsRouter.delete("/teams/:teamId/pokemon/:pokemonId", findTeam, findPokemon, asyncHandler(removePokemonFromTeam));

//On exporte le router pour l'utiliser dans app.js
export default teamsRouter;