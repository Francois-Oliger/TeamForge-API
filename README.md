# 🧩 TeamForge API

[Documentation Swagger](https://teamforge-api-jf9r.onrender.com/api-docs) • [API en ligne](https://teamforge-api-jf9r.onrender.com)

API REST développée avec Node.js et Sequelize permettant de gérer des équipes de Pokémon.

---

## Présentation

TeamForge API est une API REST de démonstration réalisée dans le cadre de ma formation développeur.

Le projet s'appuie sur l'univers Pokémon afin d'illustrer la conception d'un backend complet : authentification JWT, validation des données, gestion des relations entre entités, persistance PostgreSQL et documentation OpenAPI avec Swagger.

---

## Features

* Authentification sécurisée (JWT)
* Création et gestion d’équipes
* Ajout / suppression de Pokémon dans une équipe
* Relations many-to-many (Team ↔ Pokemon)
* Validation des données avec Joi
* Hash des mots de passe avec Argon2
* Base PostgreSQL
* Déploiement sur Render
* Documentation interactive avec Swagger (OpenAPI)

---

## Stack technique

* Node.js
* Express
* Sequelize (ORM)
* PostgreSQL
* JWT (authentification)
* Argon2 (hash mot de passe)
* Joi (validation)
* Swagger / OpenAPI

---

## Structure du projet

```txt
api/
├── controllers/     # Logique métier
├── routes/          # Routes Express
├── middlewares/     # Auth, validation, erreurs
├── models/          # Modèles Sequelize
├── schemas/         # Validation Joi
├── database/        # Connexion BDD
├── data/            # SQL, seed, reset, MCD/MLD
└── app.js           # Point d’entrée API

docs/                # Documentation complémentaire
```

---

## Installation

```bash
git clone git@github.com:Francois-Oliger/TeamForge-API.git

cd TeamForge-API
cd api

npm install
```

---

## Configuration

Créer un fichier `.env` :

```env
PORT=3000

NODE_ENV=development

DB_URL=postgres://username:password@localhost:5432/pokedex

TOKEN_SECRET=your_secret_key
TOKEN_EXPIRES_IN=2h

ARGON2_MEMORY_COST=65536
ARGON2_TIME_COST=3
ARGON2_PARALLELISM=1
```

---

## Base de données

Création des tables :

```bash
node data/reset_db.js
```

Insertion des données :

```bash
node data/seeding.js
```

---

## Lancer le serveur

```bash
npm run dev
```

---

## Scripts disponibles

```bash
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "node --watch app.js",
"start": "node app.js",
"db:reset": "node data/reset_db.js",
"db:seed": "node data/seeding.js",
"lint": "eslint ."
```

---

## API en ligne

Documentation interactive :

https://teamforge-api-jf9r.onrender.com/api-docs

API :

https://teamforge-api-jf9r.onrender.com

---

## Endpoints principaux

### Auth

```http
POST /register
POST /login
```

### Teams

```http
GET    /teams
GET    /teams/:id
POST   /teams
PUT    /teams/:id
DELETE /teams/:id
```

### Pokémon dans une équipe

```http
POST   /teams/:teamId/pokemon/:pokemonId
DELETE /teams/:teamId/pokemon/:pokemonId
```

### Authentification

Ajouter le header :

```http
Authorization: Bearer <token>
```

---

## Tests

Un fichier `.http` est disponible pour tester les routes avec REST Client.

---

## Architecture

L'application suit une architecture en couches :

- Routes : définition des endpoints
- Middlewares : authentification, validation et gestion des erreurs
- Controllers : logique métier
- Models : accès aux données via Sequelize
- PostgreSQL : persistance des données

Cette organisation facilite la maintenance, les tests et l'évolution du projet.

---

## Choix techniques

* Utilisation de Sequelize pour simplifier les relations entre les entités
* Middleware dédié pour centraliser la gestion des erreurs
* Validation des entrées avec Joi
* Hash des mots de passe avec Argon2
* Authentification JWT

---

## Auteur

François Oliger
