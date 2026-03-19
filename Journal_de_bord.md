# ------------------Jour 1------------------------

## initialisation du projet
npm init -y
npm install express
npm install dotenv
npm i pg
npm i -D nodemon eslint prettier
npm install sequelize
npm i pg-hstore

Creation du gitignore, du .env et .env_exemple

## Choix et mise en place de l'arborescance de base
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

## création du MCD et créat_table

Au vue de mon MCD, j'ai modifié le "create_table" afin d'y intégré une table "user".
J'ai egalement ajouté "ON DELETE CASCADE" sur les tables de liaisons afin de suprimer les lignes correspondantes dans le cas ou l'on supprime une ligne parent.

## Création de sequelize-client.js
## Création des modeles et de model/index.js
## Création de l'utilisateur et de la DB
## création de l'app.js 
(avec await sequelize.sync({ alter: true });)

sudo -i -u postgres psql;
CREATE USER admin_pokedex WITH LOGIN PASSWORD 'pokedex';
CREATE DATABASE pokedex WITH OWNER admin_pokedex;

puis je lance npm run dev
(initialisation des tables grace à sequelize.sync)

puis je me reconnecte pour vérifier les tables
psql -U admin_pokedex -d pokedex

si db ok: je colle sequelize.sync en commentaire pour éviter toute modif de la db au prochain npm run dev.


# -------------------Jour 2------------------------

## Liste des routes à créer

CRUD Teams:
GET    /teams
GET    /teams/:id
POST   /teams
PATCH  /teams/:id
DELETE /teams/:id

Gestion Pokemon dans une équipe
POST   /teams/:teamId/pokemon/:pokemonId (Ajouter un Pokémon dans une équipe, ex: teams/1/pokemon/25)
DELETE /teams/:teamId/pokemon/:pokemonId (supprime...)

Pokemon
GET /pokemon
GET /pokemon/:id

Type
GET /types
GET /types/:id/pokemon (recupère tous les pokemon d'un type donné)

Auth user
POST /register
POST /login


## Création du CRUD Team et d'un fichier HTTP pour tester les routes au fur et à mesure avec Rest Client.

## Création d'un middleware de validation des données de Team 
## Création d'un wraper "async-handler.js" pour refacto les try/catch erreur 500
## test de toutes mes routes ok (c'est assez satisfaisant!)




# ------------------Jour 3------------------------------

objectif: inscription, authentification, connextion et autorisation si ok niveau temps.

ajout des variable dans .env
création authController
création authMiddleware et de route pour création et authentification de user
utilisation de req.user pour securiser les routes
création d'un middleware de propriété de team pour refacto la gestions des droits sur chaque routes en f des user checkTeamOwner.

## installation de Joi juste pour tester
creation de: validation.middleware.js
création de schemas/auth.schema.js
branchement du schema Joi sur /register
(dans auth.router) => ajout des deux imports middleware et schema et modif des routes.
Ainsi j’ai mis en place une validation des entrées avec Joi pour de sécuriser les données avant leur traitement côté serveur.