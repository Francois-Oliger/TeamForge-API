import { Team, Pokemon } from "../models/index.js";

// Returns all teams ordered by most recent.
export async function getAllTeams(req, res) {
  const teams = await Team.findAll({
    order: [["id", "DESC"]],
  });

  res.json(teams);
}

// Returns the selected team with its associated pokemons.
export async function getOneTeam(req, res) {
  const team = await req.team.reload({
    include: [Pokemon],
  });

  res.json(team);
}

// Creates a new team for the authenticated user.
export async function createTeam(req, res) {
  const { userId } = req.user;

  const team = await Team.create({
    ...req.body,
    user_id: userId, // Prevents ownership override from client input.
  });

  res.status(201).json(team);
}

// Deletes the selected team.
export async function deleteTeam(req, res) {
  const { team } = req;

  await team.destroy();

  res.status(204).send();
}

// Updates the selected team.
export async function updateTeam(req, res) {
  const { team } = req;

  await team.update(req.body);

  res.json(team);
}

// Adds a pokemon to the selected team.
export async function addPokemonToTeam(req, res) {
  const { team, pokemon } = req;

  await team.addPokemon(pokemon);

  res.json({ message: "POKEMON_ADDED_TO_TEAM" });
}

// Removes a pokemon from the selected team.
export async function removePokemonFromTeam(req, res) {
  const { team, pokemon } = req;

  await team.removePokemon(pokemon);

  res.json({ message: "POKEMON_REMOVED_FROM_TEAM" });
}