// Ce contrôleur gère les opérations liées aux équipes :
// création, modification, suppression et gestion des Pokémon associés.


import { Team, Pokemon } from "../models/index.js";

// Retourne toutes les équipes par ordre décroissant de création.
export async function getAllTeams(req, res) {
  const teams = await Team.findAll({
    order: [["id", "DESC"]],
  });

  res.json(teams);
}

// Retourne une équipe avec ses Pokémon associés.
export async function getOneTeam(req, res) {
  const team = await req.team.reload({
    include: [Pokemon],
  });

  res.json(team);
}

// Crée une nouvelle équipe pour l'utilisateur authentifié.
export async function createTeam(req, res) {
  const { userId } = req.user;

  const team = await Team.create({
    ...req.body,

    // Empêche le client de modifier le propriétaire de l'équipe.
    user_id: userId,
  });

  res.status(201).json(team);
}

// Supprime l'équipe sélectionnée.
export async function deleteTeam(req, res) {
  const { team } = req;

  await team.destroy();

  res.status(204).send();
}

// Met à jour l'équipe sélectionnée.
export async function updateTeam(req, res) {
  const { team } = req;

  await team.update(req.body);

  res.json(team);
}

// Ajoute un Pokémon à l'équipe sélectionnée.
export async function addPokemonToTeam(req, res) {
  const { team, pokemon } = req;

  await team.addPokemon(pokemon);

  res.json({ message: "POKEMON_ADDED_TO_TEAM" });
}

// Retire un Pokémon de l'équipe sélectionnée.
export async function removePokemonFromTeam(req, res) {
  const { team, pokemon } = req;

  await team.removePokemon(pokemon);

  res.json({ message: "POKEMON_REMOVED_FROM_TEAM" });
}