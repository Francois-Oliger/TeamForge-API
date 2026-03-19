import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize_client.js";

// On crée une classe Sequelize qui représente la table Team.
class Team extends Model {}

// On décrit les colonnes de la table. Chaque propriété = une colonne SQL.

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

    created_at: {
      type: DataTypes.DATE,
    },

    updated_at: {
      type: DataTypes.DATE,
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
