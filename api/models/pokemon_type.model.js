import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize_client.js";

// Pivot table linking Pokemon and Type (many-to-many).
class PokemonType extends Model {}

PokemonType.init(
  {
    pokemon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "pokemon_type",
    timestamps: false,
    underscored: true,
  }
);

export default PokemonType;