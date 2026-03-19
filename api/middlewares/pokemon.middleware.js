import { Pokemon } from "../models/index.js";

// Loads a pokemon by id and attaches it to the request.
export async function findPokemon(req, res, next) {
  const { pokemonId } = req.params;

  // Validates id format.
  if (isNaN(pokemonId)) {
    return res.status(400).json({ error: "INVALID_POKEMON_ID" });
  }

  const pokemon = await Pokemon.findByPk(pokemonId);

  if (!pokemon) {
    return res.status(404).json({ error: "POKEMON_NOT_FOUND" });
  }

  req.pokemon = pokemon;
  next();
}