// Ce fichier définit le modèle Sequelize de la table pivot "pokemon_type".
 

import { Model, DataTypes } from "sequelize";
import sequelize from "../database/sequelize_client.js";


// extends model: Hérite de la classe Model de Sequelize afin de bénéficier des fonctionnalités ORM
//  (requêtes SQL, création, lecture, mise à jour, suppression, etc.).
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
    // Désactive les colonnes created_at et updated_at générées automatiquement par Sequelize.
    timestamps: false,
    // Utilise le format snake_case pour les noms de colonnes générés par Sequelize.
    underscored: true,
  }
);

export default PokemonType;