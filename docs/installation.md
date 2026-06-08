# Installation

```bash
# Cloner le projet
git clone git@github.com:Francois-Oliger/TeamForge-API.git

# Se déplacer dans le projet
cd TeamForge-API

# Ouvrir le projet dans VSCode
code .

# Se déplacer dans le dossier de l'API
cd api

# Installer les dépendances
npm install
```

## Mise en place de la base de données

Créer une base PostgreSQL ainsi qu'un utilisateur dédié.

```sql
CREATE USER nom_utilisateur WITH LOGIN PASSWORD 'mot_de_passe';

CREATE DATABASE pokedex WITH OWNER nom_utilisateur;
```

## Mise en place de l'environnement de développement

Créer un fichier `.env` à partir du fichier `.env.example`.

Veiller à renseigner les mêmes identifiants de connexion que ceux utilisés lors de la création de la base de données.

Exemple :

```env
PORT=3000

DB_URL=postgres://nom_utilisateur:mot_de_passe@localhost:5432/pokedex

NODE_ENV=development

TOKEN_SECRET=votre_secret
TOKEN_EXPIRES_IN=2h

ARGON2_MEMORY_COST=65536
ARGON2_TIME_COST=3
ARGON2_PARALLELISM=1
```

## Initialisation de la base de données

```bash
node data/reset_db.js
node data/seeding.js
```

## Lancement du projet

```bash
npm run dev
```

L'API sera alors accessible à l'adresse :

```text
http://localhost:3000
```

## Documentation Swagger

Une fois l'application démarrée, la documentation interactive de l'API est disponible à l'adresse :

```text
http://localhost:3000/api-docs
```
