// Ce fichier centralise les relations entre les modèles.
// Il permet de définir les associations entre les tables afin que Sequelize puisse gérer automatiquement les jointures et les relations entre les données.

import Pokemon from "./pokemon.model.js";
import Type from "./type.model.js";
import Team from "./team.model.js";
import User from "./user.model.js";
import PokemonType from "./pokemon_type.model.js";
import TeamPokemon from "./team_pokemon.model.js";


// Un utilisateur peut posséder plusieurs équipes.
User.hasMany(Team, { foreignKey: "user_id" });
// Chaque équipe appartient à un seul utilisateur.
Team.belongsTo(User, { foreignKey: "user_id" });


// Un Pokémon peut avoir plusieurs types et un type peut appartenir à plusieurs Pokémon.
Pokemon.belongsToMany(Type, {
  // "through" indique la table d’association utilisée pour faire le lien entre Pokémon et Type.
  through: PokemonType,
  foreignKey: "pokemon_id",
  otherKey: "type_id",
});

Type.belongsToMany(Pokemon, {
  through: PokemonType,
  foreignKey: "type_id",
  otherKey: "pokemon_id",
});


Team.belongsToMany(Pokemon, {
  through: TeamPokemon,
  foreignKey: "team_id",
  otherKey: "pokemon_id",
});

Pokemon.belongsToMany(Team, {
  through: TeamPokemon,
  foreignKey: "pokemon_id",
  otherKey: "team_id",
});

export { Pokemon, Type, Team, User, PokemonType, TeamPokemon };