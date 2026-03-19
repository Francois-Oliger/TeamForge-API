import Pokemon from "./pokemon.model.js";
import Type from "./type.model.js";
import Team from "./team.model.js";
import User from "./user.model.js";
import PokemonType from "./pokemon_type.model.js";
import TeamPokemon from "./team_pokemon.model.js";

// User ↔ Team (1:N)
User.hasMany(Team, { foreignKey: "user_id" });
Team.belongsTo(User, { foreignKey: "user_id" });

// Pokemon ↔ Type (N:N)
Pokemon.belongsToMany(Type, {
  through: PokemonType,
  foreignKey: "pokemon_id",
  otherKey: "type_id",
});

Type.belongsToMany(Pokemon, {
  through: PokemonType,
  foreignKey: "type_id",
  otherKey: "pokemon_id",
});

// Team ↔ Pokemon (N:N)
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