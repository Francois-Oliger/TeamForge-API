import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize_client.js";

// Represents the Type table.
class Type extends Model {}

Type.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "type",
    timestamps: true, // Automatically manages created_at and updated_at
    underscored: true,
  }
);

export default Type;