# Installation

```bash
# Cloner le projet
git clone git@github.com:Francois-Oliger/TeamForge-API.git

# Se déplacer dans le projet
cd TeamForge-API

# Ouvrir le projet dans VSCode
code .

cd api

# Installer les dépendances nécessaires au back
npm install
```

## Mise en place de la base de données

```bash
# Se connecter à son client Postgres
sudo -i -u postgres psql

# Créer un utilisateur de base de données
CREATE USER nom_utilisateur WITH LOGIN PASSWORD 'mot_de_passe';

# Créer une base de données
CREATE DATABASE pokedex WITH OWNER nom_utilisateur;

# Quitter psql
\q
```

## Mise en place de l'environnement de développement

Créer un fichier `.env` à l'aide du fichier `.env.example`.

## Initialisation de la base de données

```bash
node data/reset_db.js
node data/seeding.js
```

## Lancement du projet

```bash
npm run dev
```