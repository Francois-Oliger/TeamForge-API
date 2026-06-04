import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize_client.js";

class Team extends Model {}

Team.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "team",
    timestamps: true,
    underscored: true,
  }
);

export default Team;