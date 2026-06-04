import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize_client.js";

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
    timestamps: true,
    underscored: true,
  }
);

export default Type;