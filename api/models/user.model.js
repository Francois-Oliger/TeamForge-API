import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize_client.js";

// Represents the User table.
class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
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
  },
  {
    sequelize,
    tableName: "user",
    timestamps: true, // Automatically manages created_at and updated_at
    underscored: true,
  }
);

export default User;