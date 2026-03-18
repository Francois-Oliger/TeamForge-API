import { Pokemon } from "../models/index.js";




export async function findPokemon(req, res, next) {
    //récupère l’id dans l’URL
    const pokemonId = req.params.pokemonId;

    if (isNaN(pokemonId)) {
        return res.status(400).json({ error: "pokemonId doit être un nombre" });
    }
    //cherche le pokémon en base
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (!pokemon) {
        return res.status(404).json({ error: "Aucun pokemon trouvé" });
    }
    req.pokemon = pokemon;
    next();
}