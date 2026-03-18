import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize-client.js";



// On crée une classe Sequelize qui représente la table Type.
class Type extends Model {}


// On décrit les colonnes de la table. Chaque propriété = une colonne SQL.

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

    created_at: {
      type: DataTypes.DATE,
    },

    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "type",
    timestamps: true,
    underscored: true
  },  
);

export default Type;