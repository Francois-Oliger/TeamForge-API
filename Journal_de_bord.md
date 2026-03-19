# ------------------Jour 1------------------------

Initialisation du projet:

npm init -y
npm install express
npm install dotenv
npm i pg
npm i -D nodemon eslint prettier
npm install sequelize
npm i pg-hstore

Création du .gitignore, du .env et du .env.example

Choix et mise en place de l'arborescence de base
.
├── api
│   ├── app.js
│   ├── controllers
│   ├── data
│   │   └── sqlVersion
│   │       ├── create_tables.sql
│   │       ├── readme.md
│   │       └── seeding_tables.sql
│   ├── database
│   ├── middlewares
│   ├── models
│   ├── package.json
│   ├── package-lock.json
│   └── routes
├── docs
│   ├── installation.md
│   └── roadmap.md
├── Journal_de_bord.md
└── README.md

Création du MCD et des tables

Au vu de mon MCD, j'ai modifié le create_table afin d'y intégrer une table user.
J'ai également ajouté ON DELETE CASCADE sur les tables de liaison afin de supprimer les lignes correspondantes en cas de suppression d'une ligne parent.

Création de sequelize-client.js
Création des modèles et de models/index.js
Création de l'utilisateur et de la base de données
Création de app.js

(avec await sequelize.sync({ alter: true });)

sudo -i -u postgres psql;
CREATE USER admin_pokedex WITH LOGIN PASSWORD 'pokedex';
CREATE DATABASE pokedex WITH OWNER admin_pokedex;

Puis je lance npm run dev
(initialisation des tables grâce à sequelize.sync)

Puis je me reconnecte pour vérifier les tables

psql -U admin_pokedex -d pokedex

Si la DB est OK : je commente sequelize.sync pour éviter toute modification de la base au prochain npm run dev.

# -------------------Jour 2------------------------

Liste des routes à créer

CRUD Teams
GET    /teams
GET    /teams/:id
POST   /teams
PATCH  /teams/:id
DELETE /teams/:id
Gestion des Pokémon dans une équipe
POST   /teams/:teamId/pokemon/:pokemonId (ajouter un Pokémon dans une équipe)
DELETE /teams/:teamId/pokemon/:pokemonId (supprimer un Pokémon)

Pokémon
GET /pokemon
GET /pokemon/:id

Type
GET /types
GET /types/:id/pokemon (récupère tous les Pokémon d'un type donné)

Auth user
POST /register
POST /login

Création du CRUD Team et d'un fichier HTTP pour tester les routes au fur et à mesure avec Rest Client
Création d'un middleware de validation des données de Team
Création d'un wrapper async-handler.js pour refactoriser les try/catch (erreurs 500)
Test de toutes mes routes OK (c'est assez satisfaisant !)

# ------------------Jour 3------------------------------

Objectif : inscription, authentification, connexion et autorisation si OK niveau temps

Ajout des variables dans .env
Création de authController
Création de authMiddleware et des routes pour la création et l'authentification des users
Utilisation de req.user pour sécuriser les routes
Création d'un middleware de propriété de team pour refactoriser la gestion des droits sur chaque route (checkTeamOwner)

Installation de Joi (test)

Création de validation.middleware.js
Création de schemas/auth.schema.js
Branchement du schéma Joi sur /register
(dans auth.router) → ajout des imports middleware et schema + modification des routes

Ainsi, j’ai mis en place une validation des entrées avec Joi afin de sécuriser les données avant leur traitement côté serveur.

# ------------------Jour 4--------------------------------

Nettoyage de l’arborescence avec standardisation des noms de dossiers et fichiers

Nettoyage des fichiers avec suppression des commentaires inutiles et correction des commentaires utiles (traduction en anglais)
Nettoyage et standardisation des messages renvoyés

Ajout dans sequelize_client.js d'une fonction de test de connexion à la DB
Ajout d'un MLD et standardisation du MCD

Ajout d'un throw error dans le test de connexion Sequelize pour faire remonter l'erreur afin qu'elle soit gérée
Ajout de await testConnection().catch(() => process.exit(1)); dans app.js afin d'arrêter l'app en cas d'erreur

Création d'un middleware d'erreur

Amélioration de mon auth.schema (Joi)

Ajout d'un README projet pour le portfolio