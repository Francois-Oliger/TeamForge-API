import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize-client.js";



// On crée une classe Sequelize qui représente la table User.
class User extends Model {}


// On décrit les colonnes de la table. Chaque propriété = une colonne SQL.

User.init(
  {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
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
    tableName: "user",
    timestamps: true,
    underscored: true
  },  
);

export default User;