# 🧩 Pokedex API

API REST développée avec Node.js et Sequelize permettant de gérer des équipes de Pokémon.

---

## Features

- Authentification sécurisée (JWT)
- Création et gestion d’équipes
- Ajout / suppression de Pokémon dans une équipe
- Relations many-to-many (Team ↔ Pokemon)
- Validation des données avec Joi
- Base PostgreSQL

---

## Stack technique

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- JWT (authentification)
- Argon2 (hash mot de passe)
- Joi (validation)

---

## Structure du projet

api/
├── controllers/
├── database/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── data/
└── app.js


---

## Installation

```bash
git clone https://github.com/mon-repo/pokedex-api.git
cd pokedex-api
npm install


## Configuration

Créer un fichier .env :

DB_URL=postgres://user:password@localhost:5432/pokedex
TOKEN_SECRET=your_secret
TOKEN_EXPIRES_IN=1h

ARGON2_MEMORY_COST=4096
ARGON2_TIME_COST=3
ARGON2_PARALLELISM=1

## Base de données

Reset + Seed
node data/reset-db.js
node data/seeding.js

## Lancer le serveur
npm run dev

Endpoints principaux

Auth
POST /register → créer un utilisateur
POST /login → récupérer un token

Teams
GET /teams → liste des équipes
GET /teams/:id → détail d’une équipe
POST /teams → créer une équipe (auth)
PUT /teams/:id → modifier une équipe (auth + owner)
DELETE /teams/:id → supprimer une équipe (auth + owner)

Pokémon dans une team
POST /teams/:teamId/pokemon/:pokemonId
DELETE /teams/:teamId/pokemon/:pokemonId

Authentification
Ajouter le header :
Authorization: Bearer <token>

Tests
Fichier .http disponible pour tester les routes.

Choix techniques
Utilisation de Sequelize pour simplifier les relations
Middleware pour centraliser la gestion des erreurs
Validation avec Joi pour sécuriser les entrées utilisateur
Hash des mots de passe avec Argon2

Objectif
Projet réalisé dans le cadre de ma formation développeur afin de maîtriser :
les API REST
la gestion d’une base de données relationnelle
l’authentification sécurisée
l’architecture backend


## Auteur
François Oliger