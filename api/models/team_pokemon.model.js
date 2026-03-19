import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize_client.js";

// Pivot table linking Team and Pokemon (many-to-many).
class TeamPokemon extends Model {}

TeamPokemon.init(
  {
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    pokemon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "team_pokemon",
    timestamps: false,
    underscored: true,
  }
);

export default TeamPokemon;