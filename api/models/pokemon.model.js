import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize_client.js";

// On crée une classe Sequelize qui représente la table pokemon.
class Pokemon extends Model {}

// On décrit les colonnes de la table. Chaque propriété = une colonne SQL.

Pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    atk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    def: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    atk_spe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    def_spe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    speed: {
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
    tableName: "pokemon",
    timestamps: true,
    underscored: true,
  }
);

export default Pokemon;
